import { Role, User, Image, Category } from "@prisma/client";

export type SeedRole = Omit<Role, "id">;
export type SeedCategory = Omit<Category, "id">;
export type SeedUser = Omit<User, "id">;
export type SeedImage = Omit<Image, "id">;
