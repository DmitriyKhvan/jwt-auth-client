import { SignOutButton } from "@/features/auth";
import clsx from "clsx";
import { NavLink } from "react-router";
import { menu } from "../model/menu";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "@/features/lang-switcher/ui/lang-switcher";

export function Header() {
  const { t } = useTranslation(["common", "profile"]);
  return (
    <header className="sticky top-0 w-full px-10 py-3 shadow-md z-50 bg-gray-900">
      <div className="mx-auto flex justify-between items-center">
        <nav>
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
                  {t(item.name)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center items-center gap-2">
          <LangSwitcher />
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
