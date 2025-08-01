import { z } from "zod";

const allowedRatings = [1, 2, 3, 4, 5] as const;

const filtersFormSchema = z.object({
  sortBy: z
    .enum(["price", "newest", "oldest", "rating"])
    .nullable()
    .optional()
    .transform((value) => (value === null ? undefined : value)),
  rating: z
    .preprocess(
      (v) => (typeof v === "boolean" ? [] : v),
      z.array(z.enum(allowedRatings.map(String) as [string, ...string[]])),
    )
    .optional()
    .nullable()
    .transform((val) => val?.map(Number)),
  category: z
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === null ? undefined : value)), // enum
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

export default filtersFormSchema;
