import { getMicrosite } from "@/lib/content/microsite";

export type Breadcrumb = {
  href: string;
  label: string;
};

const staticLabels: Record<string, string> = {
  explore: "Explore",
  book: "Book",
  therapists: "Therapists",
  services: "Services",
  gallery: "Gallery",
  shop: "Shop",
  ui: "UI Kit",
  auth: "Auth",
};

const toTitleCase = (segment: string) =>
  segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getLabelForSegment = (segment: string, parent?: string) => {
  if (staticLabels[segment]) {
    return staticLabels[segment];
  }

  const microsite = getMicrosite(segment);
  if (microsite && (parent === "explore" || parent === "book")) {
    return microsite.name;
  }

  return toTitleCase(segment);
};

export const getPathSegments = (pathname: string) =>
  pathname.split("/").filter(Boolean);

export const isMicrositePath = (pathname: string) => {
  const segments = getPathSegments(pathname);
  if (segments[0] !== "explore") {
    return false;
  }

  return Boolean(getMicrosite(segments[1] ?? ""));
};

export const buildBreadcrumbs = (pathname: string): Breadcrumb[] => {
  const segments = getPathSegments(pathname);
  const crumbs: Breadcrumb[] = [{ href: "/", label: "Home" }];

  let href = "";
  segments.forEach((segment, index) => {
    href += `/${segment}`;
    crumbs.push({
      href,
      label: getLabelForSegment(segment, segments[index - 1]),
    });
  });

  return crumbs;
};
