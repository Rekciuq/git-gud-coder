import GetService from "@/services/server/GetService";
import { createTRPCRouter, privateProcedure } from "../../init";
import { TRPCError } from "@trpc/server";
import filtersWithPaginationSchema from "@/schemas/filtersWithPagination.schema";
import { z } from "zod";
import CreateService from "@/services/server/CreateService";

export const courseRouter = createTRPCRouter({
  getCourseById: privateProcedure.input(z.number()).query(async ({ input }) => {
    const [err, course] = await GetService.getCourseById(input);
    if (err)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: err,
      });

    return { course };
  }),
  enrollCourse: privateProcedure
    .input(z.object({ userId: z.number(), courseId: z.number() }))
    .mutation(async ({ input }) => {
      const { userId, courseId } = input;

      const [err] = await CreateService.createEnrolledUserCourse(
        userId,
        courseId,
      );

      if (err)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err,
        });
    }),
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
