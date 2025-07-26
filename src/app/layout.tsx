import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Notify from "@/components/features/setup/Notify";
import { TRPCReactProvider } from "@/lib/trpc/client/client";
import { cookies } from "next/headers";
import { appRouter } from "@/lib/trpc/server/_app";
import UserProvider from "@/context/UserProvider";

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
  const requestHeaders = new Headers();

  const cookieString = cookies().toString();
  if (cookieString) {
    requestHeaders.set("Cookie", cookieString);
  }

  const caller = appRouter.createCaller({
    req: { headers: requestHeaders } as Request,
    resHeaders: new Headers(),
  });

  const user = await caller.user.getUser();

  return (
    <html className={`${jetBrainsMono.variable}`} lang="en">
      <body className={`antialiased bg-background`}>
        <TRPCReactProvider>
          <UserProvider initialUser={user}>{children}</UserProvider>
        </TRPCReactProvider>
        <Notify />
      </body>
    </html>
  );
}
