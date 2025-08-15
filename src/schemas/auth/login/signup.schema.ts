import { z } from "zod";
import passwordSchema from "@schemas/auth/password.schema";
import emailSchema from "../email.schema";
import imageSchema from "@/schemas/files/image.schema";
import stringSchema from "../stringSchema";
import { PASSWORDS_DONT_MATCH } from "@/constants/auth";
import roleSchema from "@/schemas/role.schema";

const baseSignupSchema = z.object({
  login: emailSchema,
  firstName: stringSchema,
  lastName: stringSchema,
  image: imageSchema,
  password: passwordSchema,
  role: roleSchema,
  confirmPassword: passwordSchema,
});

export const clientSignupSchema = baseSignupSchema.superRefine(
  ({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: PASSWORDS_DONT_MATCH,
      });
    }
  },
);

export const serverSignupSchema = baseSignupSchema
  .omit({
    confirmPassword: true,
    image: true,
  })
  .extend({ imageUrl: z.string(), bucketId: z.string() });
