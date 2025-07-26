import { createTRPCRouter, privateProcedure } from "../../init";
import { TRPCError } from "@trpc/server";
import GetService from "@/services/server/GetService";
import JWTTokenService from "@/services/server/JWTTokenService";
import { ACCESS_TOKEN } from "@/constants/server/jwt";
import { parse } from "cookie";

export const userRouter = createTRPCRouter({
  getUser: privateProcedure.query(async (opts) => {
    const jwtService = new JWTTokenService();
    const cookies = parse(opts.ctx.headers.get("Cookie") || "");
    const accessToken = cookies[ACCESS_TOKEN];

    if (!accessToken) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not supposed to be here!",
      });
    }

    const [, verifiedAccessToken] = await jwtService.verifyToken(
      accessToken,
      ACCESS_TOKEN,
    );

    const [error, user] = await GetService.getUserById(
      verifiedAccessToken!.payload.userId!,
    );

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error,
      });
    }

    return {
      ...user,
      id: verifiedAccessToken!.payload.userId!,
      image: user!.image.url,
    };
  }),
});
