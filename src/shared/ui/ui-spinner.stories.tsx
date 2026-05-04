// UiSpinner.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UiSpinner } from "./ui-spinner";

const meta: Meta<typeof UiSpinner> = {
  title: "UI/UiSpinner",
  component: UiSpinner,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "CSS классы для кастомизации",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UiSpinner>;

export const Default: Story = {
  args: {
    className: "",
  },
};

export const Small: Story = {
  render: (args) => <UiSpinner {...args} className="w-4 h-4 text-gray-500" />,
};

export const Large: Story = {
  render: (args) => <UiSpinner {...args} className="w-10 h-10 text-blue-500" />,
};

export const Colored: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <UiSpinner {...args} className="text-red-500" />
      <UiSpinner {...args} className="text-green-500" />
      <UiSpinner {...args} className="text-purple-500" />
    </div>
  ),
};
