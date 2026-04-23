import type { AxiosResponse } from "axios";
import { $api } from "@/shared/api/api-instance";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export type UserDto = {
  _id: string;
  email: string;
  roles: string[];
};

export const authApi = {
  basekey: "user",

  login({email,password}: {email: string, password: string}): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  },

  registration({email, password}:{email: string, password: string}): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password });
  },

  logout(): Promise<void> {
    return $api.post('/logout');
  },

  checkAuthQueryOptions() {
    return queryOptions({
      queryKey: [authApi.basekey],
      queryFn: meta => axios.get<AuthResponse>(`${import.meta.env.VITE_API_URL}/refresh`, { withCredentials: true, signal: meta.signal })
    })
  }
}
