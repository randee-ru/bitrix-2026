<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

/** @global $APPLICATION */
?>

<div id="app-vue-demo" class="tw-py-8 tw-container tw-mx-auto tw-px-4">
    <demo-welcome></demo-welcome>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof Vue === 'undefined' || !document.querySelector('#app-vue-demo')) {
      return;
    }
    new Vue({ el: '#app-vue-demo' });
  });
</script>

</body>
</html>
