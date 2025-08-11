import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";
import { CommonFieldProps } from "@/types/shared/form/field";
import TextArea from "../TextArea";

const TextAreaField = ({
  name,
  label,
  className,
  hideExceptInput,
  icon,
}: CommonFieldProps) => {
  const baseClassNames = "bg-background flex flex-col";
  return (
    <div className={cn(baseClassNames, className)}>
      {!hideExceptInput && <Label name={name} text={label} />}
      {!hideExceptInput && <ErrorMessage name={name} />}
      {icon && icon}
      <TextArea name={name} />
    </div>
  );
};

export default TextAreaField;
