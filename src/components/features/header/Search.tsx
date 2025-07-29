"use client";

import Form from "@/components/shared/form/Form";
import { cn } from "@/lib/cn";
import searchSchema from "@/schemas/search.schema";
import SearchSubmitButton from "./SearchSubmitButton";
import { useDebounceValue } from "usehooks-ts";

type SearchProps = {
  className?: string;
  inputClassName?: string;
};

const Search = ({ className, inputClassName }: SearchProps) => {
  const [debouncedValue, setDebouncedValue] = useDebounceValue("", 500);

  // TODO: Add useQuery request to search trough courses like /dashboard/?s="some text" to search by the name
  return (
    <Form
      className={className}
      schema={searchSchema}
      handleSubmit={(values) => {
        setDebouncedValue(values.search);
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
