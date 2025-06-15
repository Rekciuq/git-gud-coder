"use client";

import { cn } from "@/lib/cn";
import { useFormContext } from "react-hook-form";

type ErrorMessageProps = {
  name: string;
  className?: string;
};

const ErrorMessage = ({ name, className }: ErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const baseClassNames = "";
  return (
    <>
      {errors[name]?.message && (
        <p className={cn(baseClassNames, className)}>
          {errors[name].message.toString()}
        </p>
      )}
    </>
  );
};

export default ErrorMessage;
