import { extra } from "@/app/store";
import {
  // Route,
  createBrowserRouter
  // createRoutesFromElements
} from "react-router";
import { UserAuth } from "../lib/user-auth";

// export const router = createBrowserRouter(
//   createRoutesFromElements([
//     <Route
//       path="/login"
//       HydrateFallback={() => <div>Loading...</div>}
//       lazy={async () => {
//         const module = await import("@/shared/layouts/ui/auth");
//         return { Component: module.AuthLayout };
//       }}
//     >
//       <Route
//         index
//         lazy={async () => {
//           const module = await import("@/pages/login");
//           return { Component: module.LoginPage };
//         }}
//       />
//     </Route>,

//     <Route
//       path="/"
//       HydrateFallback={() => <div>Loading...</div>}
//       lazy={async () => {
//         const [layout, error, require] = await Promise.all([
//           import("@/shared/layouts/ui/main"),
//           import("@/pages/error"),
//           import("@/app/router/lib/require-auth")
//         ]);
//         return {
//           loader: require.requireAuth, // preloader data
//           Component: layout.MainLayout, // main layout
//           errorElement: <error.ErrorPage /> // error page
//         };
//       }}
//     >
//       <Route
//         index
//         lazy={async () => {
//           const module = await import("@/pages/home");
//           return { Component: module.HomePage };
//         }}
//       />
//       <Route
//         path="about"
//         lazy={async () => {
//           const module = await import("@/pages/about");
//           return { Component: module.AboutPage };
//         }}
//       />

//       <Route
//         path="users"
//         lazy={async () => {
//           const module = await import("@/pages/users");
//           return {
//             Component: () => (
//               <UserAuth>
//                 <module.UsersPage />
//               </UserAuth>
//             )
//           };
//         }}
//       />
//       <Route
//         path="users/:id"
//         lazy={async () => {
//           const module = await import("@/pages/user");
//           return { Component: module.UserPage };
//         }}
//       />
//       <Route
//         path="*"
//         lazy={async () => {
//           const module = await import("@/pages/not-found");
//           return { Component: module.NotFoundPage };
//         }}
//       />
//     </Route>
//   ])
// );

export const router = createBrowserRouter([
  {
    path: "/login",
    lazy: async () => {
      const module = await import("@/shared/layouts/ui/auth");
      return { Component: module.AuthLayout };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/pages/login");
          return { Component: module.LoginPage };
        }
      }
    ]
  },

  {
    path: "/",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const [layout, error, require] = await Promise.all([
        import("@/shared/layouts/ui/main"),
        import("@/pages/error"),
        import("@/app/router/lib/require-auth")
      ]);
      return {
        loader: require.requireAuth, // preloader data
        Component: layout.MainLayout, // main layout
        ErrorBoundary: error.ErrorPage // error page
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/pages/home");
          return { Component: module.HomePage };
        }
      },
      {
        path: "about",
        lazy: async () => {
          const module = await import("@/pages/about");
          return { Component: module.AboutPage };
        }
      },
      {
        path: "users",
        lazy: async () => {
          const module = await import("@/pages/users");
          return {
            Component: () => (
              <UserAuth>
                <module.UsersPage />
              </UserAuth>
            )
          };
        }
      },
      {
        path: "users/:id",
        lazy: async () => {
          const module = await import("@/pages/user");
          return { Component: module.UserPage };
        }
      },
      {
        path: "*",
        lazy: async () => {
          const module = await import("@/pages/not-found");
          return { Component: module.NotFoundPage };
        }
      }
    ]
  }
]);

extra.router = router;
