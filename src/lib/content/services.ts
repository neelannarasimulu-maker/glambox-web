import hair from "@/content/services/hair.services.json";
import nails from "@/content/services/nails.services.json";
import wellness from "@/content/services/wellness.services.json";

export type Service = {
  id: string;
  name: string;
  category: string;
  tier: string;
  fromPriceZar: number;
  priceRangeZar: [number, number];
  durationMins: number;
  outcome: string;
  includes: string[];
  prepNotes: string[];
  afterCare: string[];
  image: string;
};

export type ServicesData = {
  microsite: string;
  currency: string;
  pricingNote: string;
  categories: string[];
  tiers: string[];
  services: Service[];
};

const servicesByMicrosite: Record<string, ServicesData> = {
  hair,
  nails,
  wellness,
};

export const getServicesByMicrosite = (microsite: string) =>
  servicesByMicrosite[microsite];

export const getServiceById = (microsite: string, serviceId: string) =>
  servicesByMicrosite[microsite]?.services.find(
    (service) => service.id === serviceId,
  );
