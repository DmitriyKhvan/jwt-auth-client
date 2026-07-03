import { useId, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export const UiTextField = ({
  className,
  label,
  error,
  inputProps,
}: UiTextFieldProps) => {
  const id = useId();
  return (
    <div className={twMerge(className, "flex flex-col gap-1")}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...inputProps}
        id={id}
        className={twMerge(
          inputProps?.className,
          "rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none",
        )}
      />
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
};
