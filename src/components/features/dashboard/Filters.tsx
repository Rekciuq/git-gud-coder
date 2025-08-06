"use client";

import Form from "@/components/shared/form/Form";
import { MAX_PRICE, MIN_PRICE } from "@/constants/schemas/filters/values";
import { useGetParams } from "@/features/dashboard/hooks/useGetParams";
import { useSetParams } from "@/features/dashboard/hooks/useSetParams";
import { useTRPC } from "@/lib/trpc/client/client";
import filtersSchema from "@/schemas/filters.schema";
import filtersFormSchema from "@/schemas/filtersForm.schema";
import { CheckBoxOption, RadioOption } from "@/types/shared/form/field";
import { SchemaType } from "@/types/shared/schema";
import { useQuery } from "@tanstack/react-query";

const Filters = () => {
  const setParams = useSetParams();
  const existingParams = useGetParams();
  const tRPC = useTRPC();

  const parsedSchema = filtersFormSchema.safeParse({
    ...existingParams,
    rating: existingParams?.rating?.map(String),
    minPrice: existingParams?.price?.[0] || undefined,
    maxPrice: existingParams?.price?.[1] || undefined,
  });

  const defaultValues = parsedSchema.success ? parsedSchema.data : {};

  const sortOptions: RadioOption[] = [
    { title: "price", value: "price" },
    { title: "newest", value: "newest" },
    { title: "oldest", value: "oldest" },
    { title: "rating", value: "rating" },
  ];

  const ratingOptions: CheckBoxOption[] = [
    { title: "5 or below", value: "5" },
    { title: "4 or below", value: "4" },
    { title: "3 or below", value: "3" },
    { title: "2 or below", value: "2" },
    { title: "1 or below", value: "1" },
  ];

  const { data: category } = useQuery(tRPC.filter.getCategories.queryOptions());

  return (
    <Form
      className="h-fit sticky border border-primary-text p-2 top-15"
      schema={filtersFormSchema}
      defaultValues={defaultValues}
      handleSubmit={(value) => {
        const params: SchemaType<typeof filtersSchema> = {
          sortBy: value.sortBy || undefined,
          rating: value.rating?.length ? value.rating.map(Number) : undefined,
          category: value.category || undefined,
          price:
            value.minPrice || value.maxPrice
              ? [value!.minPrice! || MIN_PRICE, value!.maxPrice! || MAX_PRICE]
              : undefined,
        };

        const parsedSchema = filtersSchema.safeParse(params);
        if (!parsedSchema.success) return;

        setParams(parsedSchema.data).refresh();
      }}
    >
      <Form.RadioField
        className="flex-col"
        name="sortBy"
        label="Sort By:"
        options={sortOptions}
      />
      <div>
        <Form.CheckboxesField
          name="rating"
          label="Rating:"
          options={ratingOptions}
        />
      </div>
      <Form.RadioField
        name="category"
        label="Category:"
        options={
          category?.categories.map(({ name }) => ({
            title: name,
            value: name,
          })) || []
        }
      />
      <Form.RangeField min={0} max={1500} name="price" label="Price Range:" />
      <div className="inline-flex justify-between w-full mt-2">
        <Form.Submit type="reset" isFilterForm />
        <Form.Submit type="apply" />
      </div>
    </Form>
  );
};

export default Filters;
