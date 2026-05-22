import { createBrowserRouter, type RouteObject } from "react-router"; // 1. внешние либы

import { extra } from "@/app/store"; // 2. app слой
import { requireAuth } from "../lib/require-auth";

import { AuthLayout, MainLayout } from "@/shared/layouts"; // 3. shared
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ROUTES } from "@/shared/constants/routes";

// ─── Public routes (no auth required) ───────────────────────────────────────

const publicRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.SIGN_IN,
        lazy: async () => {
          const { SignInPage } = await import("@/pages/sign-in");
          return { Component: SignInPage };
        },
      },
      {
        path: ROUTES.SIGN_UP,
        lazy: async () => {
          const { SignUpPage } = await import("@/pages/sign-up");
          return { Component: SignUpPage };
        },
      },
    ],
  },
];

// ─── Protected routes (auth required) ───────────────────────────────────────

const protectedRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    loader: () => requireAuth(),
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import("@/pages/home");
          return { Component: HomePage };
        },
      },
      {
        path: ROUTES.ABOUT,
        lazy: async () => {
          const { AboutPage } = await import("@/pages/about");
          return { Component: AboutPage };
        },
      },
      {
        path: ROUTES.USERS,
        lazy: async () => {
          const [{ UsersPage }, { AdminAuth }] = await Promise.all([
            import("@/pages/users"),
            import("@/app/providers/router/lib/admin-auth"),
          ]);

          const Component = () => (
            <AdminAuth>
              <UsersPage />
            </AdminAuth>
          );

          return { Component };
        },
      },
      {
        path: ROUTES.USER,
        lazy: async () => {
          const { UserPage } = await import("@/pages/user");
          return { Component: UserPage };
        },
      },
    ],
  },
];

// ─── Root router ─────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  {
    path: "/",
    HydrateFallback: () => <UiPageSpinner />,
    lazy: async () => {
      const { ErrorPage } = await import("@/pages/error");
      return { errorElement: <ErrorPage /> };
    },
    children: [
      ...publicRoutes,
      ...protectedRoutes,
      {
        path: ROUTES.NOTFOUND,
        lazy: async () => {
          const { NotFoundPage } = await import("@/pages/not-found");
          return { Component: NotFoundPage };
        },
      },
    ],
  },
]);

extra.router = router;
