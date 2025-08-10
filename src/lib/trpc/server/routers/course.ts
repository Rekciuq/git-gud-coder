import GetService from "@/services/server/GetService";
import { createTRPCRouter, privateProcedure } from "../../init";
import { TRPCError } from "@trpc/server";
import filtersWithPaginationSchema from "@/schemas/filtersWithPagination.schema";

export const courseRouter = createTRPCRouter({
  getCourses: privateProcedure
    .input(filtersWithPaginationSchema)
    .query(async ({ input }) => {
      const { filters, cursor, limit } = input;
      const {
        err,
        courses,
        cursor: nextCursor,
      } = await GetService.getCourses({
        filters,
        cursor,
        limit,
      });

      if (err)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err,
        });

      return {
        courses,
        nextCursor,
      };
    }),
});
