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
  const baseClassNames = cn("", errors[name] ? "border-something-red!!" : "");

  return (
    <input
      className={cn(baseClassNames, className)}
      type={type}
      {...register(name)}
    />
  );
};

export default Input;
