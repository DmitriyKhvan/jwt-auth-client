import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api";
import { ROUTES } from "@/shared/constants/routes";
import { queryClient } from "@/shared/api/query-client";
import { authSlice } from "./auth.slice";
import { useAppDispatch } from "@/shared/redux";

export function useSignOut() {
  const navigate = useNavigate();

  const signOutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess() {
      navigate(ROUTES.SIGN_IN);
      useResetSession();
    },
  });

  return {
    isLoading: signOutMutation.isPending,
    signOut: signOutMutation.mutate,
  };
}

export function useResetSession() {
  const dispatch = useAppDispatch();
  queryClient.removeQueries();
  localStorage.removeItem("token");
  dispatch(authSlice.actions.removeUser());
}
