"use client";

import { cn } from "@/lib/cn";
import { InputType } from "@/types/shared/form/input";
import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  type: InputType;
  className?: string;
};

const Input = ({ name, type, className }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const baseClassNames = cn(
    "text-primary-text border border-2 appearance-none focus:outline-2 focus:-outline-offset-2",
    errors[name]
      ? "border-alert-error/50 focus:outline-alert-error"
      : "border-primary-text/50 focus:outline-primary-text",
  );

  return (
    <input
      id={name}
      className={cn(baseClassNames, className)}
      type={type}
      {...register(name)}
    />
  );
};

export default Input;
