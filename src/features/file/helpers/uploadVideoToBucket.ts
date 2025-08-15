import { FORM_DATA_KEYS } from "@/constants/formData";
import { HTTP_METHODS } from "@/constants/server/http-methods";

type UploadVideoToBucketProps = {
  presignedUrl?: string;
  file: File;
};

export const uploadVideoToBucket = async ({
  presignedUrl,
  file,
}: UploadVideoToBucketProps) => {
  const formData = new FormData();
  formData.append(FORM_DATA_KEYS.file, file);

  if (!presignedUrl) {
    throw new Error("Failed to get presigned URL");
  }

  const res = await fetch(presignedUrl, {
    method: HTTP_METHODS.post,
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  const { fileURL, lengthInSec } = await res.json();
  const bucketId = fileURL.split("/").at(-1);

  return {
    url: `${fileURL}/master.m3u8`,
    bucketId,
    lengthInSec: lengthInSec as number,
  };
};
