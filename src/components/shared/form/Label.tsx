import { cn } from "@/lib/cn";

type LabelProps = {
  name: string;
  className?: string;
  text: string;
};

const Label = ({ name, className, text }: LabelProps) => {
  const baseClassNames = "";
  return (
    <label htmlFor={name} className={cn(baseClassNames, className)}>
      {text}
    </label>
  );
};

export default Label;
