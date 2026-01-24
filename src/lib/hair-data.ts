import {
  formatZar,
  getHairServiceById,
  getHairServices,
  getHairTherapistById,
  getHairTherapists,
  getServicesForTherapist as getServicesForTherapistFromContent,
  getTherapistsForService as getTherapistsForServiceFromContent,
  priceTiers,
  serviceCategories,
  viewDetailsLabel,
  viewProfileLabel,
  type PriceTier,
  type Service,
  type ServiceCategory,
  type Therapist,
} from "@/lib/content/hair";

export type { PriceTier, Service, ServiceCategory, Therapist };

export { formatZar, priceTiers, serviceCategories, viewDetailsLabel, viewProfileLabel };

export const services = getHairServices();
export const therapists = getHairTherapists();

export const getServiceById = getHairServiceById;
export const getTherapistById = getHairTherapistById;
export const getServicesByTherapist = getServicesForTherapistFromContent;
export const getTherapistsForService = getTherapistsForServiceFromContent;
