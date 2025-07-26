import { SexType } from "@faker-js/faker";
import { faker } from "@faker-js/faker/locale/en";
import { SeedUser } from "@seed/types";
import { createNewUserSeed } from "./createNewUserSeed";
import { HTTP_METHODS } from "@/constants/server/http-methods";
import { UPLOAD_FILE_API_ROUTE } from "@/constants/server/routes";
import { FETCH_IMAGE_ERROR } from "@/constants/fetch";
import { FORM_DATA_KEYS } from "@/constants/formData";
import { createNewImageSeed } from "./createNewImageSeed";

export const createRandomUsersSeed = async () => {
  const randomNumber = faker.number.int({ min: 15, max: 30 });

  console.log("Seeding users...");

  for (let i = 0; i < randomNumber; i++) {
    const sex = faker.person.sex() as SexType;
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "@example.com",
    });
    const password = faker.internet.password();

    const profilePic = faker.image.avatar();

    const fetchedImage = await fetch(profilePic);
    if (!fetchedImage.ok) {
      throw new Error(FETCH_IMAGE_ERROR);
    }

    const imageBlob = await fetchedImage.blob();

    const formData = new FormData();
    formData.append(FORM_DATA_KEYS.file, imageBlob);

    try {
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
      const imageURL = await res.json();
      const image = await createNewImageSeed({
        image: {
          url: imageURL.imageURL,
          createdAt: new Date(),
          bucketImageId: url.split("/").at(-1),
        },
      });

      const roleId = faker.number.int({ min: 1, max: 3 });

      const newUser: SeedUser = {
        firstName,
        lastName,
        email,
        imageId: image.id,
        password,
        roleId,
      };

      await createNewUserSeed({ user: newUser });
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Seeding users was completed");
};
