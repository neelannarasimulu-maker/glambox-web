import hair from "@/content/microsites/hair.json";
import nails from "@/content/microsites/nails.json";
import wellness from "@/content/microsites/wellness.json";

export type MicrositeConfig = {
  id: string;
  name: string;
  tagline: string;
  themeKey: string;
  heroImage: string;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta?: {
      label: string;
      href: string;
    };
    trustCues?: string[];
  };
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
  sections: {
    services: {
      title: string;
      subtitle: string;
      viewAllLabel: string;
      viewAllHref: string;
      featuredServiceIds: string[];
      cardCtaLabel: string;
      emptyState?: {
        title: string;
        body: string;
        cta?: {
          label: string;
          href: string;
        };
      };
    };
    therapists: {
      title: string;
      subtitle: string;
      viewAllLabel: string;
      viewAllHref: string;
      featuredTherapists: {
        therapistIds: string[];
        note?: string;
      };
      cardCtaLabel: string;
      emptyState?: {
        title: string;
        body: string;
        cta?: {
          label: string;
          href: string;
        };
      };
    };
    gallery: {
      title: string;
      subtitle: string;
      viewAllLabel: string;
      viewAllHref: string;
      teaserIds: string[];
      emptyState?: {
        title: string;
        body: string;
        cta?: {
          label: string;
          href: string;
        };
      };
    };
    shop: {
      title: string;
      subtitle: string;
      viewAllLabel: string;
      viewAllHref: string;
      teaserProductIds: string[];
      cardCtaLabel: string;
      emptyState?: {
        title: string;
        body: string;
        cta?: {
          label: string;
          href: string;
        };
      };
    };
    standards?: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        body: string;
      }>;
    };
  };
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
