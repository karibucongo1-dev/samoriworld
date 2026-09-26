#!/usr/bin/env bash
set -euo pipefail

# Optional env (defaults in brackets): NAMECHEAP_HOST [premium354.web-hosting.com], NAMECHEAP_USER [samopsep], NAMECHEAP_PATH, NAMECHEAP_SSH_PORT [21098].
# Credentials never live in this file.

EXPECTED_REMOTE_PATH="/home/samopsep/public_html"
EXPECTED_SITE_URL="https://www.samori.net"
BACKUP_ARCHIVE=""

die() {
  echo "ABORT: $*" >&2
  exit 1
}

normalize_path() {
  local p="$1"
  while [[ "$p" == */ && "$p" != "/" ]]; do
    p="${p%/}"
  done
  printf '%s' "$p"
}

validate_remote_path() {
  local raw="${1:-}" path
  path="$(normalize_path "$raw")"
  [[ -n "$path" ]] || die "remote path is empty"
  [[ "$path" != "/" ]] || die "remote path is /"
  [[ "$path" == "$EXPECTED_REMOTE_PATH" ]] || die "remote path '$raw' is not the expected document root '$EXPECTED_REMOTE_PATH'"
}

warn_ssh_hardening() {
  local host="$1" port="$2" user="$3" known_entry="$1"
  [[ "$port" == "22" ]] || known_entry="[${host}]:${port}"
  if ! ssh-keygen -F "$known_entry" >/dev/null 2>&1; then
    echo "WARNING: no host key pinned for ${known_entry} in ~/.ssh/known_hosts. Verify the fingerprint and pin it (ssh-keyscan -p ${port} ${host}) so a first connection cannot be intercepted." >&2
  fi
  if [[ "$user" == "$(basename "$(dirname "$EXPECTED_REMOTE_PATH")")" ]]; then
    echo "WARNING: deploying as the main cPanel account (${user}). A dedicated deploy user or a restricted key would limit the blast radius." >&2
  fi
}

check_local_build() {
  local dir="${1:-out}"
  [[ -f "$dir/index.html" ]] || die "$dir/index.html is missing"
  grep -qF "<link rel=\"canonical\" href=\"${EXPECTED_SITE_URL}/\"" "$dir/index.html" \
    || die "$dir/index.html canonical is not ${EXPECTED_SITE_URL}/ (built for the wrong site?)"
}

summarize_dry_run() {
  local changes new updated total
  changes="$(cat)"
  new="$(printf '%s\n' "$changes" | grep -c '^<f+++++++++' || true)"
  updated="$(printf '%s\n' "$changes" | grep -c '^<f' || true)"
  updated=$((updated - new))
  total=$((new + updated))
  echo "Dry run: ${new} new file(s), ${updated} changed file(s). Nothing on the server will be deleted."
  printf '%s\n' "$changes" | grep '^<f' | sed -n '1,25p' || true
  if ((total > 25)); then
    echo "  ... and $((total - 25)) more"
  fi
}

confirm_or_abort() {
  local answer
  [[ -t 0 ]] || die "no interactive terminal to confirm on"
  read -r -p "Proceed with the sync? [y/N] " answer
  [[ "${answer,,}" == "y" || "${answer,,}" == "yes" ]] || die "cancelled, nothing was changed on the server"
}

backup_remote() {
  local remote="$1" port="$2" path="$3" ts parent base
  ts="$(date +%Y%m%d-%H%M%S)"
  parent="$(dirname "$path")"
  base="$(basename "$path")"
  BACKUP_ARCHIVE="${parent}/deploy-backups/${base}-${ts}.tar.gz"
  echo "Backing up ${path} to ${BACKUP_ARCHIVE} ..."
  ssh -p "$port" "$remote" "mkdir -p $(printf '%q' "${parent}/deploy-backups") \
    && tar -czf $(printf '%q' "$BACKUP_ARCHIVE") -C $(printf '%q' "$parent") $(printf '%q' "$base") \
    && tar -tzf $(printf '%q' "$BACKUP_ARCHIVE") >/dev/null \
    && ls -l $(printf '%q' "$BACKUP_ARCHIVE")"
}

http_status() {
  curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$@" || true
}

smoke_test() {
  local failed=0 code hsts p
  echo "Smoke test against ${EXPECTED_SITE_URL}:"
  for p in / /robots.txt /.well-known/security.txt /consent.js /favicon.ico /privacy/; do
    code="$(http_status "${EXPECTED_SITE_URL}${p}")"
    if [[ "$code" == "200" ]]; then
      echo "  ok    200 ${p}"
    else
      echo "  FAIL  ${code} ${p} (expected 200)"
      failed=1
    fi
  done
  hsts="$(curl -sI --max-time 20 "${EXPECTED_SITE_URL}/" | tr -d '\r' | grep -i '^strict-transport-security:' || true)"
  if [[ -n "$hsts" ]]; then
    echo "  ok    ${hsts}"
  else
    echo "  FAIL  Strict-Transport-Security header missing on /"
    failed=1
  fi
  code="$(http_status -X POST "${EXPECTED_SITE_URL}/")"
  if [[ "$code" == "405" ]]; then
    echo "  ok    405 POST /"
  else
    echo "  FAIL  ${code} POST / (expected 405)"
    failed=1
  fi
  listing="$(curl -s --max-time 20 "${EXPECTED_SITE_URL}/_next/static/" || true)"
  if [[ "$listing" == *"Index of"* ]]; then
    echo "  FAIL  directory listing is still on (/_next/static/)"
    failed=1
  else
    echo "  ok    no directory listing on /_next/static/"
  fi
  return "$failed"
}

main() {
  cd "$(dirname "${BASH_SOURCE[0]}")"

  : "${NAMECHEAP_HOST:=premium354.web-hosting.com}"
  : "${NAMECHEAP_USER:=samopsep}"
  local remote_path="${NAMECHEAP_PATH:-${EXPECTED_REMOTE_PATH}/}"
  local port="${NAMECHEAP_SSH_PORT:-21098}"
  local remote="${NAMECHEAP_USER}@${NAMECHEAP_HOST}"

  validate_remote_path "$remote_path"
  remote_path="$(normalize_path "$remote_path")"
  warn_ssh_hardening "$NAMECHEAP_HOST" "$port" "$NAMECHEAP_USER"

  rm -rf out
  NEXT_PUBLIC_SITE_URL="$EXPECTED_SITE_URL" npm run build
  check_local_build out

  # No --delete: the live site is layered from several deploys, and this build does not
  # yet reproduce every live route. Only add it back once that comparison is clean.
  local rsync_flags=(-azc --itemize-changes --chmod=D755,F644 -e "ssh -p ${port}")

  local dry
  dry="$(rsync -n "${rsync_flags[@]}" ./out/ "${remote}:${remote_path}/")"
  printf '%s\n' "$dry" | summarize_dry_run

  if command -v python3 >/dev/null 2>&1; then
    echo
    echo "Build vs live site (informational, read-only):"
    python3 scripts/compare-live.py || true
  fi
  confirm_or_abort

  backup_remote "$remote" "$port" "$remote_path"
  rsync "${rsync_flags[@]}" ./out/ "${remote}:${remote_path}/"

  if ! smoke_test; then
    echo "Smoke test FAILED. Backup of the previous site: ${BACKUP_ARCHIVE}" >&2
    echo "Restore: ssh -p ${port} ${remote} 'tar -xzf ${BACKUP_ARCHIVE} -C $(dirname "$remote_path")'" >&2
    exit 1
  fi
  echo "Deploy complete. Backup kept at ${BACKUP_ARCHIVE}"
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
