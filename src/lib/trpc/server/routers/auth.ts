import { baseProcedure, createTRPCRouter } from "../../init";
import { serverSignupSchema } from "@/schemas/auth/login/signup.schema";
import CreateService from "@/services/server/CreateService";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { FETCH_IMAGE_ERROR } from "@/constants/fetch";
import loginSchema from "@/schemas/auth/login/login.schema";
import GetService from "@/services/server/GetService";

export const authRouter = createTRPCRouter({
  login: baseProcedure.input(loginSchema).mutation(async (opts) => {
    const data = opts.input;

    const [err, credentials] = await GetService.getUserCredentialsByLogin(
      data.login,
    );

    if (err || !credentials?.password) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Requested user does not exists",
      });
    }

    const isPasswordsMatching = bcrypt.compareSync(
      data.password,
      credentials.password,
    );

    if (!isPasswordsMatching) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Login or Password is incorrect",
      });
    }
  }),
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
