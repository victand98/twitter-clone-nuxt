<template>
  <div>
    <TweetItemHeader v-bind="tweet" />

    <div :class="tweetBodyWrapper">
      <p
        class="flex-shrink font-medium text-gray-800 w-auto dark:text-white"
        :class="textSize"
      >
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

      <div class="mt-2" v-if="!props.hideActions">
        <TweetItemActions
          v-bind="tweet"
          :compact="props.compact"
          @on-comment-click="handleCommentClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TweetItem } from "~~/types";

export interface TweetItemProps {
  tweet: TweetItem;
  compact?: boolean;
  hideActions?: boolean;
}

const { twitterBorderColor } = useTailwindConfig();
const emitter = useEmitter();
const props = withDefaults(defineProps<TweetItemProps>(), {
  compact: false,
  hideActions: false,
});

const tweetBodyWrapper = computed(() =>
  props.compact ? "ml-16" : "ml-2 mt-4"
);

const textSize = computed(() => (props.compact ? "text-base" : "text-2xl"));

const handleCommentClick = () => {
  emitter.$emit("replyTweet", props.tweet);
};
</script>
