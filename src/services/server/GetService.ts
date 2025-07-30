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
  static getCourses = (filters: any) =>
    handlePromiseServer(() =>
      prisma.course.findMany({
        where: {
          name: {
            contains: "Int",
          },
        },
        include: { thumbnail: { select: { url: true } } },
      }),
    );
}

export default GetService;
