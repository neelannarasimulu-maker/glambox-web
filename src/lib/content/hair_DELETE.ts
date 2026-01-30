import servicesContent from "@/content/hair/services.json";
import therapistsContent from "@/content/hair/therapists.json";
import viewDetailsContent from "@/content/hair/view-details.json";
import viewProfileContent from "@/content/hair/view-profile.json";

export type PriceTier = "Essential" | "Signature" | "Luxe";

export type ServiceCategory =
  | "Cuts & Styling"
  | "Colour"
  | "Treatments"
  | "Protective Styles"
  | "Wigs & Weaves";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  tier: PriceTier;
  fromPriceZar: number;
  priceRangeZar?: [number, number];
  durationMins: number;
  outcome: string;
  includes: string[];
  prepNotes?: string[];
  afterCare?: string[];
  recommendedTherapistIds: string[];
  image: string;
};

export type Therapist = {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  specialties: string[];
  vibeTags: string[];
  priceTier: PriceTier;
  rating: number;
  reviewsCount: number;
  nextAvailable: string;
  locations: string[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === "number");

export const serviceCategories = (Array.isArray(servicesContent.categories)
  ? servicesContent.categories
  : []) as ServiceCategory[];

export const priceTiers = (Array.isArray(servicesContent.tiers)
  ? servicesContent.tiers
  : []) as PriceTier[];

const tierOrder = new Map(priceTiers.map((tier, index) => [tier, index]));
const categoryOrder = new Map(
  serviceCategories.map((category, index) => [category, index])
);

const isService = (value: unknown): value is Service => {
  if (!isRecord(value)) return false;

  const priceRange = value.priceRangeZar;
  const isValidRange =
    priceRange === undefined ||
    (isNumberArray(priceRange) && priceRange.length === 2);

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.category === "string" &&
    typeof value.tier === "string" &&
    typeof value.fromPriceZar === "number" &&
    typeof value.durationMins === "number" &&
    typeof value.outcome === "string" &&
    isStringArray(value.includes) &&
    isStringArray(value.recommendedTherapistIds) &&
    typeof value.image === "string" &&
    isValidRange
  );
};

const isTherapist = (value: unknown): value is Therapist => {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.role === "string" &&
    typeof value.photo === "string" &&
    typeof value.bio === "string" &&
    isStringArray(value.specialties) &&
    isStringArray(value.vibeTags) &&
    typeof value.priceTier === "string" &&
    typeof value.rating === "number" &&
    typeof value.reviewsCount === "number" &&
    typeof value.nextAvailable === "string" &&
    isStringArray(value.locations)
  );
};

const stableSort = <T,>(items: T[], compare: (a: T, b: T) => number) =>
  items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const result = compare(a.item, b.item);
      return result === 0 ? a.index - b.index : result;
    })
    .map(({ item }) => item);

const compareServices = (a: Service, b: Service) => {
  const tierDelta =
    (tierOrder.get(a.tier) ?? 0) - (tierOrder.get(b.tier) ?? 0);
  if (tierDelta !== 0) return tierDelta;

  const categoryDelta =
    (categoryOrder.get(a.category) ?? 0) - (categoryOrder.get(b.category) ?? 0);
  if (categoryDelta !== 0) return categoryDelta;

  return a.name.localeCompare(b.name);
};

const compareTherapists = (a: Therapist, b: Therapist) => {
  const tierDelta =
    (tierOrder.get(a.priceTier) ?? 0) - (tierOrder.get(b.priceTier) ?? 0);
  if (tierDelta !== 0) return tierDelta;

  return a.name.localeCompare(b.name);
};

const rawServices = Array.isArray(servicesContent.services)
  ? servicesContent.services
  : [];
const rawTherapists = Array.isArray(therapistsContent.therapists)
  ? therapistsContent.therapists
  : [];

const services = stableSort(rawServices.filter(isService), compareServices);
const therapists = stableSort(rawTherapists.filter(isTherapist), compareTherapists);

export const pricingNote =
  typeof servicesContent.pricingNote === "string" ? servicesContent.pricingNote : "";

export const currency =
  typeof servicesContent.currency === "string" ? servicesContent.currency : "ZAR";

export const viewDetailsLabel =
  typeof viewDetailsContent.label === "string"
    ? viewDetailsContent.label
    : "View details";

export const viewProfileLabel =
  typeof viewProfileContent.label === "string"
    ? viewProfileContent.label
    : "View profile";

export const formatZar = (value: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const getHairServices = () => [...services];

export const getHairServiceById = (id: string) =>
  services.find((service) => service.id === id) ?? null;

export const getHairTherapists = () => [...therapists];

export const getHairTherapistById = (id: string) =>
  therapists.find((therapist) => therapist.id === id) ?? null;

export const getTherapistsForService = (serviceId: string) => {
  const service = getHairServiceById(serviceId);
  if (!service) return [];
  return therapists.filter((therapist) =>
    service.recommendedTherapistIds.includes(therapist.id)
  );
};

export const getServicesForTherapist = (therapistId: string) =>
  services.filter((service) =>
    service.recommendedTherapistIds.includes(therapistId)
  );
