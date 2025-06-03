import { z } from "zod";

export const postValidation = z.object({
  title: z
    .string()
    .min(3, { message: "title must be at least 3 characters long" }),
  content: z.string().min(1, { message: "content cannot be null" }),
})



const userName = z.string().trim().min(1, { message: "Username is Required." });

const email = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(1, { message: "Email is Required" });


export const signupUser = z
  .object({
    userName: userName,
    email: email,
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message:
          "Password must include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.",
      }),
  })
