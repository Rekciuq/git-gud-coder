import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import Label from "../Label";
import { CommonFieldProps } from "@/types/shared/form/field";
import CancelIcon from "@/components/icons/CancelIcon";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

const ImageField = ({ name, label, className }: CommonFieldProps) => {
  const baseClassNames = "bg-background flex flex-col";
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const imageRef = useRef<HTMLInputElement>(null);
  const imageFormValue = watch(name);
  const inputHasFiles = !!imageFormValue?.length;

  return (
    <div className={cn(baseClassNames, className)}>
      <Label name={name} text={label} />
      <ErrorMessage name={name} />
      <div className="cursor-pointer w-full relative flex justify-center items-center">
        <Input
          ref={imageRef}
          className="w-full hidden"
          autoComplete="username"
          name={name}
          type="file"
        />
        <button
          className={cn(
            "w-full border-2 text-primary-text text-left p-1",
            errors[name]
              ? "border-alert-error/50 focus:outline-alert-error"
              : "border-primary-text/50 focus:outline-primary-text",
          )}
          onClick={() => {
            imageRef.current?.click();
          }}
        >
          <span className="text-primary-text truncate block">
            {inputHasFiles
              ? `Chosen image is: ${imageFormValue?.[0]?.name}`
              : "Choose the image..."}
          </span>
        </button>
        {inputHasFiles && (
          <div
            className="bg-background absolute z-10 right-1.5 p-0.75"
            onClick={() => {
              setValue(name, null);
            }}
          >
            <CancelIcon className="w-4 h-4 stroke-primary-text" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageField;
