import prisma from "@/lib/prisma";
import { SeedUser } from "@seed/types";

type CreateNewUserSeedProps = {
  user: SeedUser;
};

export const createNewUserSeed = async ({ user }: CreateNewUserSeedProps) => {
  await prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: {
        connect: {
          id: user.roleId,
        },
      },
      image: {
        connect: {
          id: user.imageId,
        },
      },
    },
  });
};
