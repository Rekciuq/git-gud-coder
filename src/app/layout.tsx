import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Notify from "@/components/features/setup/Notify";
import { TRPCReactProvider } from "@/lib/trpc/client/client";
import { cookies } from "next/headers";
import { appRouter } from "@/lib/trpc/server/_app";
import UserProvider from "@/context/UserProvider";
import { ACCESS_TOKEN } from "@/constants/server/jwt";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-get-brains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GGC",
  description: "Git gud!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();

  const requestHeaders = new Headers();
  const accessToken = cookieStore.get(ACCESS_TOKEN);

  if (cookieStore) {
    const cookieString = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    requestHeaders.set("Cookie", cookieString);
  }

  const caller = appRouter.createCaller({
    headers: requestHeaders,
    responseHeaders: new Headers(),
  });

  const user = accessToken ? await caller.user.getUser() : null;

  return (
    <html className={`${jetBrainsMono.variable}`} lang="en">
      <body className={`antialiased bg-background`}>
        <TRPCReactProvider>
          {user ? (
            <UserProvider initialUser={user}>{children}</UserProvider>
          ) : (
            <>{children}</>
          )}
        </TRPCReactProvider>
        <Notify />
      </body>
    </html>
  );
}
