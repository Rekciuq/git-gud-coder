import { useEffect, useState } from "react";

const useModalWindow = <CurrentItem = unknown>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CurrentItem | null>(null);

  useEffect(() => {
    if (!isOpen) setCurrentItem(null);
  }, [isOpen]);

  return {
    controls: {
      setIsOpen,
      setCurrentItem,
    },
    state: {
      isOpen,
      currentItem,
    },
  };
};

export default useModalWindow;
