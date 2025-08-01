import { ButtonTypes } from "@/types/shared/button";
import { forwardRef, MouseEventHandler } from "react";
import Loader from "../icons/Loader";
import { cn } from "@/lib/cn";
import { useFormContext } from "react-hook-form";
import { useSetParams } from "@/features/dashboard/hooks/useSetParams";

type ButtonProps = {
  label: string;
  type: ButtonTypes;
  disabled?: boolean;
  isLoading?: boolean;
  isFilterForm?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      type,
      disabled = false,
      isLoading,
      isFilterForm = false,
      className,
      onClick,
    }: ButtonProps,
    ref,
  ) => {
    const { reset } = useFormContext();
    const setParams = useSetParams();

    const baseClassNames =
      "relative flex justify-center items-center border border-2 p-1 text-primary-text cursor-pointer transition-colors";

    const submitClasses =
      "border-button-primary text-button-primary hover:border-button-primary/75 hover:text-button-primary/75 disabled:border-button-primary/75 disabled:text-button-primary/75";
    const dangerClasses =
      "border-alert-error text-alert-error hover:border-alert-error/75 hover:text-alert-error/75 disabled:border-alert-error/75 disabled:text-alert-error/75";

    const buttonTypeMapper: Record<ButtonTypes, string> = {
      submit: submitClasses,
      update:
        "border-alert-peach text-alert-peach hover:border-alert-peach/75 hover:text-alert-peach/75",
      delete: dangerClasses,
      reset: dangerClasses,
      apply: submitClasses,
    };

    return (
      <button
        ref={ref}
        type={type !== "reset" ? "submit" : "reset"}
        onClick={(e) => {
          if (!onClick && type === "reset") {
            reset();
            if (isFilterForm) {
              setParams({
                sortBy: undefined,
                search: undefined,
                price: undefined,
                rating: undefined,
                category: undefined,
              }).refresh();
            }
          }
          onClick?.(e);
        }}
        className={cn(
          baseClassNames,
          buttonTypeMapper[type],
          (disabled || isLoading) && "pointer-events-none",
          className,
        )}
        disabled={disabled || isLoading}
      >
        <p className={cn(isLoading && "opacity-0")}>{label}</p>
        {isLoading && <Loader className="w-4 h-4 absolute" />}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
