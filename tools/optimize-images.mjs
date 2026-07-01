// Otimiza as imagens: re-codifica JPG -> AVIF (qualidade 48), limita a
// largura máxima a 1600px e remove todos os metadados EXIF (GPS, câmera, etc.).
// Gera cada .avif AO LADO do .JPG de origem, sem apagar nada. Processa em
// paralelo (AVIF é lento pra codificar) respeitando o nº de núcleos da CPU.
//
// Uso:
//   node tools/optimize-images.mjs            # processa tudo (pula os já feitos)
//   node tools/optimize-images.mjs --force    # re-gera mesmo se o destino existir
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { cpus } from "node:os";
import sharp from "sharp";

const IMAGES_DIR = fileURLToPath(new URL("../src/images/", import.meta.url));
const MAX_WIDTH = 1600;
const QUALITY = 48;
const EFFORT = 4; // 0-9: maior = menor arquivo, porém mais lento
const CONCURRENCY = Math.max(2, cpus().length);
const force = process.argv.includes("--force");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (/\.jpe?g$/i.test(e.name)) out.push(full);
  }
  return out;
}

const kb = (n) => (n / 1024).toFixed(0) + "KB";
const sources = await walk(IMAGES_DIR);

let done = 0,
  skipped = 0,
  srcBytes = 0,
  outBytes = 0;

async function optimizeOne(src) {
  const out = src.replace(/\.jpe?g$/i, ".avif");
  const srcSize = (await stat(src)).size;
  srcBytes += srcSize;

  if (!force && existsSync(out)) {
    outBytes += (await stat(out)).size;
    skipped++;
    return;
  }

  await sharp(src)
    .rotate() // aplica a orientação EXIF antes de descartar os metadados
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .avif({ quality: QUALITY, effort: EFFORT })
    .toFile(out);

  const outSize = (await stat(out)).size;
  outBytes += outSize;
  done++;
  const rel = src.split(/images[\\/]/)[1];
  console.log(`  ✓ ${rel.padEnd(52)} ${kb(srcSize).padStart(7)} -> ${kb(outSize).padStart(7)}`);
}

// Pool de concorrência simples
let cursor = 0;
async function worker() {
  while (cursor < sources.length) {
    await optimizeOne(sources[cursor++]);
  }
}
console.log(`Codificando ${sources.length} imagens em AVIF q${QUALITY} (${CONCURRENCY} em paralelo)...\n`);
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const pct = srcBytes ? (100 * (1 - outBytes / srcBytes)).toFixed(1) : 0;
console.log(`\nGeradas: ${done}  |  já existentes (puladas): ${skipped}`);
console.log(`JPG de origem: ${(srcBytes / 1024 / 1024).toFixed(1)}MB`);
console.log(`AVIF gerados : ${(outBytes / 1024 / 1024).toFixed(1)}MB`);
console.log(`Economia     : ${pct}%`);
