<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img
          :src="props.user?.profileImage"
          :alt="props.user?.username"
          class="inline-block w-10 h-10 rounded-full"
        />
      </div>

      <div class="w-full p-2">
        <textarea
          v-model="text"
          class="w-full h-20 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
          placeholder="What's happening?"
        ></textarea>
      </div>
    </div>

    <div class="p-4 pl-14">
      <img
        :src="inputImageUrl"
        alt=""
        v-if="inputImageUrl"
        class="rounded-2xl border"
        :class="twitterBorderColor"
      />

      <input
        type="file"
        hidden
        ref="imageInput"
        accept="image/png, image/gif, image/jpg"
        @change="handleImageChange"
      />
    </div>

    <div class="flex p-2 pl-14">
      <div class="flex w-full text-white">
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:bg-dim-800 cursor-pointer"
          @click="handleImageClick"
        >
          <IconImageFrame />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:bg-dim-800 cursor-pointer"
        >
          <IconGif />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:bg-dim-800 cursor-pointer"
        >
          <IconChart />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:bg-dim-800 cursor-pointer"
        >
          <IconEmoji />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:bg-dim-800 cursor-pointer"
        >
          <IconCalendar />
        </div>
      </div>

      <div class="ml-auto">
        <UIButton :disabled="isDisabled" @onClick="handleFormSubmit">
          <strong>Tweet</strong>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "~~/types";

export interface TweetFormInputProps {
  user: Omit<User, "password">;
}

export interface TweetFormData {
  text: string;
  mediaFiles: File[];
}

export interface TweetFormInputEmits {
  (event: "onSubmit", data: TweetFormData): void;
}

const { twitterBorderColor } = useTailwindConfig();
const imageInput = ref();
const selectedFile = ref<File>(null);
const inputImageUrl = ref<string>(null);
const text = ref("");
const emits = defineEmits<TweetFormInputEmits>();

const isDisabled = computed(() => text.value.trim() === "");

const props = defineProps<TweetFormInputProps>();

const handleFormSubmit = () => {
  emits("onSubmit", { text: text.value, mediaFiles: [selectedFile.value] });
};

const handleImageClick = () => {
  imageInput.value.click();
};

const handleImageChange = (event) => {
  const file = (event.target.files as FileList)[0];
  selectedFile.value = file === undefined ? null : file;

  if (!file) {
    inputImageUrl.value = null;
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    if (typeof event.target.result === "string")
      inputImageUrl.value = event.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
