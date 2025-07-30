import { z, ZodSchema } from "zod";

export type SchemaType<T extends ZodSchema> = z.infer<T>;
