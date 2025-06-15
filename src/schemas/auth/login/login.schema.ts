import { z } from "zod";
import passwordSchema from "@schemas/auth/password.schema";
import emailSchema from "../email.schema";

const loginSchema = z.object({
  login: emailSchema,
  password: passwordSchema,
});

export default loginSchema;
