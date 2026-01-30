import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMicrosite } from "@/lib/content/microsite";

export default async function BookingMicrositeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ microsite: string }>;
}) {
  const { microsite } = await params;
  const config = getMicrosite(microsite);

  if (!config) {
    notFound();
  }

  return (
    <div
      data-theme={config.themeKey}
      className="ambient-bg min-h-screen bg-[rgb(var(--bg-900))] text-[rgb(var(--text-200))]"
    >
      {children}
    </div>
  );
}
