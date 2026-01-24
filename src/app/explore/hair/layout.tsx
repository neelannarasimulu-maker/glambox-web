import type { ReactNode } from "react";
import HairSubNav from "@/components/hair/HairSubNav";

export default function HairLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="hair"
      className="min-h-screen bg-[rgb(var(--bg-900))] text-[rgb(var(--text-200))]"
    >
      <HairSubNav />
      {children}
    </div>
  );
}
