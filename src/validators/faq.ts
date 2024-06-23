import { z } from "zod";

export const FaqSchema = z.object({
  question: z
    .string()
    .min(3, "Question must be at least 3 characters long")
    .max(100, "Question must be at most 100 characters long"),
  answer: z
    .string()
    .min(3, "Answer must be at least 3 characters long")
    .max(1000, "Answer must be at most 1000 characters long"),
  blogId: z.string(),
});

export type FaqSchema = z.infer<typeof FaqSchema>;
