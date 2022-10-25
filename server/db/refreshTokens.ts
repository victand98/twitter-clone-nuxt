import { RefreshToken } from "~~/types/RefreshToken";
import { prisma } from ".";

export const createRefreshToken = (refreshToken: RefreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  });
};

export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({ where: { token } });
};

export const removeRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({ where: { token } });
};
