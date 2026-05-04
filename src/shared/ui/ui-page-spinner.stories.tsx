import type { Meta, StoryObj } from "@storybook/react";
import { UiPageSpinner } from "./ui-page-spinner";

const meta: Meta<typeof UiPageSpinner> = {
  title: "UI/UiPageSpinner",
  component: UiPageSpinner,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "CSS классы для кастомизации",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UiPageSpinner>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: "bg-gray-100",
  },
};

export const DarkOverlay: Story = {
  args: {
    className: "bg-black/40",
  },
};

export const NonFullScreen: Story = {
  args: {
    className: "absolute",
  },
};
