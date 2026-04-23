import { LogoutButton } from "@/features/auth/logout/ui/logout-button";
import { NavLink, Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <>
      <header className="sticky top-0 w-full px-10 py-3 shadow-md z-50 bg-gray-900">
        <nav>
          <div className="mx-auto flex justify-between items-center">
            <ul className="flex gap-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-white hover:underline ${isActive ? "underline" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-white hover:underline ${isActive ? "underline" : ""}`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `text-white hover:underline  ${isActive ? "underline" : ""}`
                  }
                >
                  Users
                </NavLink>
              </li>
            </ul>

            <LogoutButton />
          </div>
        </nav>
      </header>
      <main className="min-h-[calc(100vh-96px)] px-10 py-3">
        <Outlet />
      </main>
      <footer className="w-full px-10 py-3 shadow-md bg-gray-900 text-white">
        2026
      </footer>
    </>
  );
};
