import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";

class GetService {
  static getUserCredentialsByLogin = async (login: string) =>
    handlePromiseServer(() =>
      prisma.user.findUnique({
        where: {
          email: login,
        },
        select: {
          id: true,
          password: true,
        },
      }),
    );
}

export default GetService;
