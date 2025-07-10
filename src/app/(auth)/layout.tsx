"use client";

import Card from "@/components/shared/Card";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();

  const isLoginPage = pathname.includes("/login");
  return (
    <div className="flex justify-center flex-col gap-3 items-center min-h-dvh">
      <h1 className="text-primary-text text-3xl">
        {isLoginPage ? "Login" : "Signup"}
      </h1>
      <Card className="mb-5">{children}</Card>
      <Link href={isLoginPage ? "/signup" : "/login"}>
        <p className="text-link hover:text-link-alt hover:underline text-sm">
          {isLoginPage ? "Signup instead" : "Login instead"}
        </p>
      </Link>
    </div>
  );
};

export default AuthLayout;
