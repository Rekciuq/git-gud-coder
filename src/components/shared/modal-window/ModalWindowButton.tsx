import { cn } from "@/lib/cn";
import { Dispatch, SetStateAction } from "react";

type ModalWindowButtonProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  children: React.ReactNode;
};

const ModalWindowButton = ({
  setIsOpen,
  isOpen,
  children,
}: ModalWindowButtonProps) => {
  const baseClassNames = cn(
    "relative flex justify-center items-center border border-2 p-1 text-primary-text cursor-pointer transition-colors",
    "border-button-primary text-button-primary hover:border-button-primary/75 hover:text-button-primary/75 disabled:border-button-primary/75 disabled:text-button-primary/75",
  );
  return (
    <button
      className={baseClassNames}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </button>
  );
};

export default ModalWindowButton;
