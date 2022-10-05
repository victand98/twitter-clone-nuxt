import { sendError } from "h3";
import { getRefreshTokenByToken } from "~~/server/db/refreshTokens";
import { getUserById } from "~~/server/db/users";
import { decodeRefreshToken, generateTokens } from "~~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const cookies = useCookies(event);

  const refreshToken = cookies.refresh_token;

  if (!refreshToken)
    return sendError(
      event,
      createError({
        statusMessage: "Refresh token is invalid",
        statusCode: 401,
      })
    );

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken)
    return sendError(
      event,
      createError({
        statusMessage: "Refresh token is invalid",
        statusCode: 401,
      })
    );

  const token = decodeRefreshToken(refreshToken);

  try {
    const user = await getUserById(token.userId);

    const { accessToken } = generateTokens(user);

    return { accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusMessage: "Something went wrong",
        statusCode: 500,
      })
    );
  }
});
