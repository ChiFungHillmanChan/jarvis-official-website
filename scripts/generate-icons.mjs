/**
 * Generate JARVIS AI app icons using Gemini image generation.
 *
 * Usage:  node scripts/generate-icons.mjs
 * Requires: GEMINI_API_KEY in .env
 */
import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";

/* ── config ─────────────────────────────────────────────────── */

const MODEL = "gemini-3-pro-image-preview";
const OUTPUT_DIR = path.resolve("public");

const ICON_PROMPT = `Design a premium, minimal app icon for "JARVIS AI" — a native macOS desktop AI assistant for operators and engineers.

Requirements:
- Shape: a single rounded-square icon (like a macOS/iOS app icon), centered on transparent or void-dark (#09111b) background
- Core symbol: a stylised letter "J" or abstract AI brain-circuit motif that feels like Iron Man's JARVIS — sleek, intelligent, powerful
- Color palette: use cyan/electric-blue (#6fd3ff, #00B4FF) as the primary glow color against a very dark navy/void background (#09111b, #0f1723)
- Style: holographic glass-morphism with subtle depth, soft inner glow, clean edges — NO text other than the optional "J" letterform
- Mood: futuristic, corporate-tech, premium SaaS product — NOT cartoonish, NOT generic robot
- The icon must be recognisable at 16×16 pixels (favicon) and beautiful at 512×512 (PWA)
- NO gradients that become muddy at small sizes — keep contrast high
- Single icon only, no variations, no mockups, no device frames
- Output: square image, 1024×1024 pixels

Think of how Vercel, Linear, Raycast, or Arc design their app icons — clean, bold, instantly recognisable.`;

/* ── sizes to generate ──────────────────────────────────────── */

const SIZES = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192x192.png", size: 192 },
  { name: "icon-512x512.png", size: 512 },
];

/* ── main ───────────────────────────────────────────────────── */

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY — add it to your .env file");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(`Generating icon with ${MODEL}…`);

  const interaction = await ai.interactions.create({
    model: MODEL,
    input: ICON_PROMPT,
    response_modalities: ["image"],
  });

  const imageOutput = interaction.outputs?.find((o) => o.type === "image");
  if (!imageOutput?.data) {
    console.error("No image returned from Gemini. Full response:");
    console.error(JSON.stringify(interaction, null, 2));
    process.exit(1);
  }

  const rawBuffer = Buffer.from(imageOutput.data, "base64");

  // Trim dark padding so the icon fills the full square
  const trimmed = await sharp(rawBuffer).trim({ threshold: 15 }).toBuffer();
  const masterBuffer = await sharp(trimmed)
    .resize(1024, 1024, {
      fit: "contain",
      background: { r: 9, g: 17, b: 27, alpha: 1 },
    })
    .png()
    .toBuffer();

  const masterPath = path.join(OUTPUT_DIR, "icon-master.png");
  fs.writeFileSync(masterPath, masterBuffer);
  console.log(`  ✓ ${masterPath} (master 1024px, trimmed)`);

  for (const { name, size } of SIZES) {
    const outPath = path.join(OUTPUT_DIR, name);
    await sharp(masterBuffer)
      .resize(size, size, { fit: "cover", kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(outPath);
    console.log(`  ✓ ${outPath} (${size}×${size})`);
  }

  const ico16 = await sharp(masterBuffer).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(masterBuffer).resize(32, 32).png().toBuffer();
  const icoPath = path.join(OUTPUT_DIR, "favicon.ico");
  fs.writeFileSync(icoPath, createIco([ico16, ico32]));
  console.log(`  ✓ ${icoPath} (ICO with 16+32)`);

  console.log("\nDone! Icons saved to public/");
}

/**
 * Minimal ICO file builder from PNG buffers.
 * ICO format: 6-byte header → N * 16-byte directory entries → image data
 */
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;

  let dataOffset = headerSize + dirSize;
  const entries = [];

  for (const buf of pngBuffers) {
    entries.push({ buf, offset: dataOffset });
    dataOffset += buf.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4);

  const dirBufs = entries.map(({ buf, offset }, i) => {
    const size = i === 0 ? 16 : 32;
    const dir = Buffer.alloc(dirEntrySize);
    dir.writeUInt8(size === 256 ? 0 : size, 0);
    dir.writeUInt8(size === 256 ? 0 : size, 1);
    dir.writeUInt8(0, 2); // palette
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // color planes
    dir.writeUInt16LE(32, 6); // bits per pixel
    dir.writeUInt32LE(buf.length, 8);
    dir.writeUInt32LE(offset, 12);
    return dir;
  });

  return Buffer.concat([header, ...dirBufs, ...entries.map((e) => e.buf)]);
}

main();
