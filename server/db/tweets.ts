import { Prisma } from ".prisma/client";
import { NewTweet } from "~~/types";
import { prisma } from ".";

export const createTweet = (tweetData: NewTweet) => {
  return prisma.tweet.create({ data: tweetData });
};

export const getTweets = (params: Prisma.TweetFindManyArgs = {}) => {
  return prisma.tweet.findMany({
    ...params,
  });
};

export const getTweetById = (
  id: string,
  params: Partial<Prisma.TweetFindUniqueArgs> = {}
) => {
  return prisma.tweet.findUnique({
    ...params,
    where: { ...params.where, id },
  });
};
