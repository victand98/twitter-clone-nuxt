import { TweetFormData } from "~~/components/Tweet/Form/Input.vue";
import { TweetItem } from "~~/types";

export default () => {
  const usePostTweetModal = () => useState("post_tweet_modal", () => false);
  const useReplyTweet = () => useState<TweetItem>("reply_tweet", () => null);

  const setReplyTo = (tweet: TweetItem) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  };

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

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = false;
  };

  const openPostTweetModal = (tweet: TweetItem = null) => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = true;

    setReplyTo(tweet);
  };

  return {
    postTweet,
    getHomeTweets,
    getTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
  };
};
