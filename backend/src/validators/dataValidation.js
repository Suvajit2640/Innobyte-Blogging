import { z } from "zod";

export const postValidation = z.object({
  title: z
    .string()
    .min(3, { message: "title must be at least 3 characters long" }),
  content: z.string().min(1, { message: "content cannot be null" }),
});
