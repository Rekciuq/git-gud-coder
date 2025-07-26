import { createNewRoleSeed } from "./createNewRoleSeed";
import * as fileRoles from "./roles.json";

export const createPredefinedRolesSeed = async () => {
  console.log("Seeding roles...");

  await createNewRoleSeed({ roles: fileRoles.roles });

  console.log("Seeding roles was completed");
};
