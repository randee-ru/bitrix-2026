# Публикация на GitHub

Целевой репозиторий: **[randee-ru/bitrix-2026](https://github.com/randee-ru/bitrix-2026)**.

## Ветки

- **`base`** — стартовый каркас (Docker, `www/`, `frontend/`, `docs/`, `bitrixsetup.php` и т.д.) на момент выделения ветки; на удалённом репозитории: `origin/base`.
- **`main`** — сейчас указывает на тот же коммит, что и `base`; дальнейшую разработку можно вести в `main`, а `base` оставить неизменяемой опорной точкой (или сменить **default branch** в настройках GitHub на `base`, если так удобнее команде).

## Первый push

В корне проекта:

```bash
git init
git add .
git commit -m "Scaffold: Docker, legacy template, frontend builder, docs"
git branch -M main
git remote add origin https://github.com/randee-ru/bitrix-2026.git
git push -u origin main
```

Если на GitHub уже создан пустой репозиторий без README, команда `git push` пройдёт без слияния. Если GitHub предложил README — сделайте `git pull --rebase origin main` и снова `git push`.

## Что не попадает в Git

См. `.gitignore`: ядро `www/bitrix/`, загрузки `www/upload/`, `vendor/`, `node_modules/`, локальные `.env`, а также каталог **`docker/env-docker/`** (его каждый разработчик получает через `make bootstrap` или через **git submodule**).

### Submodule вместо bootstrap

Если хотите зафиксировать версию env-docker в репозитории:

1. Удалите строку `docker/env-docker/` из `.gitignore`.
2. Выполните: `git submodule add https://github.com/bitrix-tools/env-docker.git docker/env-docker`
3. Коммитьте изменения; при клонировании проекта используйте `git clone --recurse-submodules` или `git submodule update --init`.

На сервере после деплоя выполняйте установку зависимостей (`composer install`, `npm ci && npm run build`), `make bootstrap` (если без submodule) и настройку ядра Битрикс отдельно.
