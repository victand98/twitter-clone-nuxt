<template>
  <div>
    <TweetItemHeader v-bind="tweet" />

    <div class="ml-16">
      <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white">
        {{ props.tweet.text }}
      </p>

      <div
        v-for="image in props.tweet.mediaFiles"
        :key="image.id"
        class="flex my-3 mr-2 border-2 rounded-2xl"
        :class="twitterBorderColor"
      >
        <img :src="image.url" :alt="image.id" class="w-full rounded-2xl" />
      </div>

      <div class="mt-2"><TweetItemActions /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TweetItem } from "~~/types";

export interface TweetItemProps {
  tweet: TweetItem;
}

const { twitterBorderColor } = useTailwindConfig();
const props = defineProps<TweetItemProps>();
</script>
