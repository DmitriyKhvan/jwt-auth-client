import { $api } from "@/shared/api/api-instance";
import type { UserDto } from "@/features/auth/api";
import { queryOptions } from "@tanstack/react-query";

export const userApi = {
  basekey: "users",
  getUsersQueryOptions() {
    return queryOptions({
      queryKey: [userApi.basekey],
      queryFn: meta => {
        return $api.get<UserDto[]>('/users', {signal: meta.signal});
      }, 
    })
  },

  getUserQueryOptions(id: string) {
    return queryOptions({
      queryKey: [userApi.basekey, id],
      queryFn: meta => $api.get<UserDto>(`/users/${id}`, {signal: meta.signal})
    })
  }
};