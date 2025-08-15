import GetService from "@/services/server/GetService";
import { createTRPCRouter, privateProcedure } from "../../init";
import { TRPCError } from "@trpc/server";
import filtersWithPaginationSchema from "@/schemas/filtersWithPagination.schema";
import { z } from "zod";
import CreateService from "@/services/server/CreateService";
import DeleteService from "@/services/server/DeleteService";
import courseServerSchema from "@/schemas/courseServer.schema";

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
  getEnrolledCourses: privateProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const [err, courses] = await GetService.getEnrolledCourses(input);
      if (err) throw new TRPCError({ code: "BAD_REQUEST", message: err });

      return { courses };
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
  leaveCourse: privateProcedure
    .input(z.object({ courseId: z.number(), userId: z.number() }))
    .mutation(async ({ input }) => {
      const { courseId, userId } = input;
      const [err] = await DeleteService.leaveCourse(courseId, userId);

      if (err)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err,
        });
    }),
  createCourse: privateProcedure
    .input(courseServerSchema)
    .mutation(async ({ input }) => {
      const [err, response] = await CreateService.createCourse(input);
      if (err) throw new TRPCError({ message: err, code: "BAD_REQUEST" });

      return {
        courseId: response?.id,
      };
    }),
  deleteCourse: privateProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const [err] = await DeleteService.deleteCourse(input);

      if (err) throw new TRPCError({ code: "BAD_REQUEST", message: err });
    }),
});
