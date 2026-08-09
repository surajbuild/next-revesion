import z, { email } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, "name must be at least 3 characters")
    .max(20, "name must be at most 20 characters"),
  email: z.string(),
  password: z.string().min(4, "Password must be at least 4 characters").max(8, "Password must be at most 8 characters"),
});

export const CreateLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(4, "Password must be at least 4 characters").max(8, "Password must be at most 8 characters"),
});