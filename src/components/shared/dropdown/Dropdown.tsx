import { useOnClickOutside } from "usehooks-ts";
import { RefObject, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import CaretUpIcon from "@/components/icons/caret/CaretUpIcon";

type DropdownProps = {
  children: React.ReactNode;
  options: {
    title: string;
    href?: string;
    onClick?: () => void;
    className?: string;
  }[];
};

const Dropdown = ({ children, options = [] }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = () => setIsOpen(false);

  useOnClickOutside(
    dropdownRef as RefObject<HTMLDivElement>,
    handleClickOutside,
  );

  return (
    <div
      ref={dropdownRef}
      className="inline-flex group cursor-pointer relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <CaretUpIcon
        transform={isOpen ? "rotate(180)" : "rotate(0)"}
        className="w-6 h-6 group-hover:fill-primary-text fill-transparent stroke-primary-text transition-all"
      />
      {isOpen && (
        <div
          className={cn(
            "left-0 mt-8 absolute bg-panel-alt border border-primary-text w-full transition-opacity",
          )}
        >
          {options.map((opt) =>
            opt?.href ? (
              <Link
                key={opt.title}
                href={opt.href}
                className={opt.className}
                onClick={opt?.onClick}
              >
                {opt.title}
              </Link>
            ) : (
              <p
                key={opt.title}
                className={cn(
                  "text-link block hover:text-link-alt p-2 underline",
                  opt.className,
                )}
                onClick={opt?.onClick}
              >
                {opt.title}
              </p>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
