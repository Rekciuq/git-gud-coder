import { handlePromiseServer } from "@/helpers/handlePromiseServer";
import prisma from "@/lib/prisma";

class DeleteService {
  static leaveCourse = (courseId: number, userId: number) =>
    handlePromiseServer(() =>
      prisma.courseUser.delete({
        where: { userId_courseId: { userId, courseId } },
      }),
    );
  static deleteCourse = (courseId: number) =>
    handlePromiseServer(() =>
      prisma.course.delete({ where: { id: courseId } }),
    );
}

export default DeleteService;
