<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>

    <div v-else>
      <TweetItem
        :tweet="props.replyTo"
        v-if="props.replyTo && props.showReplyTo"
        hideActions
      />
      <TweetFormInput
        :user="props.user"
        @onSubmit="handleFormSubmit"
        :placeholder="props.placeholder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TweetItem, User } from "~~/types";
import { TweetFormData } from "./Input.vue";

export interface TweetFormProps {
  user: Omit<User, "password">;
  placeholder?: string;
  replyTo?: TweetItem | null;
  showReplyTo?: boolean;
}
export interface TweetFormEmits {
  (event: "onSuccess", data: TweetItem): void;
}

const loading = ref(false);
const { postTweet } = useTweets();
const props = withDefaults(defineProps<TweetFormProps>(), {
  placeholder: "What's happening?",
  replyTo: null,
  showReplyTo: false,
});
const emits = defineEmits<TweetFormEmits>();

const handleFormSubmit = async (data: TweetFormData) => {
  loading.value = true;
  try {
    const response = await postTweet({ ...data, replyTo: props.replyTo?.id });
    emits("onSuccess", response.tweet);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};
</script>
