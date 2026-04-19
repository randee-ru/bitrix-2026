# Legacy API (`/api/*`)

> Для ученика «с нуля»: сначала прочитайте [08-api-prostymi-slovami.md](08-api-prostymi-slovami.md), затем возвращайтесь сюда за деталями.

Мини-фреймворк из [bitrix-blank](https://github.com/denx-b/bitrix-blank): запросы вида **`/api/...`** обрабатываются одним входным файлом и картой маршрутов на PHP-классы.

## Цепочка выполнения

1. **`www/local/php_interface/legacy/eventHandlers/common.php`**  
   На событие `main:OnBeforeProlog` вызывается **`CommonHandlers::initApi()`** — в правила **urlrewrite** добавляется правило (если его ещё нет):
   - **Условие:** путь совпадает с `#^/+api/(.*)#`
   - **Правило:** `apiMethodName=$1` (суффикс после `/api/`)
   - **Файл:** `/local/php_interface/legacy/api.php`

2. **`www/local/php_interface/legacy/api.php`**  
   Подключает пролог Битрикс, читает `apiMethodName`, нормализует путь в строку вида **`/api/news`**, **`/api/deploy/gitStatus`**, затем:
   - `Legacy\Api\ApiFactory::create($method)`
   - `$api->result()` — вывод JSON и завершение скрипта.

3. **`ApiFactory`** смотрит **`ApiRoutes::map()`**. Если маршрут есть — создаётся класс метода, иначе — **`Methods\Unknown`** (ответ «Unknown method», HTTP **404**).

## Формат ответа

Базовый класс **`Legacy\Api\Api`** держит массив результата с полями:

- `success` — `true` / `false`
- `errorMessage`, `successMessage` — строки
- любые дополнительные поля через **`setField()`** / **`setFields()`**

По умолчанию ответ отдаётся как **JSON** (`Content-Type: application/json`).

## Как вызвать API из браузера или Postman

После установки Битрикс и работающего сайта (пролог доступен):

- Пример: **`https://ваш-домен/api/news`**  
  Суффикс `news` превращается в маршрут **`/api/news`**.

Параметры запроса — обычные GET/POST; в коде метода доступны **`$this->request`**, **`$this->user`**, **`$this->server`** (см. конструктор **`Api`**).

## Как добавить новый метод

### 1. Класс обработчика

Создайте файл в каталоге:

`www/local/php_interface/legacy/classes/Api/Methods/`

Имя класса и namespace должны соответствовать автозагрузке **PSR-4** проекта (префикс **`Legacy\`**, путь от **`legacy/classes/`**). Пример для маршрута `/api/catalog/list`:

**Файл:** `.../Api/Methods/Catalog/Items.php`

```php
<?php

namespace Legacy\Api\Methods\Catalog;

use Legacy\Api\Api;

class Items extends Api
{
    public function init(): void
    {
        $sectionId = (int) $this->request->get('section_id');

        $this->setField('items', [
            ['id' => 1, 'name' => 'Пример'],
        ]);
        $this->setSuccessMessage('OK');
    }
}
```

### 2. Запись в карте маршрутов

Отредактируйте **`www/local/php_interface/legacy/classes/Api/ApiRoutes.php`**:

```php
return [
    '/api/news' => Methods\News::class,
    '/api/deploy/gitStatus' => Methods\Deploy\GitStatus::class,
    '/api/catalog/items' => Methods\Catalog\Items::class,
];
```

Ключ — **полная строка пути** в формате `/api/...` (как собирает `api.php`).

### 3. Проверка

Откройте **`/api/catalog/items`** (или с query, если так задумано). При ошибке в `ApiFactory` (неверный формат имени метода) сработает **`Unknown`** с текстом ошибки.

## Как изменить существующий метод

1. Найдите класс в **`Api/Methods/`** (например **`News.php`**).
2. Измените логику в **`init()`** — только там должна собираться выдача (через **`setField`** / **`setSuccessMessage`** / при ошибке **`setResultError`**).
3. При смене **URL** не забудьте обновить ключ в **`ApiRoutes::map()`** и клиентов, которые дергают API.

## Ошибки и неизвестные пути

| Ситуация | Поведение |
|----------|-----------|
| Путь не в `ApiRoutes` | класс **`Unknown`**, сообщение «Unknown method», код **404** |
| Исключение в `ApiFactory::create` | **`Unknown`** с текстом исключения |
| Недопустимые символы в пути метода | исключение «Invalid method format» (регулярное выражение в **`ApiFactory::isValidMethodName`**) |

## Безопасность и продакшен

- Не публикуйте чувствительные данные без проверки **`$this->user`** (авторизация, группы, CSRF для форм).
- Для публичного API имеет смысл отдельная **авторизация** (токен, ключ), лимиты, логирование.
- Правило urlrewrite создаётся **программно** при первом же заходе на сайт после деплоя; при переносе БД правила могут уже быть в БД — дубликат **`initApi`** не добавит второе такое же правило.

## Связанные файлы

| Файл | Назначение |
|------|------------|
| [`legacy/api.php`](../www/local/php_interface/legacy/api.php) | Точка входа, разбор `apiMethodName`, вызов фабрики |
| [`legacy/classes/Api/ApiRoutes.php`](../www/local/php_interface/legacy/classes/Api/ApiRoutes.php) | Карта путь → класс |
| [`legacy/classes/Api/ApiFactory.php`](../www/local/php_interface/legacy/classes/Api/ApiFactory.php) | Создание экземпляра, валидация имени |
| [`legacy/classes/Api/Api.php`](../www/local/php_interface/legacy/classes/Api/Api.php) | Базовый класс: запрос, JSON, ошибки |
| [`legacy/classes/Events/CommonHandlers.php`](../www/local/php_interface/legacy/classes/Events/CommonHandlers.php) | Регистрация urlrewrite для `/api/` |
| [`legacy/eventHandlers/common.php`](../www/local/php_interface/legacy/eventHandlers/common.php) | Подключение обработчиков событий |
