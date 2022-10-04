import { sendError } from "h3";
import { createUser } from "~~/server/db/users";
import { userTransformer } from "~~/server/transformers/user";
import { User } from "~~/types";

export default defineEventHandler(async (event) => {
  const body = await useBody<User & { repeatPassword: string }>(event);

  const { username, email, name, password, repeatPassword } = body;

  try {
    if (password !== repeatPassword) throw new Error("Passwords do not match");

    const user = await createUser({
      email,
      name,
      password,
      username,
      profileImage: "https://picsum.photos/200/200",
    });

    return { body: userTransformer(user) };
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
