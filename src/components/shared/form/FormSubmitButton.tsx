import { useFormState } from "react-hook-form";
import Button from "../Button";
import { ButtonTypes } from "@/types/shared/button";
import { forwardRef } from "react";

type FormSubmitButtonProps = {
  type: ButtonTypes;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  label?: string;
};

const FormSubmitButton = forwardRef<HTMLButtonElement, FormSubmitButtonProps>(
  (
    { type, className, isLoading, onClick, label }: FormSubmitButtonProps,
    ref,
  ) => {
    const { isSubmitting } = useFormState();

    const typeHandler: Record<ButtonTypes, string> = {
      submit: "Submit",
      update: "Update",
      delete: "Delete",
      reset: "Reset",
      apply: "Apply",
    };

    return (
      <Button
        ref={ref}
        className={className}
        type={type}
        onClick={onClick}
        isLoading={isSubmitting || isLoading}
        label={label || typeHandler[type]}
      />
    );
  },
);

FormSubmitButton.displayName = "FormSubmitButton";

export default FormSubmitButton;
