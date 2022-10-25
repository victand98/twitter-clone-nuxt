<template>
  <div class="flex flex-col">
    <!-- Search Bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6">
          <MagnifyingGlassIcon @click="handleSearch" />
        </div>
      </div>
      <input
        v-model="search"
        type="text"
        class="flex items-center w-full pl-12 text-sm font-normal text-black dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
        placeholder="Search..."
      />
    </div>

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

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            @click.prevent="handleToggleDarkMode"
            >Dark mode</a
          >
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Accessability</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
        <li class="inline-block mx-2">
          &copy {{ currentDate.getFullYear() }} Twitter, Inc.
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export interface WhatsHappeningItem {
  count: string;
  title: string;
}
export interface WhoToFollowItem {
  name: string;
  handle: string;
  image: string;
}

const emitter = useEmitter();
const search = ref("");
const currentDate = ref(new Date());

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

const handleSearch = () => {
  useRouter().push({
    path: "/search",
    query: {
      q: search.value.trim(),
    },
  });
};

const handleToggleDarkMode = () => {
  emitter.$emit("toggle-dark-mode");
};
</script>
