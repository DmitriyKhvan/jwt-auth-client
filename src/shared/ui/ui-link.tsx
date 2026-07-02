import { twMerge } from "tailwind-merge";
import { Link } from "react-router";

export type UiLinkProps = {} & Parameters<typeof Link>[0];
export function UiLink({ className, ...props }: UiLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        "p-1 text-teal-500 hover:text-teal-600 cursor-pointer",
        className,
      )}
    />
  );
}
