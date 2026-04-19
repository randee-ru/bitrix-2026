<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

/** @global $APPLICATION */

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Page\Asset;

Loc::loadMessages(__FILE__);

$asset = Asset::getInstance();

global $USER;
if (is_object($USER) && $USER->IsAdmin() && !defined('DBOGDANOFF_DEV')) {
    define('DBOGDANOFF_DEV', true);
}

if (class_exists(\Dbogdanoff\Bitrix\Vue::class)) {
    \Dbogdanoff\Bitrix\Vue::includeComponent(['demo-welcome']);
}

$asset->addCss(SITE_TEMPLATE_PATH . '/build/css/style.min.css');
$asset->addJs(SITE_TEMPLATE_PATH . '/build/js/main.min.js');
$asset->addJs(SITE_TEMPLATE_PATH . '/build/js/vendor.min.js');

$asset->addString('<link rel="icon" type="image/x-icon" href="' . SITE_TEMPLATE_PATH . '/favicon.ico"/>');
$asset->addString('<meta name="viewport" content="width=device-width, initial-scale=1">');
?><!doctype html>
<html xml:lang="<?= LANGUAGE_ID ?>" lang="<?= LANGUAGE_ID ?>">
<head>
    <title><?= $APPLICATION->ShowTitle() ?></title>
    <?php $APPLICATION->ShowHead(); ?>
</head>
<body>
<div id="panel"><?php $APPLICATION->ShowPanel() ?></div>
