"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbsProps = {
  className?: string;
};

const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const routes = pathname.split("/");
  const breadcrumbs: { title: string; path: string }[] = [];

  routes.reduce((acc, path, index) => {
    if (path.includes("/") || !path) return acc;
    const formattedAcc = !!acc ? acc : "/";

    const formattedRoute =
      index === routes.length - 1
        ? formattedAcc + path
        : formattedAcc + path + "/";

    breadcrumbs.push({
      title: `${path[0].toUpperCase()}${path.slice(1)}`,
      path: formattedRoute,
    });

    return formattedRoute;
  });

  return (
    <div className={cn("inline-flex gap-2", className)}>
      {breadcrumbs.map((crumb, index) => (
        <div className="inline-flex gap-2" key={crumb.path}>
          <Link
            className="text-primary-text text-xs hover:underline hover:text-link-alt"
            href={crumb.path}
          >
            {crumb.title}
          </Link>
          {!!(index !== breadcrumbs.length - 1) && (
            <div className="text-primary-text text-xs">/</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
