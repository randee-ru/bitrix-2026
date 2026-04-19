# Vue (bitrix-vue-component)

Используется библиотека [bitrix-vue-component](https://github.com/denx-b/bitrix-vue-component): PHP читает `.vue` / `script.js` из папки компонентов и подключает их к странице; **Node для рантайма сайта не нужен**.

## Установка

После `make composer` класс `Dbogdanoff\Bitrix\Vue` будет доступен через автозагрузку Composer в `legacy/bootstrap.php`.

## Где лежат компоненты

По умолчанию: **`www/local/components-vue/<имя>/`**

Пример уже есть: `www/local/components-vue/demo-welcome/template.vue`.

В `header.php` шаблона вызывается:

```php
\Dbogdanoff\Bitrix\Vue::includeComponent(['demo-welcome']);
```

Для администраторов перед этим выставляется `DBOGDANOFF_DEV`, чтобы подключалась не минифицированная ветка скриптов библиотеки (как задумано в оригинальном пакете).

## Монтирование приложения

В `footer.php` шаблона добавлен корневой элемент `#app-vue-demo` и инициализация `new Vue({ el: '#app-vue-demo' })` после загрузки DOM.

Добавляя новые теги компонентов, расширяйте этот блок или вынесите отдельный `#app` под задачу.

## Документация upstream

См. README репозитория [bitrix-vue-component](https://github.com/denx-b/bitrix-vue-component) — зависимости через `.settings.php`, константа `DBOGDANOFF_VUE_PATH`, опциональная минификация HTML.
