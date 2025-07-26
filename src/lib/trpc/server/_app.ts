import { createTRPCRouter } from "../init";
import { imageRouter } from "./routers/image";
import { uploadRouter } from "./routers/upload";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
  image: imageRouter,
  upload: uploadRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
