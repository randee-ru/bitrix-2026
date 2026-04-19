<?php

declare(strict_types=1);

/**
 * Точка входа сайта. Требуется ядро 1С-Битрикс в каталоге /bitrix.
 * Пока ядро не развёрнуто, показываем подсказку и ссылку на документацию.
 */

if (!is_dir(__DIR__ . '/bitrix')) {
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Битрикс ещё не установлен</title>';
    echo '<style>body{font-family:system-ui,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1rem;line-height:1.5}code{background:#f4f4f5;padding:.1rem .35rem;border-radius:4px}</style>';
    echo '</head><body><h1>Ядро 1С-Битрикс не найдено</h1>';
    echo '<p>В каталоге <code>www/bitrix</code> должно лежать ядро продукта (скачайте дистрибутив с сайта 1С-Битрикс или восстановите из резервной копии).</p>';
    echo '<p>После копирования файлов откройте сайт снова — запустится мастер установки или существующая БД.</p>';
    echo '<p>Подробности в репозитории: файл <code>docs/01-bitrix-core.md</code> (в корне проекта на диске, не внутри Docker).</p>';
    echo '</body></html>';
    exit;
}

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';

$APPLICATION->SetTitle('Главная');

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php';
