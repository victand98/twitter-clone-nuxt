<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon
      color="blue"
      :size="size"
      @on-click="emits('onCommentClick')"
    >
      <template v-slot:icon="{ classes }">
        <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">{{
        props.repliesCount
      }}</template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="yellow" :size="size">
      <template v-slot:icon="{ classes }">
        <ArrowUpIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  ArrowUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/vue/24/outline";
import type { TweetItem } from "~~/types";

export interface TweetItemActionsProps {
  repliesCount: TweetItem["repliesCount"];
  compact?: boolean;
}
export interface TweetItemActionsEmits {
  (event: "onCommentClick"): void;
}

const props = withDefaults(defineProps<TweetItemActionsProps>(), {
  compact: false,
});
const emits = defineEmits<TweetItemActionsEmits>();

const showStats = computed(() => props.compact);
const size = computed(() => (props.compact ? 5 : 8));

const generateRandomNumber = () => Math.floor(Math.random() * 100);
</script>
