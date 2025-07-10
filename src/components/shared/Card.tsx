import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  const baseClassNames = "flex justify-center items-center";
  return <div className={cn(baseClassNames, className)}>{children}</div>;
};

export default Card;
