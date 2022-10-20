import { TweetFormData } from "~~/components/Tweet/Form/Input.vue";
import { TweetItem } from "~~/types";

export default () => {
  const postTweet = (formData: TweetFormData) => {
    const form = new FormData();

    form.append("text", formData.text);

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append(`media_file_${index}`, mediaFile);
    });

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };

  const getHomeTweets = () => {
    return new Promise<{ tweets: TweetItem[] }>(async (resolve, reject) => {
      try {
        const response = await useFetchApi<{ tweets: TweetItem[] }>(
          "/api/tweets",
          { method: "GET" }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { postTweet, getHomeTweets };
};
