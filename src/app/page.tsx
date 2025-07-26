"use client";

import { useUserStore } from "@/context/UserProvider";

export default function Home() {
  const { user } = useUserStore((state) => state);

  return (
    <>
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
    </>
  );
}
