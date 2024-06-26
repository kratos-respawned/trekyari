import { z } from "zod";
export const BlogSchema = z.object({
  name: z.string().min(5).max(100),
  id: z.string(),
  content: z.object({
    json: z.any(),
    html: z.string().min(5, "Content is too short"),
  }),
});
export type BlogSchema = z.infer<typeof BlogSchema>;
