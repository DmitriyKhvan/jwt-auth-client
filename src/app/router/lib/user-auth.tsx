import { authSlice } from "@/features/auth/model/auth.slice";
import { useAppSelector } from "@/shared/redux";
import type React from "react";

export function UserAuth({ children }: { children: React.ReactNode }) {
  const user = useAppSelector(authSlice.selectors.user);

  if (!user?.roles.includes("USER")) {
    throw new Error('No access rights');
  }

  return children
}
