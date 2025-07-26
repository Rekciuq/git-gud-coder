"use server";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/server/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const c = await cookies();
  c.delete(ACCESS_TOKEN);
  c.delete(REFRESH_TOKEN);

  redirect("/login");
}
