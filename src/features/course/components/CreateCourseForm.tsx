import Form from "@/components/shared/form/Form";
import { useTRPC } from "@/lib/trpc/client/client";
import courseSchema from "@/schemas/course.schema";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CreateCourseForm = () => {
  const [videos, setVideos] = useState();
  const tRPC = useTRPC();
  const { data: category } = useQuery(tRPC.filter.getCategories.queryOptions());

  return (
    <Form handleSubmit={(values) => {}} schema={courseSchema}>
      <div className="flex gap-4 flex-col">
        <Form.TextField name="name" label="Name:" />
        <Form.TextAreaField name="description" label="Description:" />
        <Form.ImageField name="thumbnail" label="Thumbnail:" />
        <Form.NumberField name="price" label="Price:" />
      </div>
      <Form.RadioField
        name="category"
        label="Category:"
        options={
          (category?.categories || []).map(({ name }) => ({
            title: name,
            value: name,
          })) || []
        }
      />
      <Form.Submit type="submit" className="ml-auto" />
    </Form>
  );
};

export default CreateCourseForm;
