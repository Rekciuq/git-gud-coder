import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./server/context";
import { parse, serialize } from "cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/server/jwt";
import JWTTokenService from "@/services/server/JWTTokenService";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  const cookies = parse(opts.ctx.headers.get("Cookie") || "");
  const accessToken = cookies[ACCESS_TOKEN];
  const refreshToken = cookies[REFRESH_TOKEN];
  if (!accessToken || !refreshToken)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not logged in",
    });

  const jwtService = new JWTTokenService();

  const [error, verifiedAccessToken] = await jwtService.verifyToken(
    accessToken || "",
    ACCESS_TOKEN,
  );

  if (!error) {
    const { userId, roleId } = verifiedAccessToken!.payload;
    return opts.next({
      ctx: {
        headers: opts.ctx.headers,
        user: {
          id: userId,
          roleId: roleId,
        },
      },
    });
  }

  const [, verifiedRefreshToken] = await jwtService.verifyToken(
    refreshToken || "",
    REFRESH_TOKEN,
  );

  if (!verifiedRefreshToken) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please relogin",
    });
  }

  const { userId, roleId } = verifiedRefreshToken.payload;

  const newPromiseTokens = jwtService.generateTokens(userId, roleId);
  const [newAccessToken, newRefreshToken] = await Promise.all(
    Object.values(newPromiseTokens),
  );

  const newAccessTokenCookie = serialize(ACCESS_TOKEN, newAccessToken, {
    httpOnly: true,
    path: "/",
  });
  const newRefreshTokenCookie = serialize(REFRESH_TOKEN, newRefreshToken, {
    httpOnly: true,
    path: "/",
  });

  opts.ctx.headers.append("Set-Cookie", newAccessTokenCookie);
  opts.ctx.headers.append("Set-Cookie", newRefreshTokenCookie);

  return opts.next({
    ctx: {
      headers: opts.ctx.headers,
      user: {
        id: userId,
        roleId: roleId,
      },
    },
  });
});
