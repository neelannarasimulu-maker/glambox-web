"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-xl px-3 py-2 text-sm font-medium transition",
        "hover:bg-surface-2",
        active && "text-brand",
        active && "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-brand"
      )}
    >
      {children}
    </Link>
  );
}
