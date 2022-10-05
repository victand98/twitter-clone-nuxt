import { User } from "~~/types";

export default () => {
  const useAuthToken = () => useState<string>("auth_token");

  const useAuthUser = () => useState<Omit<User, "password">>("auth_user");

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: Omit<User, "password">) => {
    const authToken = useAuthUser();
    authToken.value = newUser;
  };

  const login = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: { username, password },
        });

        setToken(data.accessToken);
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.accessToken);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi<{ user: User }>("/api/auth/user");
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken();
        await getUser();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { login, useAuthUser, initAuth, useAuthToken };
};
