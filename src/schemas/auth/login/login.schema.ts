import { z } from "zod";
import emailSchema from "@schemas/auth/email.schema";
import passwordSchema from "@schemas/auth/password.schema";

const loginSchema = z.object({
  login: emailSchema,
  password: passwordSchema,
});

export default loginSchema;
