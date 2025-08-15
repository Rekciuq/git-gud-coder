import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";
import { serverSignupSchema } from "@/schemas/auth/login/signup.schema";
import courseServerSchema from "@/schemas/courseServer.schema";
import videoServerSchema from "@/schemas/videoServer.schema";
import { SchemaType } from "@/types/shared/schema";

class CreateService {
  static createUserWithImage = ({
    imageUrl,
    bucketImageId,
    ...user
  }: SchemaType<typeof serverSignupSchema> & { bucketImageId: string }) =>
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
  static createEnrolledUserCourse = (userId: number, courseId: number) =>
    handlePromiseServer(() =>
      prisma.courseUser.create({ data: { userId, courseId } }),
    );
  static createCourse = (course: SchemaType<typeof courseServerSchema>) =>
    handlePromiseServer(() =>
      prisma.course.create({
        data: {
          name: course.name,
          description: course.description,
          price: course.price ? Number(course.price) : 0,
          createdAt: new Date(),
          categories: {
            connect: {
              id: course.category,
            },
          },
          user: {
            connect: {
              id: course.authorId,
            },
          },
          thumbnail: {
            create: {
              url: course.thumbnailUrl,
              bucketImageId: course.thumbnailBucketId,
            },
          },
        },
      }),
    );
  static createVideo = (video: SchemaType<typeof videoServerSchema>) =>
    handlePromiseServer(() =>
      prisma.video.create({
        data: {
          name: video.name,
          description: video.description,
          bucketVideoId: video.bucketVideoId,
          index: video.index,
          lengthSec: video.lengthSec,
          url: video.url,
          Course: {
            connect: {
              id: video.courseId,
            },
          },
          thumbnail: {
            create: {
              url: video.thumbnailUrl,
              bucketImageId: video.thumbnailBucketId,
            },
          },
        },
      }),
    );
}

export default CreateService;
