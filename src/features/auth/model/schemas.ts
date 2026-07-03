import z from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Minimum 6 characters")
  .regex(/[A-Z]/, "Minimum one uppercase letter")
  .regex(/[0-9]/, "Minimum one number");

export const emailSchema = z.email("Invalid email format");
