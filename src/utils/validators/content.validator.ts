import { z } from "zod";

export const ContentSchema = z.object({
  title: z.string().min(1, "please insert title").max(10, "title is too big"),
  type: z.string().min(1, "please insert type").max(10, "type is too big"),
  tags: z.string(),
  userId: z.string(),
});

export type ContentSchemaType = z.infer<typeof ContentSchema>;