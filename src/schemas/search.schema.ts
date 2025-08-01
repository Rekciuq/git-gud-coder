import { z } from "zod";

// TODO: handle spaces if it's not automatically handled, at least investigate
const searchSchema = z.object({
  search: z
    .string()
    .nullable()
    .optional()
    .transform((value) => !!value && value.trim()),
});

export default searchSchema;
