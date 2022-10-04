import { RefreshToken } from "~~/types/RefreshToken";
import { prisma } from ".";

export const createRefreshToken = (refreshToken: RefreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  });
};
