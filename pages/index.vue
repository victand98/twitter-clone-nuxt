<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import { TweetItem } from "~~/types";

const { twitterBorderColor } = useTailwindConfig();
const { getHomeTweets } = useTweets();
const loading = ref(false);
const homeTweets = ref<TweetItem[]>([]);
const { useAuthUser } = useAuth();

const user = useAuthUser();

onBeforeMount(async () => {
  loading.value = true;
  try {
    const { tweets } = await getHomeTweets();
    homeTweets.value = tweets;
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
});

const handleFormSuccess = (tweet: TweetItem) => {
  navigateTo({ path: `/status/${tweet.id}` });
};
</script>
