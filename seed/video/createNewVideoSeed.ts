import prisma from "@/lib/prisma";
import { Video } from "@prisma/client";

type CreateNewVideoSeedProps = {
  video: Omit<Video, "id" | "courseId" | "thumbnailId">;
  thumbnailId: number;
  courseId: number;
};

export const createNewVideoSeed = ({
  courseId,
  thumbnailId,
  video,
}: CreateNewVideoSeedProps) =>
  prisma.video.create({
    data: {
      ...video,
      thumbnail: {
        connect: {
          id: thumbnailId,
        },
      },
      Course: {
        connect: {
          id: courseId,
        },
      },
    },
  });
