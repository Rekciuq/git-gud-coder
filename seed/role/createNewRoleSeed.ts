import prisma from "@/lib/prisma";
import { SeedRole } from "@seed/types";

type CreateNewRoleSeedProps = {
  roles: SeedRole[];
};

export const createNewRoleSeed = async ({ roles }: CreateNewRoleSeedProps) => {
  await prisma.role.createMany({ data: roles });
};
