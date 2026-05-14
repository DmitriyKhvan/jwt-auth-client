import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { authApi } from "../api";
import { ROUTES } from "@/shared/constants/routes";
import { useAppDispatch } from "@/shared/redux";
import { authSlice } from "./auth.slice";
import { queryClient } from "@/shared/api/query-client";
import axios from "axios";

export function useSignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  const signInMutation = useMutation({
    mutationFn: authApi.login,

    async onSuccess(user) {
      queryClient.setQueryData(authApi.checkAuthQueryOptions().queryKey, user);
      dispatch(authSlice.actions.addUser({ user: user.data.user }));
      localStorage.setItem("token", user.data.accessToken);
      await navigate(location.state?.from || ROUTES.HOME);
    },
  });

  const signInError = axios.isAxiosError(signInMutation.error)
    ? signInMutation?.error?.response?.data.message
    : signInMutation.error?.message;

  return {
    register,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isPending,
    errors,
    signInError,
  };
}
