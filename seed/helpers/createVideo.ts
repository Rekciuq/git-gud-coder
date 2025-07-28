import { HTTP_METHODS } from "@/constants/server/http-methods";
import { UPLOAD_FILE_API_ROUTE } from "@/constants/server/routes";
import { createImage } from "./createImage";
import { faker } from "@faker-js/faker";
import { createNewVideoSeed } from "@seed/video/createNewVideoSeed";

export const createVideo = async (
  videoFormData: FormData,
  courseId: number,
  videoIndex: number,
) => {
  const thumbnailId = await createImage(faker.image.avatar());
  const videoName = faker.company.catchPhrase();
  const videoDescription = faker.lorem.paragraph();

  const presignedUrlResponse = await fetch(UPLOAD_FILE_API_ROUTE, {
    method: HTTP_METHODS.get,
  });

  if (!presignedUrlResponse.ok) {
    throw new Error(await presignedUrlResponse.text());
  }

  const { url } = await presignedUrlResponse.json();

  const uploadVideoResponse = await fetch(url, {
    method: HTTP_METHODS.post,
    body: videoFormData,
  });

  if (!uploadVideoResponse.ok)
    throw new Error(await uploadVideoResponse.text());

  const { fileURL, lengthInSec } = await uploadVideoResponse.json();
  const videoId = fileURL.split("/").at(-1);
  return createNewVideoSeed({
    courseId,
    thumbnailId,
    video: {
      bucketVideoId: videoId,
      name: videoName,
      index: videoIndex,
      description: videoDescription,
      lengthSec: lengthInSec,
      url,
    },
  });
};
