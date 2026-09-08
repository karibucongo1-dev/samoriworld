#!/usr/bin/env bash
set -euo pipefail

# Namecheap deploy config — set these as real environment variables
# (e.g. in your shell profile or a local, gitignored .env.deploy that you `source`)
# before running this script. Do not hardcode credentials here.
: "${NAMECHEAP_HOST:?Set NAMECHEAP_HOST (e.g. samori.net)}"
: "${NAMECHEAP_USER:?Set NAMECHEAP_USER (your cPanel SSH username)}"
NAMECHEAP_PATH="${NAMECHEAP_PATH:-public_html/}"
NAMECHEAP_SSH_PORT="${NAMECHEAP_SSH_PORT:-21098}"

npm run build

rsync -avz --delete \
  -e "ssh -p ${NAMECHEAP_SSH_PORT}" \
  ./out/ \
  "${NAMECHEAP_USER}@${NAMECHEAP_HOST}:${NAMECHEAP_PATH}"
