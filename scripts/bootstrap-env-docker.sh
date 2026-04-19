#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${ROOT}/docker/env-docker"
REPO="${ENV_DOCKER_REPO:-https://github.com/bitrix-tools/env-docker.git}"
REF="${ENV_DOCKER_REF:-}"

if [[ -f "${TARGET}/docker-compose.yml" ]]; then
  echo "env-docker уже на месте: ${TARGET}"
  exit 0
fi

if [[ -e "${TARGET}" ]]; then
  echo "Каталог ${TARGET} существует, но нет docker-compose.yml. Удалите каталог вручную и запустите снова."
  exit 1
fi

echo "Клонирую bitrix-tools/env-docker → ${TARGET}..."
if [[ -n "${REF}" ]]; then
  git clone --depth 1 --branch "${REF}" "${REPO}" "${TARGET}"
else
  git clone --depth 1 "${REPO}" "${TARGET}"
fi

echo "Готово. Дальше настройте .env в ${TARGET} (см. docs/02-docker.md)."
