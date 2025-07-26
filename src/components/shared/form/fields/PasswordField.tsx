import { cn } from "@/lib/cn";
import ErrorMessage from "../ErrorMessage";
import Input from "../Input";
import Label from "../Label";
import { CommonFieldProps } from "@/types/shared/form/field";
import Eye from "@/components/icons/Eye";
import ShutEye from "@/components/icons/ShutEye";
import { useState } from "react";

const PasswordField = ({ name, label, className }: CommonFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const baseClassNames = "bg-background flex flex-col";
  return (
    <div className={cn(baseClassNames, className)}>
      <Label name={name} text={label} />
      <ErrorMessage name={name} />
      <div className="relative flex justify-center items-center">
        <Input
          autoComplete="current-password"
          className="w-full"
          name={name}
          type={showPassword ? "text" : "password"}
        />
        <div
          className={cn(
            baseClassNames,
            "bg-background absolute right-1.5 cursor-pointer p-0.75",
          )}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="h-4 w-4 stroke-primary-text" />
          ) : (
            <ShutEye className="h-4 w-4 stroke-primary-text" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
