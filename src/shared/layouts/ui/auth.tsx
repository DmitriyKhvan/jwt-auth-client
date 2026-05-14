import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { Outlet, useNavigation } from "react-router";

export const AuthLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <main className="grow flex flex-col pt-24">
        <div className="rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-100 bg-white self-center ">
          {isLoading ? <UiPageSpinner /> : <Outlet />}
          {/* <Outlet /> */}
        </div>
      </main>
    </div>
  );
};
