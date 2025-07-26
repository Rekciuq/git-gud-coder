import prisma from "@/lib/prisma";
import { createPredefinedRolesSeed } from "./role/createPredefinedRolesSeed";
import { createRandomUsersSeed } from "./user/createRandomUsersSeed";

const main = async () => {
  prisma.$connect();
  console.log("Seeding database...");

  await createPredefinedRolesSeed();
  await createRandomUsersSeed();

  console.log("Seeding database was successfully!");
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
