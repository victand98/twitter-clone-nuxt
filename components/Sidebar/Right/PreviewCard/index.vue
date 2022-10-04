<template>
  <div
    class="m-2 overflow-hidden border bg-gray-50 rounded-2xl dark:bg-dim-700"
    :class="twitterBorderColor"
  >
    <h2
      class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white"
      :class="twitterBorderColor"
    >
      {{ props.title }}
    </h2>

    <slot />

    <div
      class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="defaultTransition"
    >
      Show more
    </div>
  </div>
</template>

<script setup lang="ts">
export interface PreviewCardProps {
  title: string;
}
const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const props = defineProps<PreviewCardProps>();
</script>
