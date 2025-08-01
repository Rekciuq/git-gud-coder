"use client";

import Form from "@/components/shared/form/Form";
import { useSetParams } from "@/features/dashboard/hooks/useSetParams";
import filtersSchema from "@/schemas/filters.schema";
import filtersFormSchema from "@/schemas/filtersForm.schema";
import { CheckBoxOption, RadioOption } from "@/types/shared/form/field";
import { SchemaType } from "@/types/shared/schema";

const Filters = () => {
  const setParams = useSetParams();
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
  const categories: RadioOption[] = [
    { title: "test1", value: "test1" },
    { title: "test2", value: "test2" },
  ];
  return (
    <Form
      className="h-fit sticky border border-primary-text p-2 top-15"
      schema={filtersFormSchema}
      handleSubmit={(value) => {
        const params: SchemaType<typeof filtersSchema> = {
          ...value,
          price:
            value.minPrice || value.maxPrice
              ? [value!.minPrice!, value!.maxPrice!]
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
      <Form.RadioField name="category" label="Category:" options={categories} />
      <Form.RangeField min={0} max={1500} name="price" label="Price Range:" />
      <div className="inline-flex justify-between w-full mt-2">
        <Form.Submit type="reset" />
        <Form.Submit type="apply" />
      </div>
    </Form>
  );
};

export default Filters;
