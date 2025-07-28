import prisma from "@/lib/prisma";

type AddVideoToCourseProps = {
  courseId: number;
  videoId: number;
};

export const addVideoToCourse = ({
  courseId,
  videoId,
}: AddVideoToCourseProps) =>
  prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      videos: {
        connect: {
          id: videoId,
        },
      },
    },
  });
