"use client";
import Form from "@/components/shared/form/Form";
import filtersSchema from "@/schemas/filters.schema";
import { CheckBoxOption, RadioOption } from "@/types/shared/form/field";

const Filters = () => {
  const sortOptions: RadioOption[] = [
    { title: "price", value: "price" },
    { title: "newest", value: "newest" },
    { title: "oldest", value: "oldest" },
    { title: "rating", value: "rating" },
  ];
  const ratingOptions: CheckBoxOption[] = [
    { title: "5 or below", name: "rating-5", value: "5" },
    { title: "4 or below", name: "rating-4", value: "4" },
    { title: "3 or below", name: "rating-3", value: "3" },
    { title: "2 or below", name: "rating-2", value: "2" },
    { title: "1 or below", name: "rating-1", value: "1" },
  ];
  return (
    <Form
      className="h-fit sticky border border-primary-text p-2 top-15"
      schema={filtersSchema}
      handleSubmit={(value) => console.log("filters", value)}
    >
      <Form.RadioField
        className="flex-col"
        name="sortBy"
        label="Sort By:"
        options={sortOptions}
      />
      <div>
        <Form.CheckboxesField label="Rating:" options={ratingOptions} />
      </div>
      <div>
        <h3>Category</h3>
      </div>
      <div>
        <h3>Price</h3>
      </div>
      {/* Reset */}
    </Form>
  );
};

export default Filters;
