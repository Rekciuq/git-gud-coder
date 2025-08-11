import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";
import { SchemaType } from "@/types/shared/schema";
import filtersWithPaginationSchema from "@/schemas/filtersWithPagination.schema";

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
          CourseUser: {
            select: {
              courseId: true,
            },
          },
        },
      }),
    );
  static getCourseById = (id: number) =>
    handlePromiseServer(() =>
      prisma.course.findUnique({
        where: { id },
        include: {
          thumbnail: { select: { url: true } },
          user: { select: { firstName: true, lastName: true, email: true } },
          videos: {
            select: {
              url: true,
              lengthSec: true,
              name: true,
              description: true,
              thumbnail: { select: { url: true } },
            },
          },
        },
      }),
    );
  static getCourses = async ({
    filters,
    cursor,
    limit,
  }: SchemaType<typeof filtersWithPaginationSchema>) => {
    const [err, courses] = await handlePromiseServer(() =>
      prisma.course.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
          name: filters.search
            ? {
                contains: filters.search,
              }
            : {},
          price: filters.price
            ? {
                gte: filters.price?.[0],
                lte: filters.price?.[1],
              }
            : {},
          categories: filters.category
            ? { some: { category: { name: { contains: filters.category } } } }
            : {},
          CourseRating: filters.rating
            ? {
                some: {
                  rating: {
                    in: filters.rating,
                  },
                },
              }
            : {},
          avgRating: filters.rating
            ? {
                lte: Math.max(...filters.rating),
              }
            : undefined,
        },
        include: {
          thumbnail: {
            select: { url: true },
          },
        },
        orderBy:
          filters.sortBy === "price"
            ? [{ price: "desc" }, { id: "asc" }]
            : filters.sortBy === "newest"
              ? [{ createdAt: "desc" }, { id: "asc" }]
              : filters.sortBy === "oldest"
                ? [{ createdAt: "asc" }, { id: "asc" }]
                : filters.sortBy === "rating"
                  ? [{ avgRating: "desc" }, { id: "asc" }]
                  : { id: "asc" },
      }),
    );
    if (err) return { err: err, courses: null };

    const hasMore = courses!.length > limit;
    const paginatedCourses = hasMore ? courses!.slice(0, limit) : courses!;

    const nextCursor = hasMore
      ? paginatedCourses[paginatedCourses.length - 1]?.id
      : undefined;

    return {
      err: null,
      courses: paginatedCourses,
      cursor: nextCursor,
    };
  };

  static getCategories = () =>
    handlePromiseServer(() => prisma.category.findMany());
  static getEnrolledCourses = (userId: number) =>
    handlePromiseServer(() =>
      prisma.course.findMany({
        where: { OR: [{ userId }, { CourseUser: { some: { userId } } }] },
        include: {
          thumbnail: {
            select: { url: true },
          },
        },
      }),
    );
}

export default GetService;
