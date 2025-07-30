import { z } from "zod";

const filtersSchema = z.object({
  search: z.string().optional(),
  sortBy: z.string().optional(),
  rating: z.array(z.number()).optional(),
  category: z.string().optional(),
  price: z.array(z.number()).optional(),
});

export default filtersSchema;
