import { z } from "zod";
import stringSchema from "./auth/stringSchema";
import imageSchema from "./files/image.schema";
import videoFileSchema from "./files/videoFile.schema";

const videoSchema = z.object({
  name: stringSchema,
  description: z.string().trim(),
  thumbnail: imageSchema,
  video: videoFileSchema,
});

export default videoSchema;
