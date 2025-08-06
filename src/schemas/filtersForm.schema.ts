import { MAX_PRICE, MIN_PRICE } from "@/constants/schemas/filters/values";
import { z } from "zod";

const allowedRatings = ["1", "2", "3", "4", "5"] as const;

const filtersFormSchema = z.object({
  sortBy: z
    .enum(["price", "newest", "oldest", "rating"])
    .optional()
    .nullable()
    .transform((value) => (value === null ? undefined : value)),
  rating: z.array(z.enum(allowedRatings)).optional(),
  category: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (value === null ? undefined : value)),
  minPrice: z.number().default(MIN_PRICE).optional(),
  maxPrice: z.number().default(MAX_PRICE).optional(),
});

export default filtersFormSchema;
