"use server";

import { jwtVerify, JWTVerifyResult, SignJWT } from "jose";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN,
  REFRESH_TOKEN_LIFETIME,
} from "@/constants/server/jwt";
import { JWTPayload, TOKEN_TYPE } from "@/types/features/jwt";

class JWTTokenService {
  private accessTokenSecret: Uint8Array;
  private refreshTokenSecret: Uint8Array;

  constructor() {
    this.accessTokenSecret = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET_KEY!,
    );
    this.refreshTokenSecret = new TextEncoder().encode(
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
  }

  private generateToken = (
    userId: number,
    roleId: number,
    type: TOKEN_TYPE,
    expiresIn: string,
  ) => {
    const secret =
      type === ACCESS_TOKEN ? this.accessTokenSecret : this.refreshTokenSecret;

    return new SignJWT({ userId: userId, roleId: roleId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(secret);
  };

  generateTokens = (userId: number, roleId: number) => {
    const accessToken = this.generateToken(
      userId,
      roleId,
      ACCESS_TOKEN,
      ACCESS_TOKEN_LIFETIME,
    );

    const refreshToken = this.generateToken(
      userId,
      roleId,
      REFRESH_TOKEN,
      REFRESH_TOKEN_LIFETIME,
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  verifyToken = async (
    token: string,
    tokenType: TOKEN_TYPE,
  ): Promise<[null, JWTVerifyResult<JWTPayload>] | [unknown, null]> => {
    try {
      const verifiedToken = await jwtVerify<JWTPayload>(
        token,
        tokenType === ACCESS_TOKEN
          ? this.accessTokenSecret
          : this.refreshTokenSecret,
      );

      return [null, verifiedToken];
    } catch (error) {
      return [error, null];
    }
  };
}

export default JWTTokenService;
