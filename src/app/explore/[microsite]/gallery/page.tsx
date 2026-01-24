import { notFound } from "next/navigation";
import GalleryGrid from "@/components/microsite/GalleryGrid";
import { getGalleryByMicrosite } from "@/lib/content/gallery";
import { getMicrosite } from "@/lib/content/microsite";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ microsite: string }>;
}) {
  const { microsite } = await params;
  const config = getMicrosite(microsite);
  const galleryData = getGalleryByMicrosite(microsite);

  if (!config || !galleryData) {
    notFound();
  }

  return <GalleryGrid data={galleryData} />;
}
