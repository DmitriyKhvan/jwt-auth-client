import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import { emailSchema, passwordSchema } from "./schemas";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../api";
import { queryClient } from "@/shared/api/query-client";
import { ROUTES } from "@/shared/constants/routes";
import axios from "axios";
import { useAppDispatch } from "@/shared/redux";
import { authSlice } from "./auth.slice";

const formSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, { error: "Confirm password" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormState = z.input<typeof formSchema>;

export function useSignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: authApi.registration,
    async onSuccess(user) {
      queryClient.setQueryData(authApi.checkAuthQueryOptions().queryKey, user);
      dispatch(authSlice.actions.addUser({ user: user.data.user }));
      localStorage.setItem("token", user.data.accessToken);
      await navigate(ROUTES.HOME);
    },
  });

  const signUpError = axios.isAxiosError(signUpMutation.error)
    ? signUpMutation.error.response?.data.message
    : signUpMutation.error?.message;

  return {
    register,
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isLoading: signUpMutation.isPending,
    errors,
    signUpError,
  };
}
