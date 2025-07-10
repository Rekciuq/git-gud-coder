import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Notify from "@/components/features/setup/Notify";
import { TRPCReactProvider } from "@/lib/trpc/client/client";

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
  return (
    <html className={`${jetBrainsMono.variable}`} lang="en">
      <body className={`antialiased bg-background`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Notify />
      </body>
    </html>
  );
}
