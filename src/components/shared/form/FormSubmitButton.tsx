import { useFormState } from "react-hook-form";
import Button from "../Button";
import { ButtonTypes } from "@/types/shared/button";

type FormSubmitButtonProps = {
  type: ButtonTypes;
  className?: string;
};

const FormSubmitButton = ({ type, className }: FormSubmitButtonProps) => {
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
      isLoading={isSubmitting}
      label={typeHandler[type]}
    />
  );
};

export default FormSubmitButton;
