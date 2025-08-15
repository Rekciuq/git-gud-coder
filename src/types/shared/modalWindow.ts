import { Dispatch, SetStateAction } from "react";

export type ModalWindowControls<CurrentItem = unknown> = {
  controls: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setCurrentItem: Dispatch<SetStateAction<CurrentItem>>;
  };
  state: {
    isOpen: boolean;
    currentItem: CurrentItem;
  };
};
