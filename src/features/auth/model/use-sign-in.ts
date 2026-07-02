import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { authApi } from "../api";
import { ROUTES } from "@/shared/constants/routes";
import { useAppDispatch } from "@/shared/redux";
import { authSlice } from "./auth.slice";
import { queryClient } from "@/shared/api/query-client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { emailSchema, passwordSchema } from "./schemas";

const TOKEN = "token";

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type FormState = z.input<typeof formSchema>;

export function useSignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({ resolver: zodResolver(formSchema) });

  const signInMutation = useMutation({
    mutationFn: authApi.login,

    async onSuccess(user) {
      queryClient.setQueryData(authApi.checkAuthQueryOptions().queryKey, user);
      dispatch(authSlice.actions.addUser({ user: user.data.user }));
      localStorage.setItem(TOKEN, user.data.accessToken);
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
