import { createTRPCRouter, privateProcedure } from "../../init";
import filtersSchema from "@/schemas/filters.schema";

export const courseRouter = createTRPCRouter({
  getCourses: privateProcedure.input(filtersSchema).query(async () => {
    // const [err, courses] = await GetService.getCourses(opts.input);
    // if (err)
    //   throw new TRPCError({
    //     code: "BAD_REQUEST",
    //     message: err,
    //   });
    //
    // return {
    //   courses,
    // };
  }),
});
