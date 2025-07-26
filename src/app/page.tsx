"use client";

import { useUserStore } from "@/context/UserProvider";
import { useTRPC } from "@/lib/trpc/client/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
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
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
    </>
  );
}
