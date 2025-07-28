import prisma from "@/lib/prisma";
import { Course } from "@prisma/client";

type CreateNewCourseSeedProps = {
  course: Omit<Course, "id" | "thumbnailId" | "userId">;
  thumbnailId: number;
  userId: number;
};

export const createNewCourseSeed = ({
  course,
  thumbnailId,
  userId,
}: CreateNewCourseSeedProps) =>
  prisma.course.create({
    data: {
      name: course.name,
      description: course.description,
      user: {
        connect: {
          id: userId,
        },
      },
      thumbnail: {
        connect: {
          id: thumbnailId,
        },
      },
    },
  });
