import { FetchOptions } from "ohmyfetch";

export default <T = unknown>(url: string, options: FetchOptions = {}) => {
  const { useAuthToken } = useAuth();

  return $fetch<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });
};
