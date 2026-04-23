import { userApi } from "@/entities/user/api";
import { useQuery } from "@tanstack/react-query";

export function useUser(id: string) {
  const { data: user, isLoading, error } = useQuery({
    ...userApi.getUserQueryOptions(id),
    select: data => data.data
  });

  return { user, isLoading, error };
}
