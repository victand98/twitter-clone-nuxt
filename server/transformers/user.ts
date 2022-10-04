import { UserModel } from "~~/types";

export const userTransformer = (user: UserModel) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
  };
};
