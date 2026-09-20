/**
 * Generates the raster assets that cannot be SVG.
 *
 * Open Graph and Twitter cards are rendered by servers that do not accept SVG,
 * and apple-touch-icon must be a PNG. Both are produced here with a minimal
 * PNG encoder built on Node's zlib, so the project needs no image dependency.
 *
 * These are brand-coloured placeholders. Replace them with a designed card
 * (1200x630) before launch - the OG image is the first impression of every
 * shared link.
 *
 * Run with: node scripts/generate-raster.mjs
 */
import { deflateSync } from "node:zlib";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

function crc32(buffer) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (const byte of buffer) crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const typeAndData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData));
  return Buffer.concat([length, typeAndData, crc]);
}

/** Encodes RGB pixel data (width * height * 3) as a PNG buffer. */
function encodePng(width, height, rgb) {
  const stride = width * 3;
  // Each scanline is prefixed with a filter byte; 0 means "no filter".
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const hex = (value) => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
];

const mix = (a, b, t) => a.map((channel, i) => Math.round(channel + (b[i] - channel) * t));

/**
 * Draws the brand mark: a roofline over a V, the same shape as the site logo.
 * Distance-to-line-segment gives clean strokes without an anti-aliasing library.
 */
function strokeDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function render(width, height, { scale = 1 } = {}) {
  const deep = hex("#0b1a17");
  const brand = hex("#1e3a34");
  const mid = hex("#437063");
  const brass = hex("#dcbb7e");
  const linen = hex("#faf8f4");

  const rgb = Buffer.alloc(width * height * 3);

  const cx = width / 2;
  const cy = height / 2;
  const unit = Math.min(width, height) * 0.22 * scale;

  // Mark geometry, in absolute pixels.
  const roof = [
    [cx - unit, cy - unit * 0.35],
    [cx, cy - unit * 0.95],
    [cx + unit, cy - unit * 0.35],
  ];
  const vee = [
    [cx - unit * 0.62, cy - unit * 0.05],
    [cx, cy + unit * 0.9],
    [cx + unit * 0.62, cy - unit * 0.05],
  ];
  const strokeWidth = Math.max(1.5, unit * 0.11);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      // Background: vertical gradient with a soft off-centre glow.
      const vertical = y / height;
      let colour = mix(deep, brand, Math.min(1, vertical * 1.25));

      const glow = Math.hypot((x - width * 0.68) / (width * 0.55), (y - height * 0.3) / (height * 0.7));
      colour = mix(colour, mid, Math.max(0, 0.42 - glow * 0.42));

      // Roofline in brass.
      const roofDistance = Math.min(
        strokeDistance(x, y, roof[0][0], roof[0][1], roof[1][0], roof[1][1]),
        strokeDistance(x, y, roof[1][0], roof[1][1], roof[2][0], roof[2][1]),
      );
      if (roofDistance < strokeWidth) {
        colour = mix(colour, brass, Math.min(1, (strokeWidth - roofDistance) / 1.6));
      }

      // V in linen.
      const veeDistance = Math.min(
        strokeDistance(x, y, vee[0][0], vee[0][1], vee[1][0], vee[1][1]),
        strokeDistance(x, y, vee[1][0], vee[1][1], vee[2][0], vee[2][1]),
      );
      if (veeDistance < strokeWidth * 1.15) {
        colour = mix(colour, linen, Math.min(1, (strokeWidth * 1.15 - veeDistance) / 1.6));
      }

      // Brass keyline along the bottom edge of the card.
      if (height > 200 && y > height - Math.max(4, height * 0.012)) {
        colour = brass;
      }

      const offset = (y * width + x) * 3;
      rgb[offset] = colour[0];
      rgb[offset + 1] = colour[1];
      rgb[offset + 2] = colour[2];
    }
  }

  return encodePng(width, height, rgb);
}

async function write(relativePath, buffer) {
  const target = join(publicDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, buffer);
  console.log(`  ${relativePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// The Open Graph card is no longer a flat brand mark: it is a composed card
// built from a real photograph by scripts/generate-og-image.mjs. Generating
// a placeholder here would overwrite it.
await write("images/brand/apple-touch-icon.png", render(180, 180, { scale: 1.5 }));
await write("images/brand/icon-512.png", render(512, 512, { scale: 1.4 }));
await write("images/brand/icon-192.png", render(192, 192, { scale: 1.4 }));
console.log("Raster placeholders generated.");
