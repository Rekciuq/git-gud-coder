import { VIDEO_PREFIX } from "@/constants/schemas/file/fileTypes";
import {
  NOT_A_VIDEO,
  VIDEO_IS_REQUIRED,
  VIDEO_IS_TOO_BIG,
} from "@/constants/schemas/file/messages";
import { MAX_VIDEO_SIZE_IN_BYTES } from "@/constants/schemas/file/values";
import { normalizeToFile } from "@/helpers/normalizeToFile";
import { z } from "zod";

const videoFileSchema =
  typeof window === "undefined"
    ? z.instanceof(File)
    : z
        .union([z.instanceof(File), z.instanceof(FileList)])
        .transform((input) => normalizeToFile(input))
        .refine((file): file is File => file instanceof File, {
          message: VIDEO_IS_REQUIRED,
        })
        .refine((file): file is File => !!file?.type, {
          message: NOT_A_VIDEO,
        })
        .superRefine((file, ctx) => {
          if (!(file instanceof File)) return;

          if (!file.type.startsWith(VIDEO_PREFIX)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: NOT_A_VIDEO,
            });
          }

          if (file.size > MAX_VIDEO_SIZE_IN_BYTES) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: VIDEO_IS_TOO_BIG,
            });
          }
        });

export default videoFileSchema;
