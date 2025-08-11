import { z } from "zod";
import stringSchema from "./auth/stringSchema";
import imageSchema from "./files/image.schema";
import videoSchema from "./video.schema";

const courseSchema = z.object({
  name: stringSchema,
  description: z.string().trim(),
  thumbnail: imageSchema,
  price: z.number().optional(),
  category: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (value === null ? undefined : value)),
  videos: z.array(videoSchema),
});

export default courseSchema;
