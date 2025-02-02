import { create } from "zustand";
import { createUserSlice, UserState } from "./userInfoSlice";

export const useAppStore = create<UserState>()((...a) => ({
  ...createUserSlice(a[0], a[1], a[2]),
}));
