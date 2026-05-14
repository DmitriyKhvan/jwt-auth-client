import React, { useId, type HTMLAttributes } from "react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export type UiSelectOption = {
  value: string;
  label: string;
};

export type UiSelectFieldProps = {
  onValueChange: (value: string) => void;
  defaultValue: string;
  className?: string;
  label?: string;
  error?: string;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  options?: UiSelectOption[];
};

export function UiSelectField({
  onValueChange,
  defaultValue,
  className,
  label,
  error,
  options,
  buttonProps,
}: UiSelectFieldProps) {
  const id = useId();
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
        <Select.Trigger
          className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-teal-600 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-gray-700 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-teal-600"
          aria-label="Languages"
          id={id}
          {...buttonProps}
        >
          <Select.Value placeholder="Select language" />
          <Select.Icon className="text-teal-600">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            className="z-1000 overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)]"
          >
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-teal-600">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              {options?.map((option, index) => (
                <React.Fragment key={option.value}>
                  <Select.Group>
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  </Select.Group>

                  {index % 2 === 0 && (
                    <Select.Separator className="m-[5px] h-px bg-teal-500" />
                  )}
                </React.Fragment>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-teal-600">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}

type SelectItemProps = React.ComponentPropsWithoutRef<typeof Select.Item>;

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-teal-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-teal-100 data-[disabled]:text-teal-900 data-[highlighted]:text-teal-900 data-[highlighted]:outline-none",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);
