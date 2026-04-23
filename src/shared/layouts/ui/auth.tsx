import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <>
      <h1>Auth</h1>
      <Outlet />
    </>
  );
};
