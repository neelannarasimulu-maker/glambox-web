import hair from "@/content/gallery/hair.gallery.json";
import nails from "@/content/gallery/nails.gallery.json";
import wellness from "@/content/gallery/wellness.gallery.json";

export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
  tags: string[];
};

export type GalleryData = {
  microsite: string;
  items: GalleryItem[];
};

const galleryByMicrosite: Record<string, GalleryData> = {
  hair,
  nails,
  wellness,
};

export const getGalleryByMicrosite = (microsite: string) =>
  galleryByMicrosite[microsite];
