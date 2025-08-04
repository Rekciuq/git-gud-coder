import GetService from "@/services/server/GetService";
import { createTRPCRouter, privateProcedure } from "../../init";
import { TRPCError } from "@trpc/server";
import filtersSchema from "@/schemas/filters.schema";

export const courseRouter = createTRPCRouter({
  getCourses: privateProcedure.input(filtersSchema).query(async (opts) => {
    const { err, courses } = await GetService.getCourses(opts.input);
    console.log(opts.input);

    if (err)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: err,
      });

    return {
      courses,
    };
  }),
});
