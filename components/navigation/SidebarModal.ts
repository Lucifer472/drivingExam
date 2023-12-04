import { create } from "zustand";

interface sideBarModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSideBarModal = create<sideBarModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSideBarModal;
