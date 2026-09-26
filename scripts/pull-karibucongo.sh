#!/usr/bin/env bash
set -euo pipefail

# Copies the live karibucongo.com into karibucongo/site/ so it can be committed to git.
# Read-only on the server. Run it once to import the site, and again whenever someone
# has edited the live site by hand (deploy-karibucongo.sh will tell you when).
#
# Optional env: NAMECHEAP_HOST, NAMECHEAP_USER, NAMECHEAP_SSH_PORT (same as deploy.sh).
# --force: overwrite uncommitted local changes under karibucongo/.

cd "$(dirname "${BASH_SOURCE[0]}")/.."
# shellcheck source=scripts/karibucongo-lib.sh
source scripts/karibucongo-lib.sh
kc_connection

die() {
  echo "ABORT: $*" >&2
  exit 1
}

force=0
[[ "${1:-}" == "--force" ]] && force=1

[[ "$KC_LOCAL_DIR" == "karibucongo/site" ]] || die "unexpected local dir '$KC_LOCAL_DIR'"

if ((force == 0)) && [[ -n "$(git status --porcelain -- karibucongo)" ]]; then
  git status --short -- karibucongo >&2
  die "uncommitted changes under karibucongo/; commit or stash them first, or rerun with --force to overwrite them"
fi

# First import: the loose copy of hotel-search.js becomes the site's copy, keeping its history.
if [[ ! -d "$KC_LOCAL_DIR" && -f karibucongo/hotel-search.js ]]; then
  mkdir -p "$KC_LOCAL_DIR"
  git mv karibucongo/hotel-search.js "$KC_LOCAL_DIR/hotel-search.js"
  echo "Moved karibucongo/hotel-search.js to $KC_LOCAL_DIR/hotel-search.js"
fi
mkdir -p "$KC_LOCAL_DIR"

echo "Copying ${KC_REMOTE}:${KC_REMOTE_PATH}/ to ${KC_LOCAL_DIR}/ (the server is only read) ..."
# --delete only removes local files under karibucongo/site/ that are gone from the server.
changes="$(rsync -azc --delete --itemize-changes "${KC_RSYNC_EXCLUDES[@]}" -e "ssh -p ${KC_PORT}" \
  "${KC_REMOTE}:${KC_REMOTE_PATH}/" "${KC_LOCAL_DIR}/")" || die "copying from the server failed (see above)"
printf '%s\n' "$changes" | grep -v '^\.' | sed -n '1,25p' || true

remote_sums="$(mktemp)"
trap 'rm -f "$remote_sums"' EXIT
kc_remote_manifest > "$remote_sums"
kc_local_manifest > "$KC_MANIFEST"
if ! cmp -s "$remote_sums" "$KC_MANIFEST"; then
  diff "$remote_sums" "$KC_MANIFEST" | head -20 >&2
  die "the local copy does not match the server (did someone edit it during the copy?); run this again"
fi

echo
echo "karibucongo/site/ now matches the live site: $(wc -l < "$KC_MANIFEST") files."
git status --short -- karibucongo | sed -n '1,25p'
echo
echo "Review, then commit:"
echo "  git add karibucongo && git commit -m 'karibucongo.com: sync from live site'"
