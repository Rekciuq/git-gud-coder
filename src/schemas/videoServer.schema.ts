import { z } from "zod";

const videoServerSchema = z.object({
  thumbnailUrl: z.string(),
  thumbnailBucketId: z.string(),
  courseId: z.number(),
  name: z.string(),
  description: z.string(),
  bucketVideoId: z.string(),
  index: z.number(),
  lengthSec: z.number(),
  url: z.string(),
});

export default videoServerSchema;
