<template>
  <div>
    <label
      for=""
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <input
      @input="(event) => emits('update:modelValue', (event.target as HTMLInputElement).value)"
      :type="props.type"
      :value="props.modelValue"
      class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<script setup lang="ts">
export interface InputProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<InputProps>(), {
  label: null,
  placeholder: "",
  type: "text",
});
</script>
