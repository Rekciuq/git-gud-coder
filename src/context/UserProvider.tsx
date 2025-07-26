"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type SharedUser = {
  id: number;
  image: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  email?: string | undefined;
  roleId?: number | undefined;
};

type UserStore = {
  user: SharedUser;
  updateUser: (user: SharedUser) => void;
};

const UserContext = createContext<StoreApi<UserStore> | undefined>(undefined);

type UserProviderProps = PropsWithChildren & {
  initialUser: SharedUser;
};

export default function UserProvider({
  children,
  initialUser,
}: UserProviderProps) {
  const [store] = useState(() =>
    createStore<UserStore>((set) => ({
      user: initialUser,
      updateUser: (user: SharedUser) => set((state) => ({ ...state, user })),
    })),
  );

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
}

export function useUserStore<T>(selector: (state: UserStore) => T) {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext.Provider is missing");
  }

  return useStore(context, selector);
}
