import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api";

export function useUsers() {
  const { data: users, isLoading, error } = useQuery({
    ...userApi.getUsersQueryOptions(),
    select: data => data.data
  });
  return { users, isLoading, error };
}
