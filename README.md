# bitrix-2026

Стартовый каркас под **1С-Битрикс**: официальный Docker **[bitrix-tools/env-docker](https://github.com/bitrix-tools/env-docker)** (веб на **8080** после наших переопределений), структура из [bitrix-blank](https://github.com/denx-b/bitrix-blank), вёрстка через [builder-2024](https://github.com/denx-b/builder-2024) (Twig + SCSS + **Tailwind** + **Swiper**), Vue через [bitrix-vue-component](https://github.com/denx-b/bitrix-vue-component).

Подробные шаги — в каталоге [`docs/`](docs/00-start-here.md).

## Быстрый старт

1. **`make bootstrap`** — клонирует [env-docker](https://github.com/bitrix-tools/env-docker) в `docker/env-docker/` (каталог в `.gitignore`, на каждой машине один раз).
2. Настройте **`docker/env-docker/.env`**, **`.env_sql`**, **`.env_push`** и др. по [README env-docker](https://github.com/bitrix-tools/env-docker/blob/main/README.md) (пароли БД и ключи обязательны до первого запуска).
3. **`make up`** — поднимает стек из env-docker + монтирует каталог **`./www`** в `/opt/www` контейнеров. Сайт: [http://127.0.0.1:8080](http://127.0.0.1:8080).
4. Установите продукт в **`www/`**: скрипт **`bitrixsetup.php`** (официальный урок: [установка дистрибутивов](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=135&LESSON_ID=4523&LESSON_PATH=10495.4495.4523)) или **`restore.php`** / копирование ядра — см. [docs/01-bitrix-core.md](docs/01-bitrix-core.md) и [docs/02-docker.md](docs/02-docker.md).
5. **`make composer`** — PHP-зависимости в `www/local/php_interface/legacy/`.
6. **`make npm-build`** — сборка фронта в `www/local/templates/legacy/build/`.

## GitHub

Репозиторий: [randee-ru/bitrix-2026](https://github.com/randee-ru/bitrix-2026.git).

```bash
git init
git add .
git commit -m "Initial project scaffold"
git branch -M main
git remote add origin https://github.com/randee-ru/bitrix-2026.git
git push -u origin main
```

## Полезные ссылки

- [bitrix-tools/env-docker](https://github.com/bitrix-tools/env-docker) — контейнерное окружение 1С-Битрикс.
- [builder-2024](https://github.com/denx-b/builder-2024) — сборщик фронта.
- [bitrix-blank](https://github.com/denx-b/bitrix-blank) — организация `local/`.
- [bitrix-version-builder](https://github.com/denx-b/bitrix-version-builder) — архивы обновлений своих модулей.
- [bitrix-vue-component](https://github.com/denx-b/bitrix-vue-component) — Vue без Node на стороне PHP.
