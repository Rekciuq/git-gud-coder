import { cn } from "@/lib/cn";
import Input from "../Input";
import Label from "../Label";
import { CheckBoxesFieldProps } from "@/types/shared/form/field";
import { useFormContext } from "react-hook-form";
import CheckIcon from "@/components/icons/CheckIcon";

const CheckBoxesField = ({
  name,
  label,
  className,
  options,
}: CheckBoxesFieldProps) => {
  const baseClassNames = "bg-background flex flex-col my-3";
  const { watch } = useFormContext();
  const formValue: unknown[] = watch(name) || [];

  return (
    <div className={cn(baseClassNames, className)}>
      <Label text={label} />
      <div className="flex flex-col w-2/5 gap-1.5">
        {options.map((opt) => (
          <div className="inline-flex justify-between" key={opt.value}>
            <p className="text-primary-text">{opt.title}</p>
            <div className="relative flex justify-center items-center">
              <Input
                name={name}
                value={opt.value}
                type="checkbox"
                className="w-6 h-6 cursor-pointer"
              />
              <div
                className={cn(
                  "w-4 h-4 border-2 border-transparent pointer-events-none absolute bg-primary-text opacity-0 transition-opacity",
                  formValue.find((v) => opt.value === v) ? "opacity-100" : "",
                )}
              >
                <CheckIcon className="w-3 h-3 stroke-8 stroke-panel" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxesField;
