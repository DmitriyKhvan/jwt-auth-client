import { UiSpinner } from "./ui-spinner";
import { twMerge } from "tailwind-merge";

export function UiPageSpinner({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-slate-100",
        className,
      )}
    >
      <UiSpinner className="text-teal-600 w-24 h-24" />
    </div>
  );
}
