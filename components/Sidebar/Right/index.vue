<template>
  <div class="flex flex-col">
    <!-- Preview Card -->
    <SidebarRightPreviewCard title="What's happenning">
      <SidebarRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
      >
        <div>
          <h3 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h3>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Follow Card -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
        <div class="flex items-center justify-between p-2">
          <div class="flex">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollow.image"
              :alt="whoToFollow.name"
            />

            <div class="flex flex-col ml-2">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h3>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <div></div>
  </div>
</template>

<script setup lang="ts">
export interface WhatsHappeningItem {
  count: string;
  title: string;
}
export interface WhoToFollowItem {
  name: string;
  handle: string;
  image: string;
}

const whatsHappeningItems = ref<WhatsHappeningItem[]>([
  {
    count: "18.8k Tweets",
    title: "SpaceX",
  },
  {
    count: "8.8k Tweets",
    title: "#Coding",
  },
  {
    count: "1k Tweets",
    title: "#Art",
  },
]);

const whoToFollowItems = ref<WhoToFollowItem[]>([
  {
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
    name: "Joe Bidden",
  },
  {
    handle: "@CR7",
    image: "https://picsum.photos/200/200",
    name: "Cristiano Ronaldo",
  },
  {
    handle: "@nuxtjs",
    image: "https://picsum.photos/200/200",
    name: "Nuxt 3",
  },
]);
</script>
