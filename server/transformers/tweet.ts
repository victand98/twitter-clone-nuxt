import { MediaFile, Tweet, User } from ".prisma/client";
import { mediaFileTransformer } from "./mediaFile";
import { userTransformer } from "./user";

export const tweetTransformer = (
  tweet: Tweet & {
    mediaFiles?: MediaFile[];
    author?: User;
    replies?: Tweet[];
    replyTo?: Tweet;
  }
) => {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: tweet.mediaFiles
      ? tweet.mediaFiles.map(mediaFileTransformer)
      : [],
    author: tweet.author ? userTransformer(tweet.author) : null,
    replies: tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
  };
};
