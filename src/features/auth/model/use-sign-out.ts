import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api";
import { ROUTES } from "@/shared/constants/routes";
import { queryClient } from "@/shared/api/query-client";
import { store } from "@/app/store";
import { authSlice } from "./auth.slice";

export function useSignOut() {
  const navigate = useNavigate();

  const signOutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess() {
      navigate(ROUTES.SIGN_IN);
      queryClient.removeQueries();
      localStorage.removeItem("token");
      store.dispatch(authSlice.actions.removeUser());
    },
  });

  return {
    isLoading: signOutMutation.isPending,
    signOut: signOutMutation.mutate,
  };
}
