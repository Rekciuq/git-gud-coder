import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../../init";
import { serverSignupSchema } from "@/schemas/auth/login/signup.schema";
import CreateService from "@/services/server/CreateService";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { FETCH_IMAGE_ERROR } from "@/constants/fetch";

export const authRouter = createTRPCRouter({
  getUser: baseProcedure
    .input(z.string())
    .query((opts) => ({ greeting: `Hello ${opts.input}` })),
  signup: baseProcedure.input(serverSignupSchema).mutation(async (opts) => {
    const data = opts.input;
    const bucketImageId = data.imageUrl.split("/").at(-1);

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const cryptedPassword = bcrypt.hashSync(data.password, salt);

    if (!bucketImageId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: FETCH_IMAGE_ERROR,
      });
    }

    const [err, res] = await CreateService.createUserWithImage({
      bucketImageId,
      ...data,
      password: cryptedPassword,
    });

    if (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err,
      });
    }

    return res;
  }),
});
