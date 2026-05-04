import type { Meta, StoryObj } from "@storybook/react";
import { UiTextField, type UiTextFieldProps } from "./ui-text-field";

const meta: Meta<UiTextFieldProps> = {
  title: "UI/UiTextField",
  component: UiTextField,
  tags: ["autodocs"],
  args: {
    className: "",
    label: "Label",
    error: "",
    inputProps: {
      placeholder: "Enter text...",
    },
  },
  argTypes: {
    inputProps: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<UiTextFieldProps>;

// Базовый
export const Default: Story = {};

// Без label
export const WithoutLabel: Story = {
  args: {
    label: "",
  },
};

// С ошибкой
export const WithError: Story = {
  args: {
    error: "This field is required",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    inputProps: {
      placeholder: "Disabled input",
      disabled: true,
    },
  },
};

// С value (controlled)
export const Controlled: Story = {
  args: {
    inputProps: {
      value: "Hello",
      onChange: () => {},
    },
  },
};

// Разные типы input
export const Password: Story = {
  args: {
    inputProps: {
      type: "password",
      placeholder: "Enter password",
    },
  },
};

export const Email: Story = {
  args: {
    inputProps: {
      type: "email",
      placeholder: "Enter email",
    },
  },
};
