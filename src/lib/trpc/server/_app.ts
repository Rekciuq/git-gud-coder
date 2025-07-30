import { createTRPCRouter } from "../init";
import { imageRouter } from "./routers/image";
import { uploadRouter } from "./routers/upload";
import { authRouter } from "./routers/auth";
import { ResponseMetaFn } from "@trpc/server/http";
import { userRouter } from "./routers/user";
import { courseRouter } from "./routers/course";

export const appRouter = createTRPCRouter({
  image: imageRouter,
  upload: uploadRouter,
  auth: authRouter,
  user: userRouter,
  course: courseRouter,
});

export const responseMeta: ResponseMetaFn<AppRouter> = ({ ctx }) => {
  if (ctx?.responseHeaders) {
    return {
      headers: ctx.responseHeaders,
    };
  }
  return {};
};

export type AppRouter = typeof appRouter;
