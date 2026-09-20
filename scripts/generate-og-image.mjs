/**
 * Builds the Open Graph card at public/images/brand/og-default.jpg.
 *
 * This is the image every shared link renders - WhatsApp, Messages, Slack,
 * LinkedIn, Facebook, X - and for most people it is the first thing they see
 * of the site. It previously carried the brand mark on a flat gradient with no
 * words on it at all, which reads as an unfinished placeholder.
 *
 * The card is composed here rather than designed in a graphics tool so it can
 * be regenerated when the wording or the photograph changes:
 *
 *   node scripts/generate-og-image.mjs
 *
 * Output is 1200x630, the size every platform crops from. Text sits in the
 * left two-thirds because Messages and WhatsApp crop the right edge on narrow
 * screens; nothing that matters goes near an edge.
 *
 * Fonts are resolved from the operating system, so the rendered face is
 * whatever Georgia/Segoe UI map to on the machine that runs this. That is
 * acceptable for a single static asset checked in as a PNG - it is not part
 * of the build - but it is why the result is committed rather than generated
 * during CI, where those fonts may not exist.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photo = join(
  root,
  "public/images/properties/spacious-3br-house-waterloo/01-living-room.webp",
);
const target = join(root, "public/images/brand/og-default.jpg");

const W = 1200;
const H = 630;

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0b1a17" stop-opacity="0.96"/>
      <stop offset="52%"  stop-color="#0b1a17" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#0b1a17" stop-opacity="0.30"/>
    </linearGradient>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0b1a17" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0b1a17" stop-opacity="0.55"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#base)"/>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  <!-- Wordmark: the roofline chevron over a V, matching src/components/layout/logo.tsx -->
  <g transform="translate(72, 74)">
    <path d="M2 30 L21 17 L40 30" fill="none" stroke="#dcbb7e" stroke-width="5.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 38 L21 58 L33 38" fill="none" stroke="#faf8f4" stroke-width="5.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <text x="58" y="52" font-family="Georgia, 'Times New Roman', serif" font-size="40"
          fill="#faf8f4">Viora<tspan fill="#dcbb7e">Rental</tspan></text>
  </g>

  <text x="72" y="286" font-family="Georgia, 'Times New Roman', serif" font-size="66"
        fill="#faf8f4">Short-term rental</text>
  <text x="72" y="360" font-family="Georgia, 'Times New Roman', serif" font-size="66"
        fill="#faf8f4">co-hosting in Canada</text>

  <rect x="72" y="400" width="96" height="3" rx="1.5" fill="#cea057"/>

  <text x="72" y="452" font-family="'Segoe UI', Arial, sans-serif" font-size="26"
        fill="#e6e1d7">Guest support, listing optimisation and property</text>
  <text x="72" y="490" font-family="'Segoe UI', Arial, sans-serif" font-size="26"
        fill="#e6e1d7">operations - so owners do not have to.</text>

  <text x="72" y="556" font-family="'Segoe UI', Arial, sans-serif" font-size="22"
        fill="#a9a294" letter-spacing="2">KITCHENER &#183; WATERLOO REGION &#183; ONTARIO</text>
</svg>
`);

const card = await sharp(photo)
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([{ input: overlay, top: 0, left: 0 }])
  // A photograph, so JPEG rather than PNG: same card, a fifth of the bytes.
  .jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toBuffer();

await mkdir(dirname(target), { recursive: true });
await writeFile(target, card);

console.log(`Wrote ${target} (${(card.length / 1024).toFixed(0)} KB, ${W}x${H})`);
