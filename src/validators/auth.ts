import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum of 8 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(100, "Maximum 100 characters "),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(100, "Maximum 100 characters "),
  name: z
    .string()
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
});
