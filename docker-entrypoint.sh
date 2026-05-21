#!/bin/sh
set -e

# Ensure the SQLite parent directory exists before TypeORM/sql.js opens the file.
# Coolify (and docker compose) mount a persistent volume at /data by default.
if [ -n "${PROJECT_ALPHA_DB_LOCATION}" ]; then
  DB_PATH="${PROJECT_ALPHA_DB_LOCATION}"
elif [ -n "${PROJECT_ALPHA_DATA_DIR}" ]; then
  DB_PATH="${PROJECT_ALPHA_DATA_DIR}/${PROJECT_ALPHA_DB_FILENAME:-project-alpha.sqlite}"
else
  DB_PATH="/data/project-alpha.sqlite"
fi

mkdir -p "$(dirname "${DB_PATH}")"

exec "$@"
