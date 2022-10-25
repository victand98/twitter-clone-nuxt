import { sendError } from "h3";
import { removeRefreshToken } from "~~/server/db/refreshTokens";
import { sendRefreshToken } from "~~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const cookies = useCookies(event);
    const refreshToken = cookies.refresh_token;
    await removeRefreshToken(refreshToken);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: (error as Error)?.message || "Request error",
      })
    );
  }

  sendRefreshToken(event, null);

  return { message: "Done logging out" };
});
