import axios, { AxiosError } from "axios";
import { queryClient } from "./query-client";
import { authApi } from "@/features/auth/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
});

$api.interceptors.request.use(config => {
  console.log("Interceptor", config);
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await queryClient.fetchQuery({
          ...authApi.checkAuthQueryOptions()
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        throw new Response("Not Authorized", {
          status: (error as AxiosError).response?.status
        });
      }
    }
    // return Promise.reject(error); // ✅ ВОТ ЭТОГО НЕ ХВАТАЛО
    throw error;
  }
);

export { $api };
