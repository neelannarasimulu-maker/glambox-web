import hair from "@/content/microsites/hair.json";
import nails from "@/content/microsites/nails.json";
import wellness from "@/content/microsites/wellness.json";

export type MicrositeConfig = {
  id: string;
  name: string;
  tagline: string;
  themeKey: string;
  heroImage: string;
  about: {
    headline: string;
    body: string;
  };
  highlights?: Array<{
    title: string;
    body: string;
  }>;
  nav: Array<
    | string
    | {
        key: string;
        label: string;
        href: string;
      }
  >;
  featuredServiceIds: string[];
  featuredTherapistIds: string[];
  galleryTeaserIds?: string[];
  shopTeaserProductIds?: string[];
  cta?: {
    headline: string;
    body: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta?: {
      label: string;
      href: string;
    };
  };
};

const microsites = [hair, nails, wellness] as MicrositeConfig[];

export const getMicrosites = () => microsites;

export const getMicrosite = (id: string) =>
  microsites.find((microsite) => microsite.id === id);
