import { z } from "zod";
import stringSchema from "./auth/stringSchema";
import imageSchema from "./files/image.schema";

const courseSchema = z.object({
  name: stringSchema,
  description: z.string().trim(),
  thumbnail: imageSchema,
  price: z.string().optional(),
  category: z.string(),
});

export default courseSchema;
