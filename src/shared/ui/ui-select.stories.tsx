import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { UiSelectField } from "./ui-select";

const meta: Meta<typeof UiSelectField> = {
  title: "UI/UiSelectField",
  component: UiSelectField,
  tags: ["autodocs"],
  args: {
    label: "Language",
    placeholder: "Choose a framework...",
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

export const WithDisabled: Story = {
  args: {
    disabled: true,
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

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Pick one...",
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
