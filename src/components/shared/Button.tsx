import { ButtonTypes } from "@/types/shared/button";
import { MouseEventHandler } from "react";
import Loader from "../icons/Loader";
import { cn } from "@/lib/cn";

type ButtonProps = {
  label: string;
  type: ButtonTypes;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  label,
  type,
  disabled = false,
  isLoading,
  onClick,
}: ButtonProps) => {
  const baseClassNames = "relative flex justify-center items-center border";
  const buttonTypeMapper: Record<ButtonTypes, string> = {
    submit: "",
    update: "",
    delete: "",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        baseClassNames,
        buttonTypeMapper[type],
        disabled && "opacity-0.8",
      )}
      disabled={disabled || isLoading}
    >
      <p className={cn(isLoading ? "opacity-0" : "")}>{label}</p>
      {isLoading && <Loader className="w-4 h-4 absolute" />}
    </button>
  );
};

export default Button;
