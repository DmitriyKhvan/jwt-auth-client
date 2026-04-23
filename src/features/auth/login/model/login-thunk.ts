import { queryClient } from "@/shared/api/query-client";
import type { AppThunk } from "@/shared/redux";
import { MutationObserver, useMutationState } from "@tanstack/react-query";
import { authApi } from "../../api";
import { authSlice } from "../../model/auth.slice";
import axios from "axios";

export const loginThunk = (
  email: string, 
  password: string, 
): AppThunk => async (dispatch, _, {router}) => {

  console.log('router', router.state.location.state?.from);
  
  try {
    const user = await new MutationObserver(queryClient, {
      mutationKey: ['login'],
      mutationFn: authApi.login
    }).mutate({ email, password });
    
    console.log("user", user);
    
    if (user) {
      dispatch(authSlice.actions.addUser({user: user.data.user}));
    }

    queryClient.setQueryData(authApi.checkAuthQueryOptions().queryKey, user);
    localStorage.setItem("token", user.data.accessToken);
    await router.navigate(router.state.location.state?.from || "/");
  } catch(e) {
    console.log(e);
  }
  
}

export const useLoginLoading = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ['login'] },
    // select: (mutation) => mutation.state.status
  })
  return mutations.some(mutation => mutation.status === "pending");
}

export const useLoginError = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ['login'] },
    // select: (mutation) => mutation.state.error
  })

  console.log("mutations", mutations);
  

  const error = mutations[mutations.length - 1]?.error;

  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }

  return error?.message;
}