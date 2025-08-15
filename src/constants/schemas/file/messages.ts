import { MAX_IMAGE_SIZE_FORMATTED, MAX_VIDEO_SIZE_FORMATTED } from "./values";

export const IMAGE_IS_REQUIRED = "Image is required!";
export const NOT_AN_IMAGE = "Unsupported file type. Only Images are allowed.";
export const IMAGE_IS_TOO_BIG = `File size must be less than ${MAX_IMAGE_SIZE_FORMATTED} MB.`;

export const VIDEO_IS_REQUIRED = "Video is required!";
export const NOT_A_VIDEO = "Unsupported file type. Only videos are allowed.";
export const VIDEO_IS_TOO_BIG = `File size must be less than ${MAX_VIDEO_SIZE_FORMATTED} GB.`;
