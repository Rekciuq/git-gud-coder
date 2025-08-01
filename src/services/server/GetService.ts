import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";

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
  // static getCourses = ({
  //   search,
  //   price,
  //   category,
  //   rating,
  //   sortBy,
  // }: SchemaType<typeof filtersSchema>) =>
  //   handlePromiseServer(() =>
  //     prisma.course.findMany({
  //       where: {
  //         name: {
  //           contains: search,
  //         },
  //         price: {
  //           lte: price?.[0],
  //           gte: price?.[1],
  //         },
  //         category: {
  //           contains: category,
  //         },
  //         CourseRating: {
  //           some: {
  //             rating: {
  //               in: rating,
  //             },
  //           },
  //         },
  //       },
  //       include: {
  //         thumbnail: {
  //           select: { url: true },
  //         },
  //         CourseRating: true,
  //       },
  //       orderBy:
  //         sortBy === "price"
  //           ? {
  //               price: "desc",
  //             }
  //           : sortBy === "newest" ? {createdAt: "asc"} : sortBy: ==="oldest" ? {createdAt: "desc"} : undefined,
  //     }),
  //   );
}

// const sortOptions: RadioOption[] = [
//   { title: "price", value: "price" },
//   { title: "newest", value: "newest" },
//   { title: "oldest", value: "oldest" },
//   { title: "rating", value: "rating" },
// ];

export default GetService;
