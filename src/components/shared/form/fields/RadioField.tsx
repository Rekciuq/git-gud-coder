import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import Label from "../Label";
import { RadioFieldProps } from "@/types/shared/form/field";
import { useFormContext } from "react-hook-form";

const RadioField = ({ name, label, className, options }: RadioFieldProps) => {
  const baseClassNames = "bg-background flex flex-col";
  const { watch } = useFormContext();
  const formValue = watch(name);

  return (
    <div className={cn(baseClassNames, className)}>
      <Label name={name} text={label} />
      <ErrorMessage name={name} />
      <div className="inline-flex justify-around">
        {options.map((opt) => (
          <div className="inline-flex gap-2" key={opt.value}>
            <p className="text-primary-text">{opt.title}</p>
            <div className="relative flex justify-center items-center">
              <Input
                name={name}
                value={opt.value}
                type="radio"
                className="w-6 h-6 cursor-pointer"
              />
              <div
                className={cn(
                  "w-4 h-4 border-2 border-transparent pointer-events-none absolute bg-primary-text opacity-0 transition-opacity",
                  formValue === opt.value && "opacity-100",
                )}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioField;
