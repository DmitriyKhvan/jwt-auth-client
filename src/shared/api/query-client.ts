import { QueryClient } from "@tanstack/react-query";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  },
});

export function useAppMutation<TData, TVariables, TError = unknown>(
  options: UseMutationOptions<TData, TError, TVariables>,
) {
  return useMutation(options);
}
