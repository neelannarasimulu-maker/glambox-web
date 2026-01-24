# Hair content catalog

This folder is the single source of truth for the hair microsite. All services and therapist profiles are stored as JSON and loaded by `src/lib/content/hair.ts`.

## Adding or updating services
- Add a new entry in `services.json` under `services`.
- Use a unique `id` (kebab-case) because it becomes the URL slug at `/explore/hair/services/[serviceId]`.
- Use the `fromPriceZar` and `priceRangeZar` fields to keep pricing consistent. Prices are displayed as “from” values with optional ranges.
- Keep `recommendedTherapistIds` aligned with therapist `id` values in `therapists.json`.

## Adding or updating therapists
- Add a new entry in `therapists.json` under `therapists`.
- Use a unique `id` (kebab-case) because it becomes the URL slug at `/explore/hair/therapists/[therapistId]`.
- Include specialties, vibe tags, and locations to help services and booking flows display the right information.

## Pricing note
The `pricingNote` in `services.json` explains that prices are “from” values and may vary by hair length/thickness, consultation, or location. Update the note if the pricing policy changes.

## Call-to-action labels
- `view-details.json` stores the label for service detail CTAs.
- `view-profile.json` stores the label for therapist profile CTAs.
