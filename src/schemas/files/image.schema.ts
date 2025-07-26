import { IMAGE_PREFIX } from "@/constants/schemas/file/fileTypes";
import {
  IMAGE_IS_REQUIRED,
  IMAGE_IS_TOO_BIG,
  NOT_AN_IMAGE,
} from "@/constants/schemas/file/messages";
import { MAX_IMAGE_SIZE_IN_MEGA_BYTES } from "@/constants/schemas/file/values";
import { z } from "zod";

const imageSchema =
  typeof window === "undefined"
    ? z.instanceof(File)
    : z
        .instanceof(FileList)
        .refine((image) => !!image.length, {
          message: IMAGE_IS_REQUIRED,
        })
        .transform((fileList) => fileList[0])
        .refine((image) => image instanceof File, {
          message: NOT_AN_IMAGE,
        })
        .refine((image) => image.type?.startsWith(IMAGE_PREFIX), {
          message: NOT_AN_IMAGE,
        })
        .refine((image) => image.size <= MAX_IMAGE_SIZE_IN_MEGA_BYTES, {
          message: IMAGE_IS_TOO_BIG,
        });

export default imageSchema;
