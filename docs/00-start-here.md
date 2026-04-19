# С чего начать

Читайте файлы по порядку — от окружения до модулей и Git.

| Шаг | Файл | О чём |
|-----|------|--------|
| 0 | [01-bitrix-core.md](01-bitrix-core.md) | Куда положить ядро 1С-Битрикс (без этого CMS не заработает). |
| 1 | [02-docker.md](02-docker.md) | Официальный [env-docker](https://github.com/bitrix-tools/env-docker), порты, БД, `make bootstrap`. |
| 2 | [03-frontend-builder.md](03-frontend-builder.md) | Сборщик `frontend/` (Twig, Tailwind, Swiper, вывод в шаблон). |
| 3 | [04-vue.md](04-vue.md) | Vue-компоненты в `local/components-vue/`. |
| 4 | [05-custom-modules.md](05-custom-modules.md) | Свои модули и [bitrix-version-builder](https://github.com/denx-b/bitrix-version-builder). |
| 5 | [06-github.md](06-github.md) | Публикация в [bitrix-2026](https://github.com/randee-ru/bitrix-2026). |

Идея репозитория: **в Git лежит всё своё** (`local/`, Docker, фронт), **ядро и upload не коммитим** (см. `.gitignore`).
