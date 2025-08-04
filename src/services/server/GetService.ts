import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";
import filtersSchema from "@/schemas/filters.schema";
import orderBy from "lodash/orderBy";
import { SchemaType } from "@/types/shared/schema";

class GetService {
  static getUserCredentialsByLogin = (login: string) =>
    handlePromiseServer(() =>
      prisma.user.findUnique({
        where: {
          email: login,
        },
        select: {
          id: true,
          password: true,
          roleId: true,
        },
      }),
    );
  static getUserById = (userId: number) =>
    handlePromiseServer(() =>
      prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          roleId: true,
          image: {
            select: {
              url: true,
            },
          },
        },
      }),
    );
  static getCourses = async ({
    search,
    price,
    category,
    rating,
    sortBy,
  }: SchemaType<typeof filtersSchema>) => {
    const [err, courses] = await handlePromiseServer(() =>
      prisma.course.findMany({
        where: {
          name: search
            ? {
                contains: search,
              }
            : {},
          price: price
            ? {
                gte: price?.[0],
                lte: price?.[1],
              }
            : {},
          categories: category
            ? { some: { category: { name: { contains: category } } } }
            : {},
          CourseRating: rating
            ? {
                some: {
                  rating: {
                    in: rating,
                  },
                },
              }
            : {},
        },
        include: {
          thumbnail: {
            select: { url: true },
          },
        },
        orderBy:
          sortBy === "price"
            ? { price: "desc" }
            : sortBy === "newest"
              ? { createdAt: "desc" }
              : sortBy === "oldest"
                ? { createdAt: "asc" }
                : undefined,
      }),
    );
    if (err) return { err: err, courses: null };

    const [error, groupResult] = await handlePromiseServer(() =>
      prisma.courseRating.groupBy({
        by: ["courseId"],
        where: {
          courseId: {
            in: courses!.map((course) => course.id),
          },
        },
        _avg: { rating: true },
      }),
    );

    if (error) return { err: error, courses: null };

    const groupMap = new Map(
      groupResult!.map((res) => [res.courseId, res._avg]),
    );

    const coursesWithRating = courses!.map((course) => ({
      ...course,
      avgRating: groupMap.get(course.id)?.rating || 0,
    }));

    const sortedCourses =
      sortBy === "rating"
        ? orderBy(coursesWithRating, ["avgRating"], ["desc"])
        : coursesWithRating;

    return {
      err: null,
      courses: sortedCourses,
    };
  };
}

export default GetService;
