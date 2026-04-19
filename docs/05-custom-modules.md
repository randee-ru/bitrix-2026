# Свои модули

## Где размещать код модуля

Обычно собственные модули кладут в:

`www/local/modules/<vendor>.<name>/`

Структура должна соответствовать требованиям 1С-Битрикс (`include.php`, `install/index.php`, версии и т.д.). Подробности — в официальной документации по разработке модулей.

## Сборка архива версии (обновления)

Для рутины вокруг **версий** и zip-архивов обновлений удобно использовать [bitrix-version-builder](https://github.com/denx-b/bitrix-version-builder):

```bash
composer require denx-b/bitrix-version-builder
./vendor/bin/console bitrix:create-module   # стартовая структура, по желанию
./vendor/bin/console bitrix:version-build   # архив по git-тегам и version.php
```

Смысл: разрабатываете модуль в Git, по готовности одна команда собирает дистрибутив для установки на других сайтах.

## Связь с этим репозиторием

Каталог `www/local/modules/` **не игнорируется** в `.gitignore`: ваши модули можно коммитить здесь же. Ядро `www/bitrix/` по-прежнему не коммитим.
