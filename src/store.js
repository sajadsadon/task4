import { create } from "zustand";

export const useAppStore = create((set) => ({
  cart: [],
  searchKey: "",
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
  setSearchKey: (searchKey) => set({ searchKey }),
  setCart: (cart) => set({ cart }),
}));