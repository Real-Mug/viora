/**
 * Generates the placeholder imagery that ships with the site.
 *
 * These are lightweight SVGs, not stock photography: abstract, in the brand
 * palette, and obviously not a real room. That is the point - nobody should
 * mistake a placeholder for the property, and every one of them is meant to be
 * replaced with real photography before launch.
 *
 * Replacing an image is a straight swap: drop `01-living-room.jpg` into the
 * same folder and change the `file` value in src/content/properties.ts.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

/** Brand-derived palettes, keyed loosely to the kind of shot. */
const PALETTES = {
  exterior: ["#1e3a34", "#32594e", "#628e81", "#cdc6b9"],
  interior: ["#3a3631", "#5a544b", "#a9a294", "#e6e1d7"],
  kitchen: ["#284740", "#7d766a", "#cdc6b9", "#f2efe8"],
  bedroom: ["#23211e", "#5a544b", "#b98a4b", "#e6e1d7"],
  outdoor: ["#162b27", "#437063", "#8fb3a8", "#dcbb7e"],
  water: ["#0b1a17", "#284740", "#628e81", "#bcd3cc"],
  brand: ["#0b1a17", "#1e3a34", "#437063", "#b98a4b"],
};

function pick(slug, file) {
  const name = `${slug} ${file}`.toLowerCase();
  if (/lake|water|dock|bay/.test(name)) return PALETTES.water;
  if (/exterior|chalet|townhouse/.test(name)) return PALETTES.exterior;
  if (/kitchen|dining/.test(name)) return PALETTES.kitchen;
  if (/bedroom|sleeping/.test(name)) return PALETTES.bedroom;
  if (/deck|balcony|patio|hot-tub|garden/.test(name)) return PALETTES.outdoor;
  return PALETTES.interior;
}

/** A small deterministic hash so each image differs but stays stable per name. */
function hash(text) {
  let value = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

/**
 * Builds a horizon-like composition: a few soft bands, a light source and a
 * grain overlay. Abstract enough to read as "image pending", composed enough
 * to sit inside a premium layout without looking broken.
 */
function svg({ width, height, palette, seed, label }) {
  const [deep, mid, light, accent] = palette;
  const r = (n) => (hash(`${seed}${n}`) % 1000) / 1000;

  const horizon = height * (0.52 + r(1) * 0.16);
  const sunX = width * (0.18 + r(2) * 0.64);
  const sunY = horizon * (0.38 + r(3) * 0.3);
  const ridge1 = horizon - height * (0.06 + r(4) * 0.06);
  const ridge2 = horizon - height * (0.02 + r(5) * 0.04);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${deep}"/>
      <stop offset="62%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${light}"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${deep}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${(sunX / width).toFixed(3)}" cy="${(sunY / height).toFixed(3)}" r="0.55">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="${accent}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="${hash(seed) % 100}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer>
    </filter>
    <filter id="soften"><feGaussianBlur stdDeviation="${(height * 0.012).toFixed(1)}"/></filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>

  <g filter="url(#soften)" opacity="0.85">
    <path d="M0 ${ridge1.toFixed(0)} Q ${(width * 0.28).toFixed(0)} ${(ridge1 - height * 0.07).toFixed(0)} ${(width * 0.52).toFixed(0)} ${ridge1.toFixed(0)} T ${width} ${(ridge1 - height * 0.02).toFixed(0)} L ${width} ${height} L 0 ${height} Z" fill="${deep}" opacity="0.4"/>
    <path d="M0 ${ridge2.toFixed(0)} Q ${(width * 0.36).toFixed(0)} ${(ridge2 + height * 0.05).toFixed(0)} ${(width * 0.64).toFixed(0)} ${ridge2.toFixed(0)} T ${width} ${(ridge2 + height * 0.03).toFixed(0)} L ${width} ${height} L 0 ${height} Z" fill="${deep}" opacity="0.55"/>
  </g>

  <rect y="${horizon.toFixed(0)}" width="${width}" height="${(height - horizon).toFixed(0)}" fill="url(#ground)"/>
  <rect y="${horizon.toFixed(0)}" width="${width}" height="1.5" fill="${accent}" opacity="0.45"/>

  <rect width="${width}" height="${height}" filter="url(#grain)" opacity="0.5"/>
</svg>
`;
}

/**
 * Property photography is real and lives in the repo as WebP, exported from the
 * live Airbnb listings. Nothing here generates property images any more - this
 * map is intentionally empty so a stray run cannot resurrect the old sample
 * SVGs over real photos. Only the editorial and brand art below is generated.
 */
const propertyShots = {};

const editorial = [
  { path: "images/hero/home-hero.svg", w: 2000, h: 1200, palette: PALETTES.water, label: "Placeholder hero image" },
  { path: "images/hero/about-hero.svg", w: 2000, h: 1000, palette: PALETTES.exterior, label: "Placeholder image" },
  { path: "images/hero/host-hero.svg", w: 2000, h: 1000, palette: PALETTES.outdoor, label: "Placeholder image" },
  { path: "images/editorial/owner-workspace.svg", w: 1400, h: 1050, palette: PALETTES.interior, label: "Placeholder image" },
  { path: "images/editorial/turnover.svg", w: 1400, h: 1050, palette: PALETTES.kitchen, label: "Placeholder image" },
  { path: "images/editorial/canadian-landscape.svg", w: 1600, h: 900, palette: PALETTES.water, label: "Placeholder image" },
];

async function write(relativePath, contents) {
  const target = join(publicDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
  return relativePath;
}

async function main() {
  const written = [];

  for (const [slug, shots] of Object.entries(propertyShots)) {
    for (const shot of shots) {
      const contents = svg({
        width: 1600,
        height: 1067,
        palette: pick(slug, shot),
        seed: `${slug}-${shot}`,
        label: "Placeholder property image",
      });
      written.push(await write(`images/properties/${slug}/${shot}.svg`, contents));
    }
  }

  for (const item of editorial) {
    const contents = svg({
      width: item.w,
      height: item.h,
      palette: item.palette,
      seed: item.path,
      label: item.label,
    });
    written.push(await write(item.path, contents));
  }

  // Brand assets.
  written.push(
    await write(
      "images/brand/logo.svg",
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 44" width="220" height="44" role="img" aria-label="VioraRental">
  <path d="M6 15 18 7l12 8" fill="none" stroke="#b98a4b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 18 18 34l7-16" fill="none" stroke="#1e3a34" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="42" y="29" font-family="Georgia, 'Times New Roman', serif" font-size="23" fill="#23211e">Viora<tspan fill="#9d7040">Rental</tspan></text>
</svg>
`,
    ),
  );

  written.push(
    await write(
      "favicon.svg",
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#1e3a34"/>
  <path d="M8 13.5 16 8l8 5.5" fill="none" stroke="#dcbb7e" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.5 16 16 25l4.5-9" fill="none" stroke="#faf8f4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    ),
  );

  console.log(`Generated ${written.length} placeholder assets under public/.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
