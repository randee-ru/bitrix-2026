<template id="demo-welcome">
  <div class="tw-rounded-lg tw-border tw-border-zinc-200 tw-bg-white tw-p-4 tw-shadow-sm">
    <p class="tw-m-0 tw-text-sm tw-text-zinc-700">
      Vue-компонент <code class="tw-text-xs">demo-welcome</code> подключён через
      <span class="tw-font-medium">denx-b/bitrix-vue-component</span>.
    </p>
  </div>
</template>

<script>
  Vue.component('demo-welcome', {
    template: '#demo-welcome',
    data: function () {
      return {};
    },
  });
</script>
