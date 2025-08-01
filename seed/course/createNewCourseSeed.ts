import prisma from "@/lib/prisma";
import { Course } from "@prisma/client";

type CreateNewCourseSeedProps = {
  course: Omit<Course, "id" | "thumbnailId" | "userId" | "createdAt">;
  thumbnailId: number;
  userId: number;
  categoryId: number;
};

export const createNewCourseSeed = ({
  course,
  thumbnailId,
  categoryId,
  userId,
}: CreateNewCourseSeedProps) =>
  prisma.course.create({
    data: {
      name: course.name,
      description: course.description,
      price: course.price,
      user: {
        connect: {
          id: userId,
        },
      },
      categories: {
        create: {
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      },
      createdAt: new Date(),
      thumbnail: {
        connect: {
          id: thumbnailId,
        },
      },
    },
  });
