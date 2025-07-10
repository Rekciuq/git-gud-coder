import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import Label from "../Label";
import { CommonFieldProps } from "@/types/shared/form/field";

const TextField = ({ name, label, className }: CommonFieldProps) => {
  const baseClassNames = "bg-background flex flex-col";
  return (
    <div className={cn(baseClassNames, className)}>
      <Label name={name} text={label} />
      <ErrorMessage name={name} />
      <Input name={name} type="text" />
    </div>
  );
};

export default TextField;
