import { rootReducer } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDto } from "../api";

interface AuthState {
  token: string | null;
  user: UserDto | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    token: state => state.token,
    user: state => state.user
  },
  reducers: {
    addUser(state, action: PayloadAction<{user: UserDto}>) {
      state.user = action.payload.user;
    },
    removeUser(state) {
      state.user = null;
    }, 
    setToken(state, action: PayloadAction<{token: string}>) {
      state.token = action.payload.token;
    }
  }
}).injectInto(rootReducer);  

