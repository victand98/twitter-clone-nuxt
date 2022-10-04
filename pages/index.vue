<template>
  <div>
    <MainSection title="Home" :loading="loading"> Main content </MainSection>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
</script>
