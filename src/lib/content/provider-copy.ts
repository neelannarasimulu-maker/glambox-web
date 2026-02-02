export type ProviderCopy = {
  singular: string;
  plural: string;
  label: string;
  title: string;
};

const providerCopy: Record<string, ProviderCopy> = {
  hair: {
    singular: "hair stylist",
    plural: "hair stylists",
    label: "Hair stylist",
    title: "Hair Stylists",
  },
  nails: {
    singular: "nail technician",
    plural: "nail technicians",
    label: "Nail technician",
    title: "Nail Technicians",
  },
  wellness: {
    singular: "wellness consultant",
    plural: "wellness consultants",
    label: "Wellness consultant",
    title: "Wellness Consultants",
  },
};

export const getProviderCopy = (micrositeId: string): ProviderCopy =>
  providerCopy[micrositeId] ?? {
    singular: "therapist",
    plural: "therapists",
    label: "Therapist",
    title: "Therapists",
  };
