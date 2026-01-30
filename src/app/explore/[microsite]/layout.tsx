import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import MicrositeHeader from "@/components/microsite/MicrositeHeader";
import { getMicrosite } from "@/lib/content/microsite";
import Breadcrumbs from "@/components/nav/Breadcrumbs";

export default async function MicrositeLayout({
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
      className="min-h-screen bg-[rgb(var(--bg-900))] text-[rgb(var(--text-200))]"
    >
      <MicrositeHeader config={config} />
      <Breadcrumbs />
      {children}
    </div>
  );
}
