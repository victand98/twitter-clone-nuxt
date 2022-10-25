<template>
  <div class="h-screen flex flex-col overflow-y-auto">
    <div
      class="p-2 my-2 w-min hover:bg-blue-50 rounded-full dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8"><LogoTwitter /></div>
      </nuxt-link>
    </div>

    <div class="mt-3 space-y-3">
      <SidebarLeftTab>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <EllipsisHorizontalCircleIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @on-click="emits('onTweet')">
          <div class="font-bold">Tweet</div>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton @on-click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto rounded-full mb-5 cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
      :class="defaultTransition"
      @click="emits('onLogout')"
    >
      <div class="flex flex-row">
        <img
          :src="props.user.profileImage"
          :alt="props.user.username"
          class="w-10 h-10 rounded-full"
        />
        <div class="hidden ml-2 xl:block flex-col">
          <h6 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ props.user.name }}
          </h6>

          <p class="text-sm text-gray-400">@{{ props.user.username }}</p>
        </div>
      </div>

      <div class="hidden ml-auto xl:block dark:text-white">
        <div class="w-6 h-6">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/20/solid";

import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import { User } from "~~/types";
export interface SidebarLeftTabEmits {
  (event: "onTweet"): void;
  (event: "onLogout"): void;
}

export interface SidebarLeftTabProps {
  user: Omit<User, "password">;
}

const { defaultTransition } = useTailwindConfig();
const emits = defineEmits<SidebarLeftTabEmits>();
const props = defineProps<SidebarLeftTabProps>();
</script>
