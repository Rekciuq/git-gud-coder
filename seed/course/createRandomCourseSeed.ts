import { DB_TEACHER_ROLE } from "@/constants/database";
import { FORM_DATA_KEYS } from "@/constants/formData";
import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { createImage } from "@seed/helpers/createImage";
import { createNewCourseSeed } from "./createNewCourseSeed";
import { createVideo } from "@seed/helpers/createVideo";
import { addVideoToCourse } from "./addVideoToCourse";
import { createRatings } from "./createRatings";

export const createRandomCourseSeed = async () => {
  console.log("Seeding Courses...");

  const teachers = await prisma.user.findMany({
    where: {
      roleId: DB_TEACHER_ROLE,
    },
  });

  const videoURL =
    "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4";

  const seedVideo = await fetch(videoURL);

  if (!seedVideo.ok) throw new Error("Error getting sample video!");

  const servedVideo = await seedVideo.blob();

  const formData = new FormData();
  formData.append(FORM_DATA_KEYS.file, servedVideo);

  for (const teacher of teachers) {
    const coursePicUrl = faker.image.avatar();
    const imageId = await createImage(coursePicUrl);
    const courseName = faker.company.catchPhrase();
    const courseDescription = faker.lorem.paragraph();
    const price = faker.number.int({ min: 0, max: 1500 });
    const category = faker.number.int({ min: 1, max: 3 });

    const course = await createNewCourseSeed({
      course: {
        name: courseName,
        description: courseDescription,
        price,
        avgRating: 0,
      },
      thumbnailId: imageId,
      userId: teacher.id,
      categoryId: category,
    });

    const usersForRating = Array.from({ length: teacher.id }).map((_, i) => ({
      userId: i + 1,
      rating: faker.number.int({ min: 1, max: 5 }),
      courseId: course.id,
    }));

    await createRatings({ usersRatings: usersForRating });

    const randomNumber = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < randomNumber; i++) {
      const video = await createVideo(formData, course.id, i);

      await addVideoToCourse({ courseId: course.id, videoId: video.id });
    }
  }

  console.log("Seeding courses were completed");
};
