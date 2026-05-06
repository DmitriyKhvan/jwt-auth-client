import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <main className="grow flex flex-col pt-24">
        <div className="rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-100 bg-white self-center ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
