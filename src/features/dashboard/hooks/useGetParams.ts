import filtersSchema from "@/schemas/filters.schema";
import { useSearchParams } from "next/navigation";

export const useGetParams = () => {
  const currentParams = useSearchParams();
  const rawParams: Record<string, unknown> = {};

  for (const name of filtersSchema.keyof().options) {
    const paramValues = currentParams.getAll(name);

    if (paramValues.length === 0) continue;

    switch (name) {
      case "search":
      case "sortBy":
      case "category":
        rawParams[name] = paramValues.at(-1)!;
        break;
      case "rating":
      case "price":
        rawParams[name] = paramValues.map(Number);
        break;
    }
  }
  const result = filtersSchema.safeParse(rawParams);

  return result.success ? result.data : {};
};
