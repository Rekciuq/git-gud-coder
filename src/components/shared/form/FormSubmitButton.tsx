import { useFormState } from "react-hook-form";
import Button from "../Button";
import { ButtonTypes } from "@/types/shared/button";

type FormSubmitButtonProps = {
  type: ButtonTypes;
  className?: string;
  isLoading?: boolean;
};

const FormSubmitButton = ({
  type,
  className,
  isLoading,
}: FormSubmitButtonProps) => {
  const { isSubmitting } = useFormState();

  const typeHandler: Record<ButtonTypes, string> = {
    submit: "Submit",
    update: "Update",
    delete: "Delete",
  };

  return (
    <Button
      className={className}
      type={type}
      isLoading={isSubmitting || isLoading}
      label={typeHandler[type]}
    />
  );
};

export default FormSubmitButton;
