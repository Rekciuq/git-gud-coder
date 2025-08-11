import { z } from "zod";
import stringSchema from "./auth/stringSchema";
import imageSchema from "./files/image.schema";

const videoSchema = z.object({
  name: stringSchema,
  description: z.string().trim(),
  thumbnail: imageSchema,
});

export default videoSchema;
