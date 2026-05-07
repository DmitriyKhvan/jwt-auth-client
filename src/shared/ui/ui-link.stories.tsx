import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import { UiLink } from "./ui-link";

const meta: Meta<typeof UiLink> = {
  title: "UI/UiLink",
  tags: ["autodocs"],
  component: UiLink,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  args: {
    to: "/",
    children: "Default Link",
    className: "",
  },
  argTypes: {
    to: {
      control: "text",
      description: "Route path",
    },
    children: {
      control: "text",
      description: "Link text/content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UiLink>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    children: "Go to dashboard",
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "text-red-500!",
    children: "Custom styled link",
  },
};

export const ExternalLike: Story = {
  args: {
    to: "/about",
    children: "About page",
  },
};
