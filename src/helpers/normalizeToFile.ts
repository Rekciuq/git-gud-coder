export const normalizeToFile = (input: File | FileList): File | undefined => {
  if (input instanceof File) return input;
  if (input instanceof FileList && input.length > 0) return input[0];
  return undefined;
};
