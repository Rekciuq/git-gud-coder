import { z } from "zod";

const allowedRatings = ["1", "2", "3", "4", "5"] as const;

const filtersFormSchema = z.object({
  sortBy: z
    .enum(["price", "newest", "oldest", "rating"])
    .optional()
    .nullable()
    .transform((value) => (value === null ? undefined : value)),
  rating: z
    .preprocess(
      (value) => (typeof value === "boolean" ? [] : value),
      z.array(z.enum(allowedRatings)),
    )
    .optional(),
  category: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (value === null ? undefined : value)),
  minPrice: z.coerce.number().nullable().optional(),
  maxPrice: z.coerce.number().nullable().optional(),
});

export default filtersFormSchema;
