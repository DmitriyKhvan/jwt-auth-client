import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client.ts";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import "./providers/i18n/config/i18n.ts";

import { router } from "./providers/router/ui/app-router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <Suspense fallback="loading...">
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
