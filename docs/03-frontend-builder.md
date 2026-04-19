# Сборщик (builder-2024)

Каталог **`frontend/`** — копия подхода из [builder-2024](https://github.com/denx-b/builder-2024): **Twig**, **SCSS**, **PostCSS + Tailwind**, **Webpack**, **Gulp**, в зависимостях уже есть **Swiper** (см. `frontend/package.json` и `frontend/src/js/main.js`).

## Куда падает сборка

Пути изменены так, что продакшен-сборка попадает в шаблон Битрикс:

`www/local/templates/legacy/build/` — **css**, **js**, изображения, статическая вёрстка из Twig (если нужна как прототип).

Файлы `gulp/config/path.js` и `webpack.config.cjs` в корне `frontend/` настроены на этот вывод.

## Команды

```bash
cd frontend
npm ci          # при изменении package.json — npm i
npm run serve   # разработка + BrowserSync (порт 3000 у gulp)
npm run build   # продакшен-сборка в legacy/build
```

Для удобства из корня: `make npm-build`.

## Tailwind и PHP-шаблоны

В `frontend/tailwind.config.js` в `content` добавлены пути к `../www/local/templates/legacy/**/*.php`, чтобы классы `tw-*` из шаблонов не вырезались при продакшен-сборке.

## Swiper

Логика слайдера — в `frontend/src/js/modules/swiper.js` (подключается из `main.js`). При необходимости добавьте разметку в Twig или в PHP-шаблоне компонента и стилизуйте через Tailwind/BEM.

## Связь с Битрикс

В `www/local/templates/legacy/header.php` подключаются:

- `build/css/style.min.css`
- `build/js/main.min.js`, `build/js/vendor.min.js`

После первого `npm run build` заглушки в `build/` будут заменены реальной сборкой.
