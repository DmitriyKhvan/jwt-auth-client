import { queryClient } from "@/shared/api/query-client";
import type { AppThunk } from "@/shared/redux";
import { authApi } from "../../api";
import { MutationObserver } from "@tanstack/react-query";
import { authSlice } from "../../model/auth.slice";

export const logoutThunk = (): AppThunk => async (dispatch, _, {router}) => {
  await new MutationObserver(queryClient, {
    mutationFn: authApi.logout
  }).mutate();

  queryClient.removeQueries();
  localStorage.removeItem("token");
  dispatch(authSlice.actions.removeUser());

  await router.navigate("/login");
}