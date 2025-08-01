import { createNewCategoriesSeed } from "./createNewCategorySeed";
import * as fileCategories from "./categories.json";

export const createPredefinedCategoriesSeed = async () => {
  console.log("Seeding categories...");

  await createNewCategoriesSeed({ categories: fileCategories.categories });

  console.log("Seeding categories were completed");
};
