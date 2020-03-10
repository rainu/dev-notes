#!/bin/bash
SCRIPT_PATH=$(realpath "$0")
SCRIPT_NAME="$(basename "$(test -L "$0" && readlink "$0" || echo "$0")")"
SCRIPT_HOME=${SCRIPT_PATH%$SCRIPT_NAME}

CURRENT_VERSION=$(cat ${SCRIPT_HOME}/package.json | grep '"version":' | cut -d\" -f4)

git tag -a "v${CURRENT_VERSION}" -m "release version: ${CURRENT_VERSION}"
git push origin "v${CURRENT_VERSION}"
