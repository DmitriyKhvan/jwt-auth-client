import { extra } from "@/app/store";
import { createBrowserRouter } from "react-router";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ROUTES } from "@/shared/constants/routes";

import { AuthLayout, MainLayout } from "@/shared/layouts";
import { requireAuth } from "../lib/require-auth";

export const router = createBrowserRouter([
  {
    path: "/",
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
              const module = await import("@/pages/sign-in");
              return { Component: module.SignInPage };
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
              const [component, adminOnly] = await Promise.all([
                import("@/pages/users"),
                import("@/app/providers/router/lib/admin-auth"),
              ]);

              return {
                Component: () => (
                  <adminOnly.AdminAuth>
                    <component.UsersPage />
                  </adminOnly.AdminAuth>
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
        ],
      },
      {
        path: ROUTES.NOTFOUND,
        lazy: async () => {
          const module = await import("@/pages/not-found");
          return { Component: module.NotFoundPage };
        },
      },
    ],
  },
]);

extra.router = router;
