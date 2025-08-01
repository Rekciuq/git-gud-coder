import prisma from "@/lib/prisma";
import { SeedCategory } from "@seed/types";

type CreateNewCategoriesProps = {
  categories: SeedCategory[];
};

export const createNewCategoriesSeed = async ({
  categories,
}: CreateNewCategoriesProps) => {
  await prisma.category.createMany({ data: categories });
};
