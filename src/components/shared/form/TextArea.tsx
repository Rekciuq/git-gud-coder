import { cn } from "@/lib/cn";
import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
};

const TextArea = ({ name }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const baseClassNames = cn(
    "text-primary-text p-1 border border-2 appearance-none focus:outline-2 focus:-outline-offset-2",
    errors[name]
      ? "border-alert-error/50 focus:outline-alert-error"
      : "border-primary-text/50 focus:outline-primary-text",
  );

  return <textarea className={baseClassNames} {...register(name)} />;
};

export default TextArea;
