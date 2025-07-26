import { publicProcedure, createTRPCRouter } from "../../init";
import { serverSignupSchema } from "@/schemas/auth/login/signup.schema";
import CreateService from "@/services/server/CreateService";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { FETCH_IMAGE_ERROR } from "@/constants/fetch";
import loginSchema from "@/schemas/auth/login/login.schema";
import GetService from "@/services/server/GetService";
import JWTTokenService from "@/services/server/JWTTokenService";
import { serialize } from "cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/server/jwt";
import { Context } from "../context";

const setJWTTokens = async (
  credentials: { id: number; roleId: number },
  context: Context,
) => {
  const jwtService = new JWTTokenService();
  const { accessToken, refreshToken } = jwtService.generateTokens(
    credentials.id,
    credentials.roleId,
  );
  const [acToken, reToken] = await Promise.all([accessToken, refreshToken]);

  const accessTokenCookie = serialize(ACCESS_TOKEN, acToken, {
    httpOnly: true,
    path: "/",
  });

  const refreshTokenCookie = serialize(REFRESH_TOKEN, reToken, {
    httpOnly: true,
    path: "/",
  });

  [accessTokenCookie, refreshTokenCookie].map((token) =>
    context.headers.append("Set-Cookie", token),
  );
  console.log(context.headers);

  return refreshToken;
};

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async (opts) => {
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

    await setJWTTokens(credentials, opts.ctx);
    // const refreshToken = await setJWTTokens(credentials, opts.ctx);

    // await CreateService.createSession(credentials.id, refreshToken);
  }),
  signup: publicProcedure.input(serverSignupSchema).mutation(async (opts) => {
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

    if (!res?.id || !res?.roleId) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error creating user",
      });
    }

    const credentials = {
      id: res?.id,
      roleId: res?.roleId,
    };

    await setJWTTokens(credentials, opts.ctx);
    // const refreshToken = await setJWTTokens(credentials, opts.ctx);

    // await CreateService.createSession(credentials.id, refreshToken);

    return res;
  }),
});
