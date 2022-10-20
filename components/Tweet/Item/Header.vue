<template>
  <div class="flex p-4">
    <div>
      <img
        class="w-10 h-10 rounded-full"
        :src="author.profileImage"
        :alt="author.id"
      />
    </div>

    <div class="ml-3">
      <span class="font-medium text-gray-800 dark:text-white">{{
        author.name
      }}</span>

      <span class="ml-3 text-sm font-medium text-gray-400">
        <nuxt-link to="#">@{{ author.username }}</nuxt-link
        >. {{ postedAt }}
      </span>

      <p v-if="replyTo" class="text-sm">
        <span class="text-gray-500">Replying to</span>
        <nuxt-link :to="replyToTweetUrl" class="text-blue-400">
          @{{ replyTo.author.username }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TweetItem } from "~~/types";

export interface TweetItemHeaderProps {
  author: TweetItem["author"];
  postedAt: TweetItem["postedAt"];
  replyTo: TweetItem["replyTo"];
}

const props = defineProps<TweetItemHeaderProps>();

const { author, postedAt, replyTo } = props;

const replyToTweetUrl = computed(() => `/status/${replyTo.id}`);
</script>
