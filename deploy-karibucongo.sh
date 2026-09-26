#!/usr/bin/env bash
set -euo pipefail

# Deploys karibucongo/site/ to karibucongo.com. Works like deploy.sh: additive (never
# deletes on the server), dry run first, asks before changing anything, backs up the live
# site, smoke-tests it and keeps the newest KEEP_BACKUPS [3] backups.
#
# Extra safety: it refuses to run if a live file was edited on the server since the last
# pull or deploy, because the upload would overwrite that edit. Pull it into git first.
#
# Optional env: NAMECHEAP_HOST, NAMECHEAP_USER, NAMECHEAP_SSH_PORT, KEEP_BACKUPS.

cd "$(dirname "${BASH_SOURCE[0]}")"
# Reuse deploy.sh's checks, backup, smoke test and pruning (sourcing does not run it).
# shellcheck source=deploy.sh
source ./deploy.sh
# shellcheck source=scripts/karibucongo-lib.sh
source scripts/karibucongo-lib.sh
EXPECTED_REMOTE_PATH="$KC_REMOTE_PATH"
EXPECTED_SITE_URL="$KC_SITE_URL"

kc_smoke_extra() {
  local failed=0 code p
  for p in /sitemap.xml /hotel-search.js /hotels/ /destinations/kinshasa/; do
    code="$(http_status "${EXPECTED_SITE_URL}${p}")"
    if [[ "$code" == "200" ]]; then
      echo "  ok    200 ${p}"
    else
      echo "  FAIL  ${code} ${p} (expected 200)"
      failed=1
    fi
  done
  return "$failed"
}

main() {
  kc_connection
  local remote="$KC_REMOTE" port="$KC_PORT" remote_path="$KC_REMOTE_PATH"

  [[ -d "$KC_LOCAL_DIR" && -f "$KC_MANIFEST" ]] \
    || die "$KC_LOCAL_DIR or $KC_MANIFEST is missing; run scripts/pull-karibucongo.sh first"
  validate_remote_path "$remote_path"
  warn_ssh_hardening "$NAMECHEAP_HOST" "$port" "$NAMECHEAP_USER"
  check_local_build "$KC_LOCAL_DIR"

  if [[ -n "$(git status --porcelain -- "$KC_LOCAL_DIR")" ]]; then
    echo "Note: deploying uncommitted changes under $KC_LOCAL_DIR. Commit them afterwards so git matches the live site."
  fi

  echo "Checking the server for edits made since the last sync ..."
  local drift
  KC_SERVER_SUMS="$(mktemp)"
  trap 'rm -f "$KC_SERVER_SUMS"' EXIT
  kc_remote_manifest > "$KC_SERVER_SUMS"
  drift="$(kc_server_drift "$KC_MANIFEST" "$KC_SERVER_SUMS")"
  if [[ -n "$drift" ]]; then
    printf '%s\n' "$drift" | sed 's/^/  /'
    if grep -q '^EDITED' <<< "$drift"; then
      die "files marked EDITED were changed on the server and this deploy would overwrite them. Run scripts/pull-karibucongo.sh, commit, redo your change on top, then deploy again"
    fi
    echo "  (ADDED files stay on the server untouched; REMOVED files will be uploaded again. Pull to bring git up to date.)"
  else
    echo "  none"
  fi

  # shellcheck disable=SC2054  # the comma is part of --chmod, not an array separator
  local rsync_flags=(-azc --itemize-changes --chmod=D755,F644 "${KC_RSYNC_EXCLUDES[@]}" -e "ssh -p ${port}")
  local dry
  dry="$(rsync -n "${rsync_flags[@]}" "./${KC_LOCAL_DIR}/" "${remote}:${remote_path}/")"
  if ! grep -q '^<f' <<< "$dry"; then
    echo "Nothing to deploy: the server already has every file in $KC_LOCAL_DIR."
    return 0
  fi
  printf '%s\n' "$dry" | summarize_dry_run
  confirm_or_abort

  backup_remote "$remote" "$port" "$remote_path"
  rsync "${rsync_flags[@]}" "./${KC_LOCAL_DIR}/" "${remote}:${remote_path}/"

  local smoke_ok=1
  smoke_test || smoke_ok=0
  kc_smoke_extra || smoke_ok=0
  if ((smoke_ok == 0)); then
    echo "Smoke test FAILED. Backup of the previous site: ${BACKUP_ARCHIVE}" >&2
    echo "Restore: ssh -p ${port} ${remote} 'tar -xzf ${BACKUP_ARCHIVE} -C $(dirname "$remote_path")'" >&2
    exit 1
  fi

  kc_local_manifest > "$KC_MANIFEST"
  prune_backups "$remote" "$port" "$remote_path"
  echo "Deploy complete. Backup kept at ${BACKUP_ARCHIVE}"
  echo "Commit the updated $KC_MANIFEST (and any site changes) so git matches the live site."
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
