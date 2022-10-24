<template>
  <div
    class="flex items-center text-gray-400 cursor-pointer group"
    @click.stop.prevent="emits('onClick')"
  >
    <div
      :class="`p-2 group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 rounded-full dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <slot name="icon" :classes="`w-${props.size} h-${props.size}`" />
    </div>

    <span :class="`ml-1 group-hover:text-${props.color}-400`">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
export interface TweetActionsIconProps {
  color: "red" | "blue" | "green" | "yellow";
  size?: number;
}
export interface TweetActionsIconEmits {
  (event: "onClick"): void;
}

const { defaultTransition } = useTailwindConfig();
const emits = defineEmits<TweetActionsIconEmits>();

const props = withDefaults(defineProps<TweetActionsIconProps>(), { size: 5 });
</script>
