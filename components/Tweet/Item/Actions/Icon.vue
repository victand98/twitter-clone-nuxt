<template>
  <div class="flex items-center text-gray-400 cursor-pointer group">
    <div
      class="p-2 group-hover:bg-blue-100 group-hover:text-blue-400 rounded-full"
    >
      <ChartBarIcon class="w-5 h-5" />
    </div>

    <span class="ml-1 group-hover:text-blue-400">5</span>
  </div>
</template>

<script setup lang="ts">
import { ChartBarIcon } from "@heroicons/vue/20/solid";
</script>
