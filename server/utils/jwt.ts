import { H3Event } from "h3";
import jwt from "jsonwebtoken";
import { UserModel } from "~~/types";

const generateAccessToken = (user: UserModel) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user: UserModel) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "4h",
  });
};

export const generateTokens = (user: UserModel) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, "refresh_token", token, { httpOnly: true, sameSite: true });
};
