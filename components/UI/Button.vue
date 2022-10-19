<template>
  <button
    class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
    :disabled="props.disabled"
    :class="classes"
    @click="handleClick"
  >
    <span :class="textFontSize">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
export interface UIButtonProps {
  disabled?: boolean;
  size?: "sm" | "lg";
  liquid?: boolean;
}

export interface UIButtonEmits {
  (event: "onClick", payload: MouseEvent): void;
}

const emits = defineEmits<UIButtonEmits>();

const props = withDefaults(defineProps<UIButtonProps>(), {
  disabled: false,
  size: "sm",
  liquid: false,
});

const paddingClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-2 px-3";

    case "lg":
      return "px-4 py-3";

    default:
      return "px-3 py-3";
  }
});

const textFontSize = computed(() => {
  switch (props.size) {
    case "lg":
      return "text-md";

    default:
      return "text-sm";
  }
});

const defaultWidth = computed(() => {
  switch (props.size) {
    default:
      return "w-min";
  }
});

const classes = computed(
  () =>
    `${paddingClasses.value} ${props.liquid ? "w-full" : defaultWidth.value}`
);

const handleClick = (payload: MouseEvent) => {
  emits("onClick", payload);
};
</script>
