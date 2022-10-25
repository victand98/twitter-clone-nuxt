import { User } from "~~/types";
import jwtDecode from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

export default () => {
  const useAuthToken = () => useState<string>("auth_token");
  const useAuthUser = () => useState<Omit<User, "password">>("auth_user");
  const useAuthLoading = () => useState<boolean>("auth_loading", () => true);

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: Omit<User, "password">) => {
    const authToken = useAuthUser();
    authToken.value = newUser;
  };

  const setAuthLoading = (value: boolean) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
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

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) return;

    const jwt = jwtDecode(authToken.value) as JwtPayload;
    const newRefreshTime = jwt.exp - 60000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true);
      try {
        await refreshToken();
        await getUser();

        reRefreshAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setAuthLoading(false);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi("/api/auth/logout", {
          method: "POST",
        });
        setToken(null);
        setUser(null);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    useAuthUser,
    initAuth,
    useAuthToken,
    useAuthLoading,
    logout,
  };
};
