import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Outlet, useNavigation } from "react-router";

export const MainLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main className="grow px-10 py-3">
        {isLoading ? <UiPageSpinner /> : <Outlet />}
        {/* <Outlet /> */}
      </main>
      <Footer />
    </div>
  );
};
