import { DB_TEACHER_ROLE, DB_USER_ROLE } from "@/constants/database";
import { ROLE_IS_REQUIRED } from "@/constants/schemas/auth/messages";
import { z } from "zod";

const roleSchema = z
  .enum([DB_USER_ROLE.toString(), DB_TEACHER_ROLE.toString()])
  .refine((value) => value, { message: ROLE_IS_REQUIRED });

export default roleSchema;
