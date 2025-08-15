"use client";

import { cn } from "@/lib/cn";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalWindowBody from "./ModalWindowBody";
import { ModalWindowControls } from "@/types/shared/modalWindow";

type ModalWindowProps<CurrentItem> = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
} & ModalWindowControls<CurrentItem>;

const ModalWindow = <CurrentItem,>({
  controls,
  state,
  children,
  className,
  onClose,
}: ModalWindowProps<CurrentItem>) => {
  const defaultClassNames =
    "fixed overflow-auto inset-0 flex items-center justify-center z-50";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !state.isOpen) return <></>;

  return createPortal(
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          controls.setIsOpen(false);
          onClose?.();
        }
      }}
      className={cn(
        defaultClassNames,
        "bg-background/50 hover:cursor-pointer",
        className,
      )}
    >
      <ModalWindowBody>{children}</ModalWindowBody>
    </div>,
    document.body,
  );
};

export default ModalWindow;
