<template>
  <div>
    <h1>
      {{ props.title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
export interface PreviewCardProps {
  title: string;
}

const props = defineProps<PreviewCardProps>();
</script>
