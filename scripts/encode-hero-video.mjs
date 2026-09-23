/**
 * Encodes a source clip into the two files the home hero expects.
 *
 *   node scripts/encode-hero-video.mjs <source> [--seconds 15] [--crossfade 0.8]
 *
 * Writes public/video/home-hero.mp4 (H.264) and .webm (VP9). Both are capped at
 * 1080p and stripped of audio entirely - the hero autoplays, and an autoplaying
 * clip with an audio track is refused by browsers and resented by people.
 *
 * WHY TWO FILES
 * VP9 is meaningfully smaller than H.264 at the same quality and every current
 * browser takes it; the MP4 is the fallback for older Safari. The <source>
 * order in hero-video.tsx puts WebM first so the smaller file wins where it can.
 *
 * SEAMLESS LOOP
 * Stock footage rarely starts and ends on the same frame, so a plain loop jumps.
 * --crossfade dissolves the last N seconds into the first N, which hides the
 * seam on the slow, drifting shots this hero wants. Pass --crossfade 0 to keep
 * the cut if the footage already loops cleanly.
 *
 * Re-run this whenever the footage changes; see README for the full recipe.
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "video");

const args = process.argv.slice(2);
const source = args.find((a) => !a.startsWith("--"));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(args[i + 1]);
};

if (!source || !existsSync(source)) {
  console.error(
    "Usage: node scripts/encode-hero-video.mjs <source> [--seconds 15]\n" +
      "       [--crossfade 0.8] [--fps 24] [--crf-mp4 26] [--crf-webm 36]",
  );
  console.error(source ? `Source not found: ${source}` : "No source file given.");
  process.exit(1);
}

const seconds = flag("seconds", 15);
const crossfade = flag("crossfade", 0.8);

/**
 * Quality knobs, as flags rather than edits, because the right value depends
 * entirely on the footage: dense foliage or water costs far more bits than a
 * still interior at the same CRF. Higher is smaller. Each +2 is roughly
 * 15-20% off the file.
 */
const crfMp4 = flag("crf-mp4", 26);
const crfWebm = flag("crf-webm", 36);

/**
 * Frame rate. A slow, drifting hero shot loses nothing at 24fps and costs
 * noticeably fewer bits than 30. Pass 0 to keep the source rate.
 */
const fps = flag("fps", 24);

function ffmpeg(label, args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: ["ignore", "inherit", "inherit"],
  });
  if (result.status !== 0) {
    console.error(`ffmpeg failed while writing ${label}`);
    process.exit(result.status ?? 1);
  }
}

/**
 * Scale to fit inside 1920x1080 without upscaling, and force even dimensions -
 * H.264 rejects odd ones.
 */
const scale =
  "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2" +
  (fps > 0 ? `,fps=${fps}` : "");

/**
 * Makes the clip loop without a visible cut.
 *
 * The trick is to dissolve the TAIL over the HEAD and then drop the tail, so
 * the finished clip both starts and ends on the same moment of the shot:
 *
 *   head  = 0 .. cf          the first moments, faded in under the tail
 *   body  = cf .. D-cf       the middle, untouched
 *   tail  = D-cf .. D        the last moments, faded out over the head
 *
 *   output = xfade(tail, head) + body        length D - cf
 *
 * The first frame is then the frame at D-cf, and so is the last, which is what
 * makes the wrap seamless. Blending the tail against its own neighbours - the
 * obvious reading of "crossfade the ends" - does nothing for looping, because
 * the clip still finishes on a frame the start knows nothing about.
 */
const loopFilter =
  crossfade > 0
    ? `[0:v]${scale},split=3[h][b][t];` +
      `[h]trim=0:${crossfade},setpts=PTS-STARTPTS[head];` +
      `[b]trim=${crossfade}:${seconds - crossfade},setpts=PTS-STARTPTS[body];` +
      `[t]trim=${seconds - crossfade}:${seconds},setpts=PTS-STARTPTS[tail];` +
      `[tail][head]xfade=transition=fade:duration=${crossfade}:offset=0[blend];` +
      `[blend][body]concat=n=2:v=1:a=0[v]`
    : `[0:v]${scale}[v]`;

mkdirSync(outDir, { recursive: true });

const mp4 = join(outDir, "home-hero.mp4");
const webm = join(outDir, "home-hero.webm");

console.log(`Encoding ${source} -> ${seconds}s, crossfade ${crossfade}s`);

ffmpeg("MP4", [
  "-i", source,
  "-t", String(seconds),
  "-filter_complex", loopFilter,
  "-map", "[v]",
  "-an",
  "-c:v", "libx264",
  "-profile:v", "high",
  "-crf", String(crfMp4),
  "-preset", "slow",
  "-pix_fmt", "yuv420p",
  // Puts the index at the front so playback can start before the full download.
  "-movflags", "+faststart",
  mp4,
]);

ffmpeg("WebM", [
  "-i", source,
  "-t", String(seconds),
  "-filter_complex", loopFilter,
  "-map", "[v]",
  "-an",
  "-c:v", "libvpx-vp9",
  "-crf", String(crfWebm),
  "-b:v", "0",
  "-row-mt", "1",
  "-deadline", "good",
  "-cpu-used", "2",
  webm,
]);

const kb = (p) => Math.round(statSync(p).size / 1024);

/**
 * A visitor downloads one of these, never both - the browser picks the first
 * <source> it can decode. So the number that matters to a page load is the
 * larger single file, not the sum. The sum is reported too, because it is what
 * the repository carries.
 */
const worst = Math.max(kb(mp4), kb(webm));
console.log(`  home-hero.mp4   ${kb(mp4)} KB`);
console.log(`  home-hero.webm  ${kb(webm)} KB`);
console.log(`  worst case for one visitor  ${worst} KB`);
console.log(`  added to the repository     ${kb(mp4) + kb(webm)} KB`);

if (worst > 3072) {
  console.warn(
    `\nOver the 3 MB budget for a single visitor. Re-run with a higher\n` +
      `--crf-mp4 / --crf-webm (currently ${crfMp4}/${crfWebm}; each +2 is\n` +
      `roughly 15-20% smaller), or shorten with --seconds.`,
  );
}
