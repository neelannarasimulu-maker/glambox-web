import { notFound } from "next/navigation";
import TherapistDirectory from "@/components/microsite/TherapistDirectory";
import { getMicrosite } from "@/lib/content/microsite";
import {
  getMicrositesForTherapist,
  getTherapistsForMicrosite,
} from "@/lib/content/therapists";

export default async function MicrositeTherapistsPage({
  params,
}: {
  params: Promise<{ microsite: string }>;
}) {
  const { microsite } = await params;
  const config = getMicrosite(microsite);
  if (!config) {
    notFound();
  }

  const therapists = getTherapistsForMicrosite(config.id);
  const worksIn = therapists.reduce<Record<string, string[]>>((acc, therapist) => {
    acc[therapist.id] = getMicrositesForTherapist(therapist.id);
    return acc;
  }, {});
  const therapistsPage = config.therapistsPage;

  return (
    <TherapistDirectory
      therapists={therapists}
      worksIn={worksIn}
      themeKey={config.themeKey}
      title={therapistsPage?.title ?? `Meet the ${config.name} team`}
      subtitle={
        therapistsPage?.subtitle ??
        `Browse therapists who specialize in ${config.name.toLowerCase()}.`
      }
      showWorksIn={false}
    />
  );
}
