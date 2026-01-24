import TherapistDirectory from "@/components/microsite/TherapistDirectory";
import {
  getMicrositesForTherapist,
  getTherapists,
} from "@/lib/content/therapists";

export default function TherapistsPage() {
  const therapists = getTherapists();
  const worksIn = therapists.reduce<Record<string, string[]>>((acc, therapist) => {
    acc[therapist.id] = getMicrositesForTherapist(therapist.id);
    return acc;
  }, {});

  return <TherapistDirectory therapists={therapists} worksIn={worksIn} />;
}
