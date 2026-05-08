import { SignOutButton } from "@/features/auth";
import clsx from "clsx";
import { NavLink } from "react-router";
import { menu } from "../model/menu";

export function Header() {
  return (
    <header className="sticky top-0 w-full px-10 py-3 shadow-md z-50 bg-gray-900">
      <nav>
        <div className="mx-auto flex justify-between items-center">
          <ul className="flex gap-6">
            {menu.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      "text-white hover:underline",
                      isActive ? "underline" : "",
                    )
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <SignOutButton />
        </div>
      </nav>
    </header>
  );
}
