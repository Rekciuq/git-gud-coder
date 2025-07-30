import filtersSchema from "@/schemas/filters.schema";
import pickBy from "lodash/pickBy";
import { usePathname, useRouter } from "next/navigation";
import { useGetParams } from "./useGetParams";
import { SchemaType } from "@/types/shared/schema";

const updateParams = (params: SchemaType<typeof filtersSchema>) =>
  Object.entries(params).flatMap(([key, value]) =>
    Array.isArray(value) ? value.map((v) => `${key}=${v}`) : `${key}=${value}`,
  );

export const useSetParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const existingParams = useGetParams();

  return (params: SchemaType<typeof filtersSchema>) => {
    const mergedParams = {
      ...existingParams,
      ...params,
    };
    const cleanedParams = pickBy(
      mergedParams,
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0),
    );

    const updatedParams = updateParams(cleanedParams);
    const result = `${pathname}?${updatedParams.join("&")}`;

    return { path: result, refresh: () => router.push(result) };
  };
};
