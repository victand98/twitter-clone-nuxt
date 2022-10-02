<template>
  <nuxt-link
    to="#"
    class="flex items-center p-3 w-min text-black hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="h-6 w-6 text-dark" :class="defaultTransition">
      <slot name="icon" />
    </div>

    <div class="hidden ml-4 text-xl xl:block" :class="textClasses">
      <slot name="name" />
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
export interface TabProps {
  active?: boolean;
}
const { defaultTransition } = useTailwindConfig();

const props = withDefaults(defineProps<TabProps>(), {
  active: false,
});

const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
</script>
