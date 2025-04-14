import {
  MAX_PASSWORD_LENGHT,
  MIN_PASSWORD_LENGHT,
} from "@/constants/schemas/auth/values";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGHT)
  .max(MAX_PASSWORD_LENGHT);

export default passwordSchema;
