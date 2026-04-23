import { store } from "@/app/store";
import { authApi } from "@/features/auth/api";
import { authSlice } from "@/features/auth/model/auth.slice";
import { queryClient } from "@/shared/api/query-client";
import type { AxiosError } from "axios";
import { redirect } from "react-router";


export async function requireAuth() {
  try {
    const { data } = await queryClient.fetchQuery({
      ...authApi.checkAuthQueryOptions()
    });

    if (!data) {
      throw redirect("/login");
    }

    localStorage.setItem("token", data.accessToken);
    store.dispatch(authSlice.actions.addUser({ user: data.user }));

    return data;
  } catch (error) {
    throw new Response('Not Authorized', { 
      status: (error as AxiosError).response?.status
    });
  }
}
