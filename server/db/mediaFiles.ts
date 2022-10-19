import { NewMediaFile } from "~~/types";
import { prisma } from ".";

export const createMediaFile = (mediaFile: NewMediaFile) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};
