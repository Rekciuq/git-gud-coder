"use client";

import Header from "@/components/features/header/Header";
import { useUserStore } from "@/context/UserProvider";
import { useTRPC } from "@/lib/trpc/client/client";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const tRPC = useTRPC();

  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);

  const getMeOptions = tRPC.user.getUser.queryOptions();
  const { data: userData } = useQuery({ ...getMeOptions, initialData: user });

  useEffect(() => {
    if (!userData) return;

    updateUser(userData);
  }, [userData, updateUser]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
