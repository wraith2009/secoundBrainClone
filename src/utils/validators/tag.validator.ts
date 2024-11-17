import { z } from "zod";

export const TagSchema = z.object({
  title: z.string().min(1, "please Provide a Title"),
});

export type TagSchemaType = z.infer<typeof TagSchema>;
