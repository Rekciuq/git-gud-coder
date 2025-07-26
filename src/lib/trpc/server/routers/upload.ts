import { baseProcedure, createTRPCRouter } from "../../init";
import { UPLOAD_FILE_API_ROUTE } from "@/constants/server/routes";
import { HTTP_METHODS } from "@/constants/server/http-methods";
import { TRPCError } from "@trpc/server";

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: baseProcedure.query(async () => {
    const response = await fetch(UPLOAD_FILE_API_ROUTE, {
      method: HTTP_METHODS.get,
    });

    if (!response.ok) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: await response.text(),
      });
    }

    const body = await response.json();

    return { url: body.url };
  }),
});
