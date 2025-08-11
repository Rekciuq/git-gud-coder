import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import Label from "../Label";
import { CommonFieldProps } from "@/types/shared/form/field";

const NumberField = ({
  name,
  label,
  className,
  inputClassName,
  hideExceptInput,
  placeholder,
  icon,
}: CommonFieldProps) => {
  const baseClassNames = "bg-background flex flex-col";
  return (
    <div className={cn(baseClassNames, className)}>
      {!hideExceptInput && <Label name={name} text={label} />}
      {!hideExceptInput && <ErrorMessage name={name} />}
      {icon && icon}
      <Input
        placeholder={placeholder}
        className={inputClassName}
        name={name}
        type="number"
      />
    </div>
  );
};

export default NumberField;
