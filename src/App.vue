<script setup lang="ts">

</script>

<template>
<!--进度条-->
  <n-loading-bar-provider>
    <!--消息-->
    <n-message-provider>
      <!--模态框-->
      <n-modal-provider>
        <router-view />
      </n-modal-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>
