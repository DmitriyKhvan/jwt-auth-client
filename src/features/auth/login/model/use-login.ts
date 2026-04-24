import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api";

export function useLogin() {
  const {
    mutate: login,
    isPending: isLoading,
    error: loginError
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: authApi.login
  });

  return { login, isLoading, loginError };
}
