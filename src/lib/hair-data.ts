export type TherapistRole =
  | "Hair Artist"
  | "Colour Specialist"
  | "Protective Styling Specialist";

export type PriceTier = "Essential" | "Signature" | "Luxe";

export type Therapist = {
  id: string;
  name: string;
  role: TherapistRole;
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

export const therapists: Therapist[] = [
  {
    id: "amira-khan",
    name: "Amira Khan",
    role: "Hair Artist",
    photo: "/gallery/g-1.jpg",
    bio: "Amira blends precision cutting with a soft, lived-in finish. Clients love her gentle consultations and natural texture expertise.",
    specialties: ["Blowouts", "Silk press", "Natural hair care"],
    vibeTags: ["Calm energy", "Detail-obsessed", "Bridal-ready"],
    priceTier: "Signature",
    rating: 4.9,
    reviewsCount: 186,
    nextAvailable: "Tomorrow 14:30",
    locations: ["Cape Town", "Johannesburg"],
  },
  {
    id: "kiara-dlamini",
    name: "Kiara Dlamini",
    role: "Colour Specialist",
    photo: "/gallery/g-2.jpg",
    bio: "Known for dimensional colour and healthy shine, Kiara custom-blends tones to flatter skin undertones and lifestyle.",
    specialties: ["Balayage", "Glossing", "Gentle products"],
    vibeTags: ["Bold colour", "Soft luxe", "Trend-aware"],
    priceTier: "Luxe",
    rating: 4.8,
    reviewsCount: 142,
    nextAvailable: "Friday 09:00",
    locations: ["Cape Town"],
  },
  {
    id: "lebogang-maseko",
    name: "Lebogang Maseko",
    role: "Protective Styling Specialist",
    photo: "/gallery/g-3.jpg",
    bio: "Lebogang focuses on protective styling that keeps hair healthy and moisturised, with a calming, nurturing approach.",
    specialties: ["Protective styles", "Braids", "Scalp care"],
    vibeTags: ["Calm energy", "Protective care", "Gentle touch"],
    priceTier: "Essential",
    rating: 4.7,
    reviewsCount: 98,
    nextAvailable: "Saturday 11:15",
    locations: ["Johannesburg"],
  },
  {
    id: "zoe-van-der-merwe",
    name: "Zoë van der Merwe",
    role: "Hair Artist",
    photo: "/services/hair-1.jpg",
    bio: "Zoë delivers sculpted cuts, bouncy volume, and polished finishes for busy professionals who want effortless style.",
    specialties: ["Precision cuts", "Blowouts", "Bridal styling"],
    vibeTags: ["Editorial polish", "Fast & fabulous", "Bridal-ready"],
    priceTier: "Signature",
    rating: 4.8,
    reviewsCount: 121,
    nextAvailable: "Today 17:45",
    locations: ["Cape Town", "Pretoria"],
  },
];

export const services: Service[] = [
  {
    id: "wash-blow-dry",
    name: "Wash + Blow Dry",
    category: "Cuts & Styling",
    tier: "Essential",
    fromPriceZar: 230,
    priceRangeZar: [230, 550],
    durationMins: 60,
    outcome: "Soft, glossy movement with a shape that lasts for days.",
    includes: [
      "Clarifying cleanse + scalp refresh",
      "Heat-protective blow dry",
      "Finish with silk serum",
    ],
    prepNotes: ["Arrive with hair detangled if possible."],
    afterCare: ["Sleep on a silk scarf or pillowcase for longevity."],
    recommendedTherapistIds: ["amira-khan", "zoe-van-der-merwe"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "ladies-cut",
    name: "Ladies Cut (No Blow)",
    category: "Cuts & Styling",
    tier: "Essential",
    fromPriceZar: 220,
    priceRangeZar: [220, 450],
    durationMins: 45,
    outcome: "A precision cut tailored to your face shape and lifestyle.",
    includes: ["Consultation", "Dry or damp cut"],
    prepNotes: ["Come with hair in its natural texture for best shaping."],
    afterCare: ["Trim every 8–10 weeks to maintain shape."],
    recommendedTherapistIds: ["zoe-van-der-merwe"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "wash-cut-blow",
    name: "Wash + Cut + Blow Dry",
    category: "Cuts & Styling",
    tier: "Signature",
    fromPriceZar: 380,
    priceRangeZar: [380, 870],
    durationMins: 75,
    outcome: "Fresh cut, polished finish, and effortless movement.",
    includes: ["Cleanse + condition", "Precision cut", "Blow dry style"],
    prepNotes: ["Bring inspiration photos if you have a new look in mind."],
    afterCare: ["Use heat protectant for styling at home."],
    recommendedTherapistIds: ["amira-khan", "zoe-van-der-merwe"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "root-tint",
    name: "Root Tint / Tint",
    category: "Colour",
    tier: "Signature",
    fromPriceZar: 785,
    durationMins: 90,
    outcome: "Even, rich colour coverage with healthy shine.",
    includes: ["Colour consultation", "Root tint application", "Gloss rinse"],
    prepNotes: ["Skip washing 24 hours before for optimal colour deposit."],
    afterCare: ["Use colour-safe shampoo to maintain vibrancy."],
    recommendedTherapistIds: ["kiara-dlamini"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "half-head-highlights",
    name: "Half Head Foils / Highlights",
    category: "Colour",
    tier: "Signature",
    fromPriceZar: 895,
    priceRangeZar: [895, 1220],
    durationMins: 120,
    outcome: "Bright, sun-kissed dimension without the full commitment.",
    includes: ["Custom highlight placement", "Toner + gloss", "Finish style"],
    recommendedTherapistIds: ["kiara-dlamini"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "full-head-highlights",
    name: "Full Head Foils / Highlights",
    category: "Colour",
    tier: "Luxe",
    fromPriceZar: 1199,
    priceRangeZar: [1199, 1850],
    durationMins: 150,
    outcome: "All-over luminosity with dimensional, blended tones.",
    includes: ["Full foil placement", "Bond builder treatment", "Signature blow dry"],
    recommendedTherapistIds: ["kiara-dlamini"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "balayage",
    name: "Balayage",
    category: "Colour",
    tier: "Luxe",
    fromPriceZar: 1750,
    durationMins: 180,
    outcome: "Soft, blended colour that grows out beautifully.",
    includes: ["Hand-painted balayage", "Toner", "Moisture seal"],
    recommendedTherapistIds: ["kiara-dlamini", "amira-khan"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "balayage-root-colour",
    name: "Balayage + Root Colour",
    category: "Colour",
    tier: "Luxe",
    fromPriceZar: 2000,
    durationMins: 210,
    outcome: "Bright dimension plus refreshed roots for seamless colour.",
    includes: ["Balayage", "Root colour refresh", "Gloss + blow dry"],
    recommendedTherapistIds: ["kiara-dlamini"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning / Repair",
    category: "Treatments",
    tier: "Essential",
    fromPriceZar: 300,
    priceRangeZar: [300, 700],
    durationMins: 45,
    outcome: "Restores moisture, softness, and shine in one session.",
    includes: [
      "Protein + hydration mask",
      "Gentle, fragrance-light products",
      "Scalp massage",
    ],
    afterCare: ["Continue with a weekly mask at home."],
    recommendedTherapistIds: ["amira-khan", "lebogang-maseko"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "brazilian-smoothing",
    name: "Brazilian / Smoothing Treatment",
    category: "Treatments",
    tier: "Signature",
    fromPriceZar: 489,
    priceRangeZar: [489, 1200],
    durationMins: 120,
    outcome: "Smooths frizz and cuts styling time for weeks.",
    includes: ["Smoothing treatment", "Heat sealing", "Finish style"],
    prepNotes: ["Avoid colouring hair within two weeks of treatment."],
    recommendedTherapistIds: ["amira-khan", "zoe-van-der-merwe"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "braids-protective",
    name: "Braids / Protective Styling",
    category: "Protective Styles",
    tier: "Essential",
    fromPriceZar: 600,
    durationMins: 210,
    outcome: "Long-lasting protective style with scalp care built in.",
    includes: ["Scalp prep", "Protective style install", "Hydration finish"],
    prepNotes: ["Allow 3–4 hours depending on braid size."],
    recommendedTherapistIds: ["lebogang-maseko"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "wig-install",
    name: "Wig / Weave Installation",
    category: "Wigs & Weaves",
    tier: "Signature",
    fromPriceZar: 655,
    durationMins: 120,
    outcome: "Secure, natural-looking install with a flawless blend.",
    includes: ["Foundation braid down", "Install + trim", "Style finish"],
    recommendedTherapistIds: ["lebogang-maseko", "zoe-van-der-merwe"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "full-house-weave",
    name: "Full House Weave Install",
    category: "Wigs & Weaves",
    tier: "Luxe",
    fromPriceZar: 910,
    durationMins: 180,
    outcome: "Removal, wash, cornrows, and install in one visit.",
    includes: ["Weave removal", "Wash + treatment", "Cornrows", "Install + style"],
    recommendedTherapistIds: ["lebogang-maseko"],
    image: "/services/hair-1.jpg",
  },
  {
    id: "removal",
    name: "Weave / Wig Removal",
    category: "Wigs & Weaves",
    tier: "Essential",
    fromPriceZar: 105,
    durationMins: 30,
    outcome: "Safe removal with gentle detangling.",
    includes: ["Gentle removal", "Scalp refresh"],
    recommendedTherapistIds: ["lebogang-maseko"],
    image: "/services/hair-1.jpg",
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Cuts & Styling",
  "Colour",
  "Treatments",
  "Protective Styles",
  "Wigs & Weaves",
];

export const priceTiers: PriceTier[] = ["Essential", "Signature", "Luxe"];

export const formatZar = (value: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);

export const getServiceById = (id: string) =>
  services.find((service) => service.id === id);

export const getTherapistById = (id: string) =>
  therapists.find((therapist) => therapist.id === id);

export const getServicesByTherapist = (therapistId: string) =>
  services.filter((service) =>
    service.recommendedTherapistIds.includes(therapistId)
  );

export const getTherapistsForService = (serviceId: string) => {
  const service = getServiceById(serviceId);
  if (!service) return [];
  return therapists.filter((therapist) =>
    service.recommendedTherapistIds.includes(therapist.id)
  );
};
