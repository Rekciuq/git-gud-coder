import { FORM_DATA_KEYS } from "@/constants/formData";

type UploadImageToBucketProps = {
  presignedUrl?: string;
  file: File;
};

export const uploadImageToBucket = async ({
  presignedUrl,
  file,
}: UploadImageToBucketProps) => {
  const formData = new FormData();
  formData.append(FORM_DATA_KEYS.file, file);

  if (!presignedUrl) {
    throw new Error("Failed to get presigned URL");
  }

  const res = await fetch(presignedUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  const response = await res.json();

  return response.fileURL;
};
