import { TweetFormData } from "~~/components/Tweet/Form/Input.vue";
import { TweetItem } from "~~/types";

export default () => {
  const postTweet = (formData: TweetFormData) => {
    const form = new FormData();

    form.append("text", formData.text);
    form.append("replyTo", formData.replyTo);

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append(`media_file_${index}`, mediaFile);
    });

    return useFetchApi<{ tweet: TweetItem }>("/api/user/tweets", {
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

  const getTweetById = (id: string) => {
    return new Promise<{ tweet: TweetItem }>(async (resolve, reject) => {
      try {
        const response = await useFetchApi<{ tweet: TweetItem }>(
          `/api/tweets/${id}`,
          { method: "GET" }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { postTweet, getHomeTweets, getTweetById };
};
