import { createTRPCRouter } from "../init";
import { imageRouter } from "./routers/image";
import { uploadRouter } from "./routers/upload";
import { authRouter } from "./routers/auth";
import { ResponseMetaFn } from "@trpc/server/http";

export const appRouter = createTRPCRouter({
  image: imageRouter,
  upload: uploadRouter,
  auth: authRouter,
});

export const responseMeta: ResponseMetaFn<AppRouter> = ({ ctx, errors }) => {
  if (ctx?.resHeaders && errors.length === 0) {
    return {
      headers: ctx.resHeaders,
    };
  }

  return {};
};

export type AppRouter = typeof appRouter;
