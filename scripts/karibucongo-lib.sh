# shellcheck shell=bash disable=SC2034  # variables are used by the scripts that source this
# Shared settings and helpers for scripts/pull-karibucongo.sh and deploy-karibucongo.sh.
# Source this file; it does nothing on its own.
#
# karibucongo.com is kept in git as the live built site (plain HTML, JS, images), not as
# Next.js source: its source on the server stopped matching the site in early September.
# Edit the files under karibucongo/site/ and deploy them with ./deploy-karibucongo.sh.

KC_SITE_URL="https://www.karibucongo.com"
KC_REMOTE_PATH="/home/samopsep/karibucongo.com"
KC_LOCAL_DIR="karibucongo/site"
# Checksums of every tracked file at the last pull or deploy. Commit it with the site.
KC_MANIFEST="karibucongo/last-sync.sha256"

# Server files that never go into git and are never uploaded: image upload bundles,
# hand-made backups and cPanel's SSL bookkeeping.
KC_RSYNC_EXCLUDES=(
  --exclude='*.zip'
  --exclude='*.bak'
  --exclude='*.bak-*'
  --exclude='*.bak.*'
  --exclude='/.well-known/ssl-manager/'
)

# Prints "sha256  ./path" for every tracked file under the current directory, sorted,
# skipping the same files as KC_RSYNC_EXCLUDES. Runs the same way locally and over ssh.
KC_MANIFEST_CMD="LC_ALL=C find . -path ./.well-known/ssl-manager -prune -o -type f \
! -name '*.zip' ! -name '*.bak' ! -name '*.bak-*' ! -name '*.bak.*' -print0 \
| LC_ALL=C sort -z | xargs -0 -r sha256sum"

kc_connection() {
  : "${NAMECHEAP_HOST:=premium354.web-hosting.com}"
  : "${NAMECHEAP_USER:=samopsep}"
  KC_PORT="${NAMECHEAP_SSH_PORT:-21098}"
  KC_REMOTE="${NAMECHEAP_USER}@${NAMECHEAP_HOST}"
}

kc_local_manifest() {
  (cd "$KC_LOCAL_DIR" && eval "$KC_MANIFEST_CMD")
}

kc_remote_manifest() {
  ssh -p "$KC_PORT" "$KC_REMOTE" "cd $(printf '%q' "$KC_REMOTE_PATH") && $KC_MANIFEST_CMD"
}

# Compares the server with the manifest from the last sync and prints one line per file
# that changed on the server since then:
#   EDITED  ./path   (changed on the server; a deploy would overwrite it)
#   ADDED   ./path   (new on the server; not in git yet)
#   REMOVED ./path   (deleted on the server; a deploy would put it back)
# Usage: kc_server_drift <manifest file> <server manifest file>
kc_server_drift() {
  awk '
    NR == FNR { old[substr($0, 67)] = substr($0, 1, 64); next }
    {
      path = substr($0, 67); sum = substr($0, 1, 64); seen[path] = 1
      if (!(path in old)) print "ADDED   " path
      else if (old[path] != sum) print "EDITED  " path
    }
    END { for (p in old) if (!(p in seen)) print "REMOVED " p }
  ' "$1" "$2" | LC_ALL=C sort -k2
}
