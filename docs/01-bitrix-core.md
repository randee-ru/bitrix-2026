# Ядро 1С-Битрикс

Продукт 1С-Битрикс **нельзя** распространять вместе с этим репозиторием. В Git мы кладём только свою обвязку: `www/local/`, Docker, фронтенд-сборщик.

## Что сделать

### Вариант A — установка скриптом `bitrixsetup.php` (как в README env-docker)

Для установки продуктов компании 1С-Битрикс используется скрипт **`bitrixsetup.php`**. Официальный урок курса:

- [Установка дистрибутивов (`bitrixsetup.php`)](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=135&LESSON_ID=4523&LESSON_PATH=10495.4495.4523)

Практически в Docker (каталог сайта в контейнере — `/opt/www/`, у вас на диске — `www/`):

```bash
docker compose exec --user=bitrix php sh
cd /opt/www
wget https://www.1c-bitrix.ru/download/scripts/bitrixsetup.php
# выйти из shell: exit
```

В браузере откройте [http://127.0.0.1:8080/bitrixsetup.php](http://127.0.0.1:8080/bitrixsetup.php) и пройдите мастер. После установки скрипт **удалите** (требование безопасности).

### Вариант B — восстановление из резервной копии (`restore.php`)

- [Восстановление из резервной копии](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=135&CHAPTER_ID=02014&LESSON_PATH=10495.4496.2014)

Скачивание `restore.php` в `/opt/www` — по тому же принципу, что и `bitrixsetup.php`, см. [раздел BitrixSetup / Restore в README env-docker](https://github.com/bitrix-tools/env-docker/blob/main/README.md).

### Вариант C — уже готовые файлы

1. Получите дистрибутив или архив **официально** (сайт 1С-Битрикс, партнёр, резервная копия).
2. Скопируйте каталог **`bitrix`** в `www/bitrix/` рядом с `www/index.php` и `www/local/`.
3. При необходимости добавьте `www/urlrewrite.php`, `bitrix/php_interface/dbconn.php` и другие файлы из стандартной структуры сайта.

### Общее

Откройте [http://127.0.0.1:8080](http://127.0.0.1:8080) — мастер установки, `bitrixsetup.php` или уже развёрнутый сайт. Настройки БД при установке в Docker — в [docs/02-docker.md](02-docker.md) (хост **`mysql`**, порт **3306** внутри сети compose).

Пока `www/bitrix` отсутствует, `www/index.php` показывает короткую подсказку вместо фатальной ошибки.

## Шаблон сайта

В проекте уже подключён шаблон **`legacy`** (наследие [bitrix-blank](https://github.com/denx-b/bitrix-blank)): `www/local/templates/legacy/`. В админке выберите его для сайта после установки ядра.
