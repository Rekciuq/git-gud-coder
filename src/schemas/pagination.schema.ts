import { DEFAULT_PAGINATION_LIMIT } from "@/constants/schemas/pagination";
import { z } from "zod";

const paginationSchema = z.object({
  cursor: z.number().optional(),
  limit: z.number().default(DEFAULT_PAGINATION_LIMIT),
});

export default paginationSchema;
