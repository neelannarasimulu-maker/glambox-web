import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const SIZE_MAP = {
  landing: { width: 2400, height: 1600, container: "microsite landing hero (full bleed)" },
  gallery: { width: 1500, height: 1000, container: "gallery cards (h-56/h-64)" },
  services: { width: 1500, height: 1000, container: "service cards/details (h-56)" },
  products: { width: 1200, height: 800, container: "shop cards/details (h-40/h-80)" },
  therapists: { width: 1500, height: 1000, container: "therapist cards (h-56)" },
};

// AI_IMAGE_BRIEFS.md is generated from this script; keep it out of version control.
const POPUP_AESTHETIC =
  "Glambox pop-up studio, modular stations, branded signage, curated props, warm neutral palette, soft diffused lighting, premium editorial styling.";
const UNIQUE_SEED = "Unique seed: {{seed}}.";

const dataSources = [
  {
    type: "landing",
    microsite: "hair",
    file: "src/content/microsites/hair.json",
    getItems: (data) => [data],
    getImage: (item) => item.heroImage,
    getPrompt: (item) =>
      `Landing hero image for ${item.name}: ${item.tagline} Editorial hair studio scene with luxe lighting, confident styling, and modern salon texture.`,
  },
  {
    type: "landing",
    microsite: "nails",
    file: "src/content/microsites/nails.json",
    getItems: (data) => [data],
    getImage: (item) => item.heroImage,
    getPrompt: (item) =>
      `Landing hero image for ${item.name}: ${item.tagline} Polished nail studio scene, clean surfaces, soft daylight, premium beauty editorial.`,
  },
  {
    type: "landing",
    microsite: "wellness",
    file: "src/content/microsites/wellness.json",
    getItems: (data) => [data],
    getImage: (item) => item.heroImage,
    getPrompt: (item) =>
      `Landing hero image for ${item.name}: ${item.tagline} Calm wellness lounge with layered textiles, warm neutrals, and restorative lighting.`,
  },
  {
    type: "gallery",
    microsite: "hair",
    file: "src/content/gallery/hair.gallery.json",
    itemsKey: "items",
    getPrompt: (item) =>
      `Hair artistry photo: ${item.caption} Tags: ${item.tags.join(", ")}. Premium salon lighting, polished finish, editorial focus on texture and shine.`,
  },
  {
    type: "gallery",
    microsite: "nails",
    file: "src/content/gallery/nails.gallery.json",
    itemsKey: "items",
    getPrompt: (item) =>
      `Luxury nail artistry photo: ${item.caption} Tags: ${item.tags.join(", ")}. Clean studio lighting, premium salon vibe, shallow depth of field.`,
  },
  {
    type: "gallery",
    microsite: "wellness",
    file: "src/content/gallery/wellness.gallery.json",
    itemsKey: "items",
    getPrompt: (item) =>
      `Wellness lounge scene: ${item.caption} Tags: ${item.tags.join(", ")}. Calm, restorative atmosphere, soft lighting, spa textures.`,
  },
  {
    type: "services",
    microsite: "hair",
    file: "src/content/services/hair.services.json",
    itemsKey: "services",
    getPrompt: (item) =>
      `Hair service visual for "${item.name}": ${item.outcome} Modern studio setting, focus on hair texture and finish, premium editorial styling.`,
  },
  {
    type: "services",
    microsite: "nails",
    file: "src/content/services/nails.services.json",
    itemsKey: "services",
    getPrompt: (item) =>
      `Nail service visual for "${item.name}": ${item.outcome} Clean, modern salon setting, focus on hands and nails, premium editorial style.`,
  },
  {
    type: "services",
    microsite: "wellness",
    file: "src/content/services/wellness.services.json",
    itemsKey: "services",
    getPrompt: (item) =>
      `Wellness service visual for "${item.name}": ${item.outcome} Calm treatment room, warm neutral palette, soft textiles, premium spa feel.`,
  },
  {
    type: "products",
    microsite: "hair",
    file: "src/content/products/hair.products.json",
    itemsKey: "products",
    getPrompt: (item) =>
      `Product still-life for "${item.name}": ${item.shortDesc} Haircare editorial styling, glossy reflections, clean background, soft shadows.`,
  },
  {
    type: "products",
    microsite: "nails",
    file: "src/content/products/nails.products.json",
    itemsKey: "products",
    getPrompt: (item) =>
      `Product still-life for "${item.name}": ${item.shortDesc} Clean background, soft shadows, premium beauty product styling.`,
  },
  {
    type: "products",
    microsite: "wellness",
    file: "src/content/products/wellness.products.json",
    itemsKey: "products",
    getPrompt: (item) =>
      `Product still-life for "${item.name}": ${item.shortDesc} Calm wellness aesthetic, natural props, soft daylight.`,
  },
  {
    type: "therapists",
    microsite: "hair",
    file: "src/content/therapists/therapists.json",
    itemsKey: "therapists",
    filter: (item) => item.roles.some((role) => role.toLowerCase().includes("hair")),
    getImage: (item) => item.photo,
    getPrompt: (item) =>
      `Portrait of a hair stylist: ${item.name}. ${item.bio} Modern salon portrait, warm premium lighting, confident and polished.`,
  },
  {
    type: "therapists",
    microsite: "nails",
    file: "src/content/therapists/therapists.json",
    itemsKey: "therapists",
    filter: (item) => item.roles.some((role) => role.toLowerCase().includes("nail")),
    getImage: (item) => item.photo,
    getPrompt: (item) =>
      `Portrait of a nail technician: ${item.name}. ${item.bio} Clean studio portrait, professional attire, warm premium lighting.`,
  },
  {
    type: "therapists",
    microsite: "wellness",
    file: "src/content/therapists/therapists.json",
    itemsKey: "therapists",
    filter: (item) => item.roles.some((role) => role.toLowerCase().includes("wellness")),
    getImage: (item) => item.photo,
    getPrompt: (item) =>
      `Portrait of a wellness consultant: ${item.name}. ${item.bio} Calm, grounded expression, spa-inspired backdrop, soft diffused light.`,
  },
];

const addPopupContext = (prompt) =>
  `${prompt} Popup aesthetic: ${POPUP_AESTHETIC} ${UNIQUE_SEED}`;

const readJson = async (relativePath) => {
  const fullPath = path.join(ROOT, relativePath);
  const raw = await fs.readFile(fullPath, "utf-8");
  return JSON.parse(raw);
};

const formatSize = (type) => {
  const size = SIZE_MAP[type];
  return `${size.width}x${size.height}px (3:2) • ${size.container}`;
};

const main = async () => {
  const rows = [];

  for (const source of dataSources) {
    const data = await readJson(source.file);
    const items = source.getItems ? source.getItems(data) : data[source.itemsKey] ?? [];
    for (const item of items) {
      if (source.filter && !source.filter(item)) continue;
      const image = source.getImage ? source.getImage(item) : item.image;
      rows.push({
        microsite: source.microsite,
        type: source.type,
        image,
        size: formatSize(source.type),
        prompt: addPopupContext(source.getPrompt(item)),
      });
    }
  }

  rows.sort((a, b) =>
    `${a.microsite}-${a.type}`.localeCompare(`${b.microsite}-${b.type}`),
  );

  const output = [
    "# AI Image Briefs (Nails + Wellness + Hair)",
    "",
    "Use the prompts below to generate images that match the container sizes in the UI.",
    "## Popup alignment + uniqueness",
    "",
    `- Every image should feel like a Glambox pop-up: ${POPUP_AESTHETIC}`,
    `- Replace {{seed}} in every prompt with a fresh unique token (timestamp or UUID) each time you run it in ChatGPT to force distinct outputs.`,
    "",
    "| Microsite | Usage | Image Path | Target Size | Prompt |",
    "| --- | --- | --- | --- | --- |",
    ...rows.map(
      (row) =>
        `| ${row.microsite} | ${row.type} | ${row.image} | ${row.size} | ${row.prompt} |`,
    ),
    "",
  ].join("\n");

  process.stdout.write(output);
};

main().catch((error) => {
  console.error("Failed to generate image briefs:", error);
  process.exit(1);
});
