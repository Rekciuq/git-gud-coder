import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";
import { serverSignupSchema } from "@/schemas/auth/login/signup.schema";
import { z } from "zod";

class CreateService {
  static createUserWithImage = ({
    imageUrl,
    bucketImageId,
    ...user
  }: z.infer<typeof serverSignupSchema> & { bucketImageId: string }) =>
    handlePromiseServer(() =>
      prisma.user.create({
        data: {
          email: user.login,
          lastName: user.lastName,
          firstName: user.firstName,
          password: user.password,
          role: {
            connect: {
              id: Number(user.role),
            },
          },
          image: {
            create: {
              url: imageUrl,
              bucketImageId,
            },
          },
        },
      }),
    );
  static createSession = (userId: number, refreshToken: string) =>
    handlePromiseServer(() =>
      prisma.session.create({
        data: {
          refreshToken,
          userId,
        },
      }),
    );
}

export default CreateService;
