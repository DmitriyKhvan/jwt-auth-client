import { queryClient } from "@/shared/api/query-client";
import type { AppThunk } from "@/shared/redux";
import { MutationObserver } from "@tanstack/react-query";
import { authApi } from "../api";
import { authSlice } from "./auth.slice";
import { ROUTES } from "@/shared/constants/routes";

export const signOutThunk =
  (): AppThunk =>
  async (dispatch, _, { router }) => {
    await new MutationObserver(queryClient, {
      mutationFn: authApi.logout,
    }).mutate();

    queryClient.removeQueries();
    localStorage.removeItem("token");
    dispatch(authSlice.actions.removeUser());

    await router.navigate(ROUTES.SIGN_IN);
  };
