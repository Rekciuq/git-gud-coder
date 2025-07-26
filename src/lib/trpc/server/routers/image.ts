import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../../init";

export const imageRouter = createTRPCRouter({
  getPresignedUrl: publicProcedure.mutation(async () => {
    const link = "http://localhost:6969/v1/upload";
    const response = await fetch(link, {
      method: "GET",
    });

    if (!response.ok) {
      return {
        message: "Error something",
      };
    }

    const body = await response.json();

    return { url: body.url };
  }),
  uploadImage: publicProcedure
    .input(z.object({ userId: z.number(), image: z.any() }))
    .mutation((opts) => {
      console.log("I'm here");
      console.log(opts.input.image);
      // if (opts.input.image) {
      //   const t = opts.input.image as FormData;
      //   if (t.get("image")) console.log("Image transfered!");
      // }
      return {
        greeting: `Hello ${opts.input}`,
      };
    }),
});
