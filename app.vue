<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />

      <!-- App -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- left sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                @on-tweet="handleOpenTweetModal"
                :user="user"
                @on-logout="handleUserLogout"
              />
            </div>
          </div>

          <!-- main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view></router-view>
          </main>

          <!-- right sidebard -->
          <div class="hidden md:block md:col-span-3 xl:col-span-4">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />

      <UIModal :isOpen="postTweetModal" @onClose="handleModalClose">
        <TweetForm
          :user="user"
          @on-success="handleFormSuccess"
          :replyTo="replyTweet"
          showReplyTo
        />
      </UIModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TweetItem } from "./types";

const darkMode = ref(false);
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const isAuthLoading = useAuthLoading();
const {
  closePostTweetModal,
  usePostTweetModal,
  openPostTweetModal,
  useReplyTweet,
} = useTweets();
const user = useAuthUser();
const postTweetModal = usePostTweetModal();
const emitter = useEmitter();
const replyTweet = useReplyTweet();

emitter.$on("replyTweet", (tweet: TweetItem) => {
  openPostTweetModal(tweet);
});

emitter.$on("toggle-dark-mode", () => {
  darkMode.value = !darkMode.value;
});

onBeforeMount(() => {
  initAuth();
});

const handleFormSuccess = (tweet: TweetItem) => {
  closePostTweetModal();
  navigateTo({ path: `/status/${tweet.id}` });
};

const handleModalClose = () => {
  closePostTweetModal();
};

const handleOpenTweetModal = () => {
  openPostTweetModal(null);
};

const handleUserLogout = () => {
  logout();
  // navigateTo({ path: "/" });
};
</script>
