import { useFormState } from "react-hook-form";
import Button from "../Button";
import { ButtonTypes } from "@/types/shared/button";

type FormSubmitButtonProps = {
  type: ButtonTypes;
};

const FormSubmitButton = ({ type }: FormSubmitButtonProps) => {
  const { isSubmitting } = useFormState();

  const typeHandler: Record<ButtonTypes, string> = {
    submit: "Submit",
    update: "Update",
    delete: "Delete",
  };

  return (
    <Button type="submit" isLoading={isSubmitting} label={typeHandler[type]} />
  );
};

export default FormSubmitButton;
