<template>
  <div>
    <TweetItem :tweet="props.tweet" />

    <TweetForm
      placeholder="Type here your reply"
      :user="props.user"
      :replyTo="props.tweet"
      @onSuccess="handleSuccess"
    />

    <TweetListFeed :tweets="replies" />
  </div>
</template>

<script setup lang="ts">
import type { TweetItem, User } from "~~/types";

const props = defineProps<{
  tweet: TweetItem;
  user: Omit<User, "password">;
}>();

const replies = computed(() => props.tweet?.replies || []);

const handleSuccess = (tweet: TweetItem) => {
  navigateTo({ path: `/status/${tweet.id}` });
};
</script>
