"use client";

import { MAX_PASSWORD_LENGTH } from "@/constants/schemas/auth/values";
import { cn } from "@/lib/cn";
import { InputType } from "@/types/shared/form/input";
import { forwardRef, HTMLInputAutoCompleteAttribute } from "react";
import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  type: InputType;
  className?: string;
  value?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, className, autoComplete, value }: InputProps, inputRef) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const baseClassNames = cn(
      "text-primary-text p-1 border border-2 appearance-none focus:outline-2 focus:-outline-offset-2",
      errors[name]
        ? "border-alert-error/50 focus:outline-alert-error"
        : "border-primary-text/50 focus:outline-primary-text",
    );

    const { ref: hookFormRef, ...rest } = register(name, { value });

    return (
      <input
        autoComplete={autoComplete}
        ref={(element) => {
          hookFormRef(element);

          if (typeof inputRef === "function") {
            inputRef(element);
          } else if (inputRef) {
            inputRef.current = element;
          }
        }}
        maxLength={MAX_PASSWORD_LENGTH}
        className={cn(baseClassNames, className)}
        type={type}
        value={value}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
