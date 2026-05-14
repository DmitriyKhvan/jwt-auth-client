import { extra } from "@/app/store";
import {
  // Route,
  createBrowserRouter,
  // createRoutesFromElements
} from "react-router";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ROUTES } from "@/shared/constants/routes";

import { AuthLayout, MainLayout } from "@/shared/layouts";
import { requireAuth } from "../lib/require-auth";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <RootLayout />,
    HydrateFallback: () => <UiPageSpinner />,
    lazy: async () => {
      const error = await import("@/pages/error");
      return {
        errorElement: <error.ErrorPage />,
      };
    },

    children: [
      // public
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.SIGN_IN,
            lazy: async () => {
              const module = await import("@/pages/sing-in");
              return { Component: module.LoginPage };
            },
          },
          {
            path: ROUTES.SIGN_UP,
            lazy: async () => {
              const module = await import("@/pages/sign-up");
              return { Component: module.SignUpPage };
            },
          },
        ],
      },
      {
        element: <MainLayout />,
        loader: async () => requireAuth(),
        children: [
          {
            index: true,
            HydrateFallback: () => <UiPageSpinner />,
            lazy: async () => {
              const module = await import("@/pages/home");
              return { Component: module.HomePage };
            },
          },
          {
            path: ROUTES.ABOUT,
            lazy: async () => {
              const module = await import("@/pages/about");
              return { Component: module.AboutPage };
            },
          },
          {
            path: ROUTES.USERS,
            lazy: async () => {
              const [component, require] = await Promise.all([
                import("@/pages/users"),
                import("@/app/providers/router/lib/admin-auth"),
              ]);

              return {
                Component: () => (
                  <require.AdminAuth>
                    <component.UsersPage />
                  </require.AdminAuth>
                ),
              };
            },
          },
          {
            path: ROUTES.USER,
            lazy: async () => {
              const module = await import("@/pages/user");
              return { Component: module.UserPage };
            },
          },
          {
            path: "*",
            lazy: async () => {
              const module = await import("@/pages/not-found");
              return { Component: module.NotFoundPage };
            },
          },
        ],
      },
    ],
  },
]);

extra.router = router;
