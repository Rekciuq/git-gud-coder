import prisma from "@/lib/prisma";
import { SeedImage } from "@seed/types";

type CreateNewImageSeedProps = {
  image: SeedImage;
};

export const createNewImageSeed = async ({
  image: image,
}: CreateNewImageSeedProps) => {
  return prisma.image.create({
    data: image,
  });
};
