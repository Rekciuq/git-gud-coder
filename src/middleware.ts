import { NextResponse, NextRequest } from "next/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/server/jwt";
import JWTTokenService from "./services/server/JWTTokenService";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const publicPaths = new Set(["/login", "/signup"]);

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if ((!accessToken || !refreshToken) && publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  if ((!accessToken || !refreshToken) && !publicPaths.has(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const jwtService = new JWTTokenService();
  const [, verifiedAccessToken] = await jwtService.verifyToken(
    accessToken || "",
    ACCESS_TOKEN,
  );

  if (verifiedAccessToken !== null) {
    if (publicPaths.has(pathname))
      return NextResponse.redirect(new URL("/dashboard", request.url));

    return NextResponse.next();
  }

  const [refreshTokenError, verifiedRefreshToken] =
    await jwtService.verifyToken(refreshToken || "", REFRESH_TOKEN);

  if (refreshTokenError) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete(ACCESS_TOKEN);
    response.cookies.delete(REFRESH_TOKEN);

    return response;
  }

  if (verifiedRefreshToken) {
    const { userId, roleId } = verifiedRefreshToken.payload;

    const newPromiseTokens = jwtService.generateTokens(userId, roleId);
    const [newAccessToken, newRefreshToken] = await Promise.all(
      Object.values(newPromiseTokens),
    );

    const response = NextResponse.next();
    const commonCookieProps = {
      httpOnly: true,
      path: "/",
    };

    response.cookies.set(ACCESS_TOKEN, newAccessToken, commonCookieProps);
    response.cookies.set(REFRESH_TOKEN, newRefreshToken, commonCookieProps);
    return response;
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
