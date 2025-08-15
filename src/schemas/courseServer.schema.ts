import { z } from "zod";
import courseSchema from "./course.schema";

const courseServerSchema = courseSchema
  .omit({ thumbnail: true, category: true })
  .merge(
    z.object({
      thumbnailUrl: z.string(),
      thumbnailBucketId: z.string(),
      category: z.number(),
      authorId: z.number(),
    }),
  );

export default courseServerSchema;
