import bcrypt from "bcrypt";
import { User } from "~~/types";
import { prisma } from ".";

export const createUser = (userData: User) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({ data: finalUserData });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};
