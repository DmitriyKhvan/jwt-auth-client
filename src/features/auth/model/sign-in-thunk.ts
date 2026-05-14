import { queryClient } from "@/shared/api/query-client";
import type { AppThunk } from "@/shared/redux";
import { MutationObserver, useMutationState } from "@tanstack/react-query";

import axios from "axios";
import { ROUTES } from "@/shared/constants/routes";
import { authApi } from "../api";
import { authSlice } from "./auth.slice";

export const signInThunk =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async (dispatch, _, { router }) => {
    console.log("router", router.state.location.state?.from);

    try {
      const user = await new MutationObserver(queryClient, {
        mutationKey: ["login"],
        mutationFn: authApi.login,
        onSuccess: async (user) => {
          await router.navigate(
            router.state.location.state?.from || ROUTES.HOME,
          );
          dispatch(authSlice.actions.addUser({ user: user.data.user }));
          queryClient.setQueryData(
            authApi.checkAuthQueryOptions().queryKey,
            user,
          );
          localStorage.setItem("token", user.data.accessToken);
        },
      }).mutate({ email, password });

      // if (user) {
      //   dispatch(authSlice.actions.addUser({ user: user.data.user }));
      //   queryClient.setQueryData(
      //     authApi.checkAuthQueryOptions().queryKey,
      //     user,
      //   );
      //   localStorage.setItem("token", user.data.accessToken);
      //   router.navigate(router.state.location.state?.from || ROUTES.HOME);
      // }
    } catch (e) {
      console.log(e);
    }
  };

export const useSignInLoading = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ["login"] },
    // select: (mutation) => mutation.state.status
  });
  return mutations.some((mutation) => mutation.status === "pending");
};

export const useSignInError = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ["login"] },
    // select: (mutation) => mutation.state.error
  });

  console.log("mutations", mutations);

  const error = mutations[mutations.length - 1]?.error;

  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }

  return error?.message;
};
