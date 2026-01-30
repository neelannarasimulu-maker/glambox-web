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
<<<<<<< HEAD
      title={`Meet the ${config.name} team`}
      subtitle={`Browse therapists who specialise in ${config.name.toLowerCase()}.`}
=======
      title={therapistsPage?.title ?? `Meet the ${config.name} team`}
      subtitle={
        therapistsPage?.subtitle ??
        `Browse therapists who specialize in ${config.name.toLowerCase()}.`
      }
>>>>>>> 20b47dfc6c2a6890102e06fcf885000bf9876ba8
      showWorksIn={false}
    />
  );
}
