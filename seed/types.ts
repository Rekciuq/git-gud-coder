import { Role, User, Image } from "@prisma/client";

export type SeedRole = Omit<Role, "id">;
export type SeedUser = Omit<User, "id">;
export type SeedImage = Omit<Image, "id">;
