<script setup lang="ts">
const appStore = useAppStore();
console.log(appStore.test);
</script>

<template>
  <div>test</div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: Base
</route>
