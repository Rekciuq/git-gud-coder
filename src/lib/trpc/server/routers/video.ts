import videoServerSchema from "@/schemas/videoServer.schema";
import { createTRPCRouter, privateProcedure } from "../../init";
import CreateService from "@/services/server/CreateService";
import { TRPCError } from "@trpc/server";

export const videoRouter = createTRPCRouter({
  createVideo: privateProcedure
    .input(videoServerSchema)
    .mutation(async ({ input }) => {
      const [err] = await CreateService.createVideo(input);

      if (err) throw new TRPCError({ code: "BAD_REQUEST", message: err });
    }),
});
