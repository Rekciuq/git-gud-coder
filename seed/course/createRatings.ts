import prisma from "@/lib/prisma";

type CreateRatingsProps = {
  usersRatings: { userId: number; rating: number; courseId: number }[];
};

export const createRatings = ({ usersRatings }: CreateRatingsProps) =>
  prisma.courseRating.createMany({
    data: usersRatings,
  });
