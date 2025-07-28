import { SexType } from "@faker-js/faker";
import { faker } from "@faker-js/faker/locale/en";
import { SeedUser } from "@seed/types";
import { createNewUserSeed } from "./createNewUserSeed";
import { FETCH_IMAGE_ERROR } from "@/constants/fetch";
import { createImage } from "@seed/helpers/createImage";

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
      provider: "example.com",
    });
    const password = faker.internet.password();

    const profilePic = faker.image.avatar();

    const fetchedImage = await fetch(profilePic);
    if (!fetchedImage.ok) {
      throw new Error(FETCH_IMAGE_ERROR);
    }

    try {
      const imageId = await createImage(profilePic);

      const roleId = faker.number.int({ min: 1, max: 3 });

      const newUser: SeedUser = {
        firstName,
        lastName,
        email,
        imageId,
        password,
        roleId,
      };

      await createNewUserSeed({ user: newUser });
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Seeding users were completed");
};
