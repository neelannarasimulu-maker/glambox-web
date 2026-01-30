import therapistsData from "@/content/therapists/therapists.json";
import assignmentsData from "@/content/therapists/therapist-services_OLD.json";

export type Therapist = {
  id: string;
  name: string;
  roles: string[];
  photo: string;
  bio: string;
  specialties: string[];
  vibeTags: string[];
  rating: number;
  reviewsCount: number;
  locations: string[];
};

export type TherapistAssignment = {
  therapistId: string;
  microsite: string;
  serviceIds: string[];
};

export const getTherapists = () => therapistsData.therapists as Therapist[];

export const getTherapistById = (id: string) =>
  getTherapists().find((therapist) => therapist.id === id);

export const getTherapistAssignments = () =>
  assignmentsData.assignments as TherapistAssignment[];

export const getAssignmentsForTherapist = (therapistId: string) =>
  getTherapistAssignments().filter(
    (assignment) => assignment.therapistId === therapistId,
  );

export const getAssignmentsForMicrosite = (microsite: string) =>
  getTherapistAssignments().filter(
    (assignment) => assignment.microsite === microsite,
  );

export const getTherapistsForMicrosite = (microsite: string) => {
  const assignments = getAssignmentsForMicrosite(microsite);
  const therapistIds = new Set(assignments.map((assignment) => assignment.therapistId));
  return getTherapists().filter((therapist) => therapistIds.has(therapist.id));
};

export const getTherapistsForService = (microsite: string, serviceId: string) => {
  const assignments = getAssignmentsForMicrosite(microsite).filter((assignment) =>
    assignment.serviceIds.includes(serviceId),
  );
  const therapistIds = new Set(assignments.map((assignment) => assignment.therapistId));
  return getTherapists().filter((therapist) => therapistIds.has(therapist.id));
};

export const getMicrositesForTherapist = (therapistId: string) => {
  const assignments = getAssignmentsForTherapist(therapistId);
  return Array.from(new Set(assignments.map((assignment) => assignment.microsite)));
};

export const getServiceIdsForTherapistMicrosite = (
  therapistId: string,
  microsite: string,
) => {
  const assignment = getAssignmentsForTherapist(therapistId).find(
    (item) => item.microsite === microsite,
  );
  return assignment?.serviceIds ?? [];
};
