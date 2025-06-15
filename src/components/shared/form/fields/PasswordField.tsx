import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import Label from "../Label";
import { CommonFieldProps } from "@/types/shared/form/field";

const PasswordField = ({ name, label, className }: CommonFieldProps) => {
  const baseClassNames = "";
  return (
    <div className={cn(baseClassNames, className)}>
      <Label name={name} text={label} className="" />
      <Input name={name} type="password" className="" />
      <ErrorMessage name={name} className="" />
    </div>
  );
};

export default PasswordField;
