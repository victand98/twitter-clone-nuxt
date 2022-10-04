import { compareSync } from "bcrypt";
import { sendError } from "h3";
import { createRefreshToken } from "~~/server/db/refreshTokens";
import { getUserByUsername } from "~~/server/db/users";
import { userTransformer } from "~~/server/transformers/user";
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);

  const { username, password } = body;

  try {
    if (!username || !password) throw new Error("Invalid params");

    const user = await getUserByUsername(username);
    if (!user) throw new Error("Username or password is invalid");

    const doesPasswordMatch = await compareSync(password, user.password);
    if (!doesPasswordMatch) throw new Error("Username or password is invalid");

    const { accessToken, refreshToken } = generateTokens(user);

    await createRefreshToken({ token: refreshToken, userId: user.id });

    // Add http only cookie
    sendRefreshToken(event, refreshToken);

    return { accessToken, user: userTransformer(user) };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: (error as Error)?.message || "Request error",
      })
    );
  }
});
