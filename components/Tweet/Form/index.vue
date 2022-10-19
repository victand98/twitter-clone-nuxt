<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>

    <div v-else>
      <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "~~/types";
import { TweetFormData } from "./Input.vue";

export interface TweetFormProps {
  user: Omit<User, "password">;
}

const loading = ref(false);
const { postTweet } = useTweets();
const props = defineProps<TweetFormProps>();

const handleFormSubmit = async (data: TweetFormData) => {
  loading.value = true;
  try {
    const response = await postTweet(data);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};
</script>
