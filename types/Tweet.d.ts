import { MediaFile, User } from ".prisma/client";

export interface NewTweet {
  text: string;
  authorId: string;
  replyToId?: string;
}

export interface TweetItem {
  id: string;
  text: string;
  mediaFiles: MediaFile[];
  author?: User | null;
  replies?: TweetItem[];
  replyTo?: TweetItem | null;
  repliesCount: number;
  postedAt: string;
}
