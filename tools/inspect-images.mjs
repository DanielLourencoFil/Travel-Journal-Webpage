// Inspeciona dimensões e tamanho de arquivo das imagens da galeria.
// Uso: node tools/inspect-images.mjs
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const IMAGES_DIR = fileURLToPath(new URL("../src/images/", import.meta.url));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(full);
  }
  return files;
}

const kb = (n) => (n / 1024).toFixed(0) + "KB";

const files = await walk(IMAGES_DIR);

// Amostra representativa: primeiros small/large de cada país + alguns avulsos
const sample = files.filter((f) =>
  /(mexico-01|central-america-01|colombia-01|ecuador-01)-(small|large)\.jpe?g$/i.test(f)
);

console.log(`Total de arquivos de imagem: ${files.length}\n`);
console.log("Amostra (dimensões x tamanho):");
for (const f of sample.sort()) {
  const { size } = await stat(f);
  const meta = await sharp(f).metadata();
  const rel = f.split(/images[\\/]/)[1];
  console.log(
    `  ${rel.padEnd(45)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)}  ${kb(size).padStart(7)}`
  );
}

// Estatística geral por tipo
let totalBytes = 0;
let maxW = 0;
const byExt = {};
for (const f of files) {
  const { size } = await stat(f);
  totalBytes += size;
  const ext = extname(f).toLowerCase();
  byExt[ext] = (byExt[ext] || 0) + 1;
  try {
    const meta = await sharp(f).metadata();
    if (meta.width > maxW) maxW = meta.width;
  } catch {}
}
console.log(`\nTotal em disco: ${(totalBytes / 1024 / 1024).toFixed(1)}MB`);
console.log(`Maior largura encontrada: ${maxW}px`);
console.log(`Por extensão:`, byExt);
