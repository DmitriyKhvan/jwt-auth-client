import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { UiSelectField } from "./ui-select";

const meta: Meta<typeof UiSelectField> = {
  title: "UI/UiSelectField",
  component: UiSelectField,
  tags: ["autodocs"],
  args: {
    label: "Language",
    defaultValue: "react",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ],
  },

  argTypes: {
    defaultValue: {
      control: "text",
      description: "Default selected value",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UiSelectField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);

    return (
      <div className="w-[250px]">
        <UiSelectField
          {...args}
          defaultValue={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    error: "This field is required",
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);

    return (
      <div className="w-[250px]">
        <UiSelectField
          {...args}
          defaultValue={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);

    return (
      <div className="w-[250px]">
        <UiSelectField
          {...args}
          defaultValue={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const CustomButtonProps: Story = {
  args: {
    buttonProps: {
      disabled: true,
    } as React.HTMLAttributes<HTMLButtonElement>,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);

    return (
      <div className="w-[250px]">
        <UiSelectField
          {...args}
          defaultValue={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};
