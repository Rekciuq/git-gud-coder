// lib/trpc/server/caller.ts
import { cookies } from "next/headers";
import { appRouter } from "./_app";

export const getServerCaller = async () => {
  const cookieStore = await cookies();
  const requestHeaders = new Headers();

  const cookieString = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  requestHeaders.set("Cookie", cookieString);

  return appRouter.createCaller({
    headers: requestHeaders,
    responseHeaders: new Headers(),
  });
};
