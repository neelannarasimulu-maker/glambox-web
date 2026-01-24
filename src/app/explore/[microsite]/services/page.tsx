import { notFound } from "next/navigation";
import ServicesCatalog from "@/components/microsite/ServicesCatalog";
import { getServicesByMicrosite } from "@/lib/content/services";
import { getMicrosite } from "@/lib/content/microsite";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ microsite: string }>;
}) {
  const { microsite } = await params;
  const config = getMicrosite(microsite);
  const servicesData = getServicesByMicrosite(microsite);

  if (!config || !servicesData) {
    notFound();
  }

  return <ServicesCatalog microsite={config.id} data={servicesData} />;
}
