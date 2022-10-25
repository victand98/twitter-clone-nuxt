<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search / Twitter</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import { TweetItem } from "~~/types";

const { getTweets } = useTweets();
const loading = ref(false);
const searchTweets = ref<TweetItem[]>([]);

watch(
  () => useRoute().fullPath,
  () => getSearchTweets()
);

onBeforeMount(() => {
  getSearchTweets();
});

const getSearchTweets = async () => {
  loading.value = true;
  try {
    const searchQuery = useRoute().query.q;
    const { tweets } = await getTweets({ query: searchQuery });
    searchTweets.value = tweets;
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};
</script>
