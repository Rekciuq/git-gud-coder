import { createTRPCRouter } from "../init";
import { imageRouter } from "./routers/image";
import { uploadRouter } from "./routers/upload";
import { authRouter } from "./routers/auth";
import { ResponseMetaFn } from "@trpc/server/http";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  image: imageRouter,
  upload: uploadRouter,
  auth: authRouter,
  user: userRouter,
});

export const responseMeta: ResponseMetaFn<AppRouter> = ({ ctx, errors }) => {
  if (ctx?.headers && errors.length === 0) {
    return {
      headers: ctx.headers,
    };
  }
  return {};
};

export type AppRouter = typeof appRouter;
