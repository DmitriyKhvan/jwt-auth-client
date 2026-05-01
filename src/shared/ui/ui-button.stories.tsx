import type { Meta, StoryObj } from "@storybook/react";
import { UiButton } from "./ui-button";

const meta: Meta<typeof UiButton> = {
  title: "UI/UiButton",
  component: UiButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "outlined"],
      description: "Вариант кнопки",
    },
    children: {
      control: "text",
      description: "Текст кнопки",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled",
    disabled: true,
  },
};
