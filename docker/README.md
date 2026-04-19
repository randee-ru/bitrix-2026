# Docker: bitrix-tools/env-docker

Используется официальный репозиторий **[bitrix-tools/env-docker](https://github.com/bitrix-tools/env-docker)** — контейнеры, образы и конфигурации от команды 1С-Битрикс (PHP-FPM, Nginx, Percona, PostgreSQL, Redis, Push, Sphinx, Cron и т.д.).

Каталог `docker/env-docker/` **не хранится в Git** этого проекта (см. `.gitignore`): его создаёт **`make bootstrap`** в корневом `Makefile` или submodule.

Корневой [`docker-compose.yml`](../docker-compose.yml) подключает `env-docker` через [`include`](https://docs.docker.com/reference/compose-file/include/) и задаёт:

- привязку **`./www` → `/opt/www`** в контейнерах (ваш код рядом с репозиторием);
- **HTTP на порт 8080** хоста (вместо стандартных 8588/8589 из README env-docker);
- проброс MySQL на **33060** для клиентов с хоста.

Подробности — в [`docs/02-docker.md`](../docs/02-docker.md).
