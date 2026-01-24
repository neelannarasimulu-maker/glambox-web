import type { Service, Therapist } from "@/lib/hair-data";

export type HairQuestionnaire = {
  goals?: string[];
  feelings?: string[];
  sensitivities?: string[];
};

export const mergePreferences = (
  questionnaire?: HairQuestionnaire,
  profile?: HairQuestionnaire
) => ({
  goals: [...(questionnaire?.goals ?? []), ...(profile?.goals ?? [])],
  feelings: [...(questionnaire?.feelings ?? []), ...(profile?.feelings ?? [])],
  sensitivities: [
    ...(questionnaire?.sensitivities ?? []),
    ...(profile?.sensitivities ?? []),
  ],
});

const includesMatch = (source: string[], match: string) =>
  source.some((item) => item.toLowerCase().includes(match.toLowerCase()));

export const scoreTherapist = (
  therapist: Therapist,
  questionnaire?: HairQuestionnaire
) => {
  if (!questionnaire) return 0;
  let score = 0;

  if (questionnaire.goals?.some((goal) => goal.toLowerCase().includes("protective"))) {
    if (includesMatch(therapist.specialties, "protective")) score += 3;
  }

  if (questionnaire.feelings?.some((feeling) => feeling.toLowerCase().includes("relaxed"))) {
    if (includesMatch(therapist.vibeTags, "calm")) score += 2;
  }

  if (
    questionnaire.sensitivities?.some((sensitivity) =>
      sensitivity.toLowerCase().includes("fragrance")
    )
  ) {
    if (includesMatch(therapist.specialties, "gentle")) score += 2;
  }

  return score;
};

export const scoreService = (service: Service, questionnaire?: HairQuestionnaire) => {
  if (!questionnaire) return 0;
  let score = 0;

  if (questionnaire.goals?.some((goal) => goal.toLowerCase().includes("protective"))) {
    if (service.category === "Protective Styles") score += 3;
  }

  if (questionnaire.feelings?.some((feeling) => feeling.toLowerCase().includes("relaxed"))) {
    if (
      includesMatch([service.outcome, ...service.includes], "soft") ||
      includesMatch(service.includes, "massage")
    ) {
      score += 1;
    }
  }

  if (
    questionnaire.sensitivities?.some((sensitivity) =>
      sensitivity.toLowerCase().includes("fragrance")
    )
  ) {
    if (includesMatch(service.includes, "gentle")) score += 2;
  }

  return score;
};

export const rankTherapists = (
  items: Therapist[],
  questionnaire?: HairQuestionnaire
) =>
  [...items].sort(
    (a, b) => scoreTherapist(b, questionnaire) - scoreTherapist(a, questionnaire)
  );

export const rankServices = (items: Service[], questionnaire?: HairQuestionnaire) =>
  [...items].sort(
    (a, b) => scoreService(b, questionnaire) - scoreService(a, questionnaire)
  );
