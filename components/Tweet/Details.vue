<template>
  <div>
    <TweetItem :tweet="tweet" />

    <TweetForm
      placeholder="Type here your reply"
      :user="user"
      :replyTo="tweet"
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
const { tweet, user } = props;

const replies = computed(() => tweet.replies || []);

const handleSuccess = (data: TweetItem) => {
  navigateTo({ path: `/status/${data.id}` });
};
</script>
