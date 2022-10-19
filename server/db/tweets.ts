import { NewTweet } from "~~/types";
import { prisma } from ".";

export const createTweet = (tweetData: NewTweet) => {
  return prisma.tweet.create({ data: tweetData });
};
