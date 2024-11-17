import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "password must have atleast 6 characters"),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
