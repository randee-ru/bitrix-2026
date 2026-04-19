# Docker: официальное окружение env-docker

Вместо «самописного» стека используется репозиторий **[bitrix-tools/env-docker](https://github.com/bitrix-tools/env-docker)** — контейнеры и образы для разработки под 1С-Битрикс (Nginx, PHP-FPM, Percona MySQL, PostgreSQL, Redis, Memcached, Push, Sphinx, Cron и др.). Документация по всем опциям — в [README env-docker](https://github.com/bitrix-tools/env-docker/blob/main/README.md).

## Как это подключено в bitrix-2026

1. В корне лежит [`docker-compose.yml`](../docker-compose.yml) с директивой [`include`](https://docs.docker.com/reference/compose-file/include/) на `docker/env-docker/docker-compose.yml`.
2. В том же файле заданы переопределения:
   - каталог проекта **`./www` монтируется в `/opt/www`** в сервисах `nginx`, `php`, `cron` (код сайта редактируете у себя в репозитории);
   - **HTTP** на хосте: **8080** → `http://127.0.0.1:8080/` (в чистом env-docker по умолчанию [8588/8589](https://github.com/bitrix-tools/env-docker/blob/main/README.md));
   - **MySQL** проброшен на хост **`127.0.0.1:33060`** (удобно для TablePlus / DBeaver).

## Первый запуск

1. Установите [Docker Desktop](https://docs.docker.com/desktop/) или Docker Engine + Compose v2.

2. Получите копию **env-docker** в каталог `docker/env-docker/` — любой из вариантов:

   ```bash
   make bootstrap
   ```

   Скрипт [`scripts/bootstrap-env-docker.sh`](../scripts/bootstrap-env-docker.sh) выполнит `git clone` репозитория [bitrix-tools/env-docker](https://github.com/bitrix-tools/env-docker.git) (ветка по умолчанию у репозитория). Переменные `ENV_DOCKER_REPO` и `ENV_DOCKER_REF` позволяют переопределить URL и ref (см. [`.env.example`](../.env.example)).

   **Альтернатива — git submodule:** тогда удалите строку `docker/env-docker/` из [`.gitignore`](../.gitignore) и добавьте submodule; каталог будет версионироваться ссылкой на коммит upstream.

3. Перейдите в **`docker/env-docker/`** и настройте окружение **по инструкции env-docker** (обязательно задайте пароли и ключи):

   - скопируйте/отредактируйте `.env`, `.env_sql`, `.env_push` и остальные файлы из [списка в репозитории](https://github.com/bitrix-tools/env-docker);
   - в [README](https://github.com/bitrix-tools/env-docker/blob/main/README.md) описаны генерация паролей MySQL/PostgreSQL, ключ Push и первый `docker compose up -d` из каталога env-docker — у нас команды выполняются **из корня bitrix-2026**, но файлы `.env*` лежат **внутри `docker/env-docker/`** (пути в compose env-docker относительно этого каталога).

4. Из **корня этого репозитория** (где лежит наш `docker-compose.yml`):

   ```bash
   make up
   ```

   Либо: `make bootstrap && docker compose up -d`.

## Полезные команды

```bash
make bootstrap   # только клонировать env-docker при отсутствии
make up          # bootstrap + docker compose up -d
make down
make logs        # логи nginx и php
make composer    # composer install в legacy (путь в контейнере /opt/www/...)
```

Консоль PHP (пользователь `bitrix`, как в документации env-docker):

```bash
docker compose exec --user=bitrix php sh
cd /opt/www
```

## Установка Битрикс в /opt/www

В каталоге сайта внутри контейнера это **`/opt/www/`** — у вас на диске это **`www/`** в корне проекта.

Как и в [README env-docker (BitrixSetup / Restore)](https://github.com/bitrix-tools/env-docker/blob/main/README.md), для установки продуктов 1С-Битрикс используют скрипты:

| Скрипт | Назначение | Урок курса 1С-Битрикс |
|--------|------------|------------------------|
| **`bitrixsetup.php`** | установка дистрибутивов с сайта 1С-Битрикс | [Установка дистрибутивов](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=135&LESSON_ID=4523&LESSON_PATH=10495.4495.4523) |
| **`restore.php`** | восстановление из резервной копии | [Восстановление из резервной копии](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=135&CHAPTER_ID=02014&LESSON_PATH=10495.4496.2014) |

Пошагово с командами `wget` и входом в контейнер `php` — в [docs/01-bitrix-core.md](01-bitrix-core.md).

**База данных** в форме установщика:

- **Сервер БД:** имя сервиса **`mysql`** (хост в сети compose), порт **3306** внутри сети.
- С **хоста** (клиенты MySQL): `127.0.0.1:33060`.

## Порт 80 и сервис lego

В составе env-docker сервис **`lego`** может занять **порт 80** на хосте (`80:80`). Если на машине уже занят 80-й порт, остановите ненужные сервисы или отредактируйте compose в `docker/env-docker` (или добавьте переопределение в наш корневой `docker-compose.yml`). Подробности — в README env-docker.

## Где лежат «настоящие» конфиги nginx/php

Внутри клонированного репозитория: `docker/env-docker/confs/` — их правит и описывает официальная документация env-docker.
