import { sendError } from "h3";
import UrlPattern from "url-pattern";
import { getUserById } from "../db/users";
import { decodeAccessToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/auth/user",
    "/api/user/tweets",
    "/api/tweets",
    "/api/tweets/:id",
  ];

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.req.url);
  });

  if (!isHandledByThisMiddleware) return;

  const token = event.req.headers["authorization"]?.split(" ")[1];

  const decoded = decodeAccessToken(token);

  if (!decoded)
    return sendError(
      event,
      createError({
        statusMessage: "Unauthorized",
        statusCode: 401,
      })
    );

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);

    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
