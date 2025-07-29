import SearchIcon from "@/components/icons/SearchIcon";
import Form from "@/components/shared/form/Form";
import { cn } from "@/lib/cn";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

type SearchSubmitButtonProps = {
  name: string;
};

const SearchSubmitButton = ({ name }: SearchSubmitButtonProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className="cursor-pointer absolute p-2 z-10"
      onClick={() => submitButtonRef.current?.click()}
    >
      <SearchIcon
        className={cn(
          "h-4 w-4 stroke-primary-text",
          errors[name] && "stroke-alert-error",
        )}
      />
      <Form.Submit ref={submitButtonRef} type="submit" className="hidden" />
    </div>
  );
};
export default SearchSubmitButton;
