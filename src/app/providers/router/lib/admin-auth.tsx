import { authSlice } from "@/features/auth/model/auth.slice";
import { ROLES } from "@/shared/constants/roles";
import { useAppSelector } from "@/shared/redux";
import type React from "react";

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const user = useAppSelector(authSlice.selectors.user);

  if (!user?.roles.includes(ROLES.ADMIN)) {
    throw new Error("No access rights");
  }

  return children;
}
