import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Outlet, useNavigation } from "react-router";

export const MainLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-96px)] px-10 py-3">
        {isLoading ? <UiPageSpinner /> : <Outlet />}
      </main>
      <Footer />
    </>
  );
};
