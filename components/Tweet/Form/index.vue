<template>
  <div>
    <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup lang="ts">
import { User } from "~~/types";
import { TweetFormData } from "./Input.vue";

export interface TweetFormProps {
  user: Omit<User, "password">;
}
const { postTweet } = useTweets();
const props = defineProps<TweetFormProps>();

const handleFormSubmit = async (data: TweetFormData) => {
  try {
    const response = await postTweet(data);
  } catch (error) {
    console.log("error", error);
  }
};
</script>
