import { z } from "zod";

const searchSchema = z.object({ search: z.string().nullable().optional() });

export default searchSchema;
