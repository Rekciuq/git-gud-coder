"use client";

import Form from "@/components/shared/form/Form";
import { cn } from "@/lib/cn";
import searchSchema from "@/schemas/search.schema";
import SearchSubmitButton from "./SearchSubmitButton";
import debounce from "lodash/debounce";
import { useSetParams } from "@/features/dashboard/hooks/useSetParams";

type SearchProps = {
  className?: string;
  inputClassName?: string;
};

const Search = ({ className, inputClassName }: SearchProps) => {
  const params = useSetParams();

  const setParams = debounce((values) => {
    params({ search: values || undefined }).refresh();
    return values;
  }, 500);

  return (
    <Form
      className={className}
      schema={searchSchema}
      handleSubmit={(values) => {
        setParams(values.search);
      }}
    >
      <Form.TextField
        name="search"
        icon={<SearchSubmitButton name="search" />}
        hideExceptInput
        className="flex justify-center"
        inputClassName={cn("relative", inputClassName)}
        placeholder="Search courses..."
        label="Search"
      />
    </Form>
  );
};

export default Search;
