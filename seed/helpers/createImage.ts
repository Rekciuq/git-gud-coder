import { FETCH_IMAGE_ERROR } from "@/constants/fetch";
import { FORM_DATA_KEYS } from "@/constants/formData";
import { HTTP_METHODS } from "@/constants/server/http-methods";
import { UPLOAD_FILE_API_ROUTE } from "@/constants/server/routes";
import { createNewImageSeed } from "@seed/user/createNewImageSeed";

export const createImage = async (imageUrl: string) => {
  const fetchedImage = await fetch(imageUrl);
  if (!fetchedImage.ok) {
    throw new Error(FETCH_IMAGE_ERROR);
  }

  const imageBlob = await fetchedImage.blob();

  const formData = new FormData();
  formData.append(FORM_DATA_KEYS.file, imageBlob);

  const response = await fetch(UPLOAD_FILE_API_ROUTE, {
    method: HTTP_METHODS.get,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const { url } = await response.json();

  const res = await fetch(url, {
    method: HTTP_METHODS.post,
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());

  const { fileURL } = await res.json();

  const image = await createNewImageSeed({
    image: {
      url: fileURL,
      createdAt: new Date(),
      bucketImageId: url.split("/").at(-1),
    },
  });

  return image.id;
};
