export type AuthProvider = "email" | "google" | "facebook";

export type AuthState = {
  isAuthed: boolean;
  provider: AuthProvider;
  email: string;
  verified: boolean;
};

export type Profile = {
  fullName: string;
  preferredName: string;
  phone: string;
  city: string;
  ageRange: string;
  comms: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
  createdAt: string;
};

export type Questionnaire = {
  goals: string[];
  visitFrequency: string;
  feelings: string[];
  environment: string[];
  sensitivities: string[];
  productPref: string;
  style: {
    hair: string[];
    nails: string[];
    skin: string[];
  };
  inspoUrl: string;
  consentPersonalisation: boolean;
  consentMarketing: boolean;
};

export type Flags = {
  onboardingComplete: boolean;
};

export type GlamboxStore = {
  auth: AuthState;
  profile: Profile;
  questionnaire: Questionnaire;
  flags: Flags;
};

const STORAGE_KEY = "glambox-store-v1";

const defaultStore: GlamboxStore = {
  auth: {
    isAuthed: false,
    provider: "email",
    email: "",
    verified: false,
  },
  profile: {
    fullName: "",
    preferredName: "",
    phone: "",
    city: "",
    ageRange: "",
    comms: {
      whatsapp: false,
      email: true,
      sms: false,
    },
    createdAt: "",
  },
  questionnaire: {
    goals: [],
    visitFrequency: "",
    feelings: [],
    environment: [],
    sensitivities: [],
    productPref: "",
    style: {
      hair: [],
      nails: [],
      skin: [],
    },
    inspoUrl: "",
    consentPersonalisation: false,
    consentMarketing: false,
  },
  flags: {
    onboardingComplete: false,
  },
};

const isBrowser = () => typeof window !== "undefined";

export const getStore = (): GlamboxStore => {
  if (!isBrowser()) {
    return defaultStore;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultStore;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<GlamboxStore>;
    return {
      auth: { ...defaultStore.auth, ...parsed.auth },
      profile: { ...defaultStore.profile, ...parsed.profile },
      questionnaire: {
        ...defaultStore.questionnaire,
        ...parsed.questionnaire,
        style: {
          ...defaultStore.questionnaire.style,
          ...parsed.questionnaire?.style,
        },
      },
      flags: { ...defaultStore.flags, ...parsed.flags },
    };
  } catch {
    return defaultStore;
  }
};

export const setStore = (next: Partial<GlamboxStore>): GlamboxStore => {
  const current = getStore();
  const merged: GlamboxStore = {
    auth: { ...current.auth, ...next.auth },
    profile: { ...current.profile, ...next.profile },
    questionnaire: {
      ...current.questionnaire,
      ...next.questionnaire,
      style: {
        ...current.questionnaire.style,
        ...next.questionnaire?.style,
      },
    },
    flags: { ...current.flags, ...next.flags },
  };
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }
  return merged;
};

export const setAuthState = (auth: Partial<AuthState>) => setStore({ auth });

export const setProfile = (profile: Partial<Profile>) => setStore({ profile });

export const setQuestionnaire = (questionnaire: Partial<Questionnaire>) =>
  setStore({ questionnaire });

export const setFlags = (flags: Partial<Flags>) => setStore({ flags });

export const isOnboardingComplete = (store: GlamboxStore): boolean => {
  const profileExists = Boolean(
    store.profile.fullName ||
      store.profile.preferredName ||
      store.profile.city ||
      store.profile.phone ||
      store.profile.ageRange,
  );
  return profileExists && store.questionnaire.consentPersonalisation;
};

export const getPostAuthRoute = (store: GlamboxStore): string => {
  return isOnboardingComplete(store) ? "/dashboard" : "/onboarding/profile";
};

export const resetGlamboxStore = () => {
  if (isBrowser()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  return defaultStore;
};
