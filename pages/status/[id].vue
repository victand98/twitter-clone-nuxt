<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>

      <TweetDetails :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import { TweetItem } from "~~/types";

const loading = ref(false);
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const user = useAuthUser();
const tweet = ref<TweetItem | null>(null);

watch(
  () => useRoute().fullPath,
  () => getTweet()
);

const getTweetIdFromRoute = () => {
  const route = useRoute();
  return route.params.id;
};

const getTweet = async () => {
  loading.value = true;
  try {
    const tweetId = getTweetIdFromRoute();
    const response = await getTweetById(tweetId as string);
    tweet.value = response.tweet;
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(() => {
  getTweet();
});
</script>
