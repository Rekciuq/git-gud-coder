import { z } from "zod";

const filtersFormSchema = z.object({
  sortBy: z.string().optional(), // enum
  rating: z.array(z.number()).optional(), // array in enum
  category: z.string().optional(), // enum
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

export default filtersFormSchema;
