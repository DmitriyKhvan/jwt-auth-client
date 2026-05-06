import { queryClient } from "@/shared/api/query-client";
import type { AppThunk } from "@/shared/redux";
import { MutationObserver, useMutationState } from "@tanstack/react-query";
import { authApi } from "../../api";
import { authSlice } from "../../model/auth.slice";
import { ROUTES } from "@/shared/constants/routes";
import axios from "axios";

export const signUpThunk =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async (dispatch, _, { router }) => {
    try {
      const user = await new MutationObserver(queryClient, {
        mutationKey: ["registration"],
        mutationFn: authApi.registration,
      }).mutate({ email, password });

      if (user) {
        dispatch(authSlice.actions.addUser({ user: user.data.user }));
      }

      queryClient.setQueryData(authApi.checkAuthQueryOptions().queryKey, user);
      localStorage.setItem("token", user.data.accessToken);
      await router.navigate(ROUTES.HOME);
    } catch (e) {
      console.log(e);
    }
  };

export const useSignUpLoading = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ["registration"] },
    // select: (mutation) => mutation.state.error
  });

  return mutations.some((mutation) => mutation.status === "pending");
};

export const useSignUpError = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ["registration"] },
    // select: (mutation) => mutation.state.error
  });

  const error = mutations[mutations.length - 1]?.error;

  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }

  return error?.message;
};
