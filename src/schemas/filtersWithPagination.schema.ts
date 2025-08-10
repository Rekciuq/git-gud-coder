import filtersSchema from "./filters.schema";
import paginationSchema from "./pagination.schema";
import z from "zod";

const filtersWithPaginationSchema = z
  .object({
    filters: filtersSchema,
  })
  .merge(paginationSchema);

export default filtersWithPaginationSchema;
