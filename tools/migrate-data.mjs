// Migração one-time: lê o placesCard.js atual e gera travel-data.js compacto.
// A galeria de cada país passa a guardar só { n, place, dateUS, dateBR, alt }
// (o número real do arquivo), e os caminhos small/large são derivados por
// convenção no builder (placesCard.js). Prova por deep-equal que a expansão
// reproduz exatamente os dados originais antes de gravar nada.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const old = await import("../src/js/infoToRender/placesCard.js");
const { dataTravel, photosHero2 } = old;

const IMG = "./images/";
const pad = (n) => String(n).padStart(2, "0");
const galPath = (slug, n, size) => `${IMG}${slug}/gallery/${slug}-${pad(n)}-${size}.avif`;

// ---- deriva slug (nome da pasta) e número do arquivo a partir dos caminhos ----
function slugOf(c) {
  const first = c.gallery?.[0]?.imgSmall;
  if (typeof first === "string" && first.startsWith(IMG)) {
    const m = first.match(/^\.\/images\/(.+?)\/gallery\//);
    if (m) return m[1];
  }
  const m2 = c.img?.match(/^\.\/images\/maps\/(.+?)-map\.png$/);
  return m2 ? m2[1] : null;
}
const isRealGallery = (c) =>
  Array.isArray(c.gallery) && typeof c.gallery[0]?.imgSmall === "string" && c.gallery[0].imgSmall.startsWith(IMG);

// ---- constrói a forma compacta ----
const countries = dataTravel.map((c) => {
  const slug = slugOf(c);
  const base = { id: c.id, place: c.place, slug, title: c.title, img: c.img, alt: c.alt };
  if (c.underConstruction) base.underConstruction = true;

  if (isRealGallery(c)) {
    base.gallery = c.gallery.map((g) => {
      const m = g.imgSmall.match(new RegExp(`-(\\d+)-small\\.avif$`));
      assert(m, `não achei o número em ${g.imgSmall}`);
      return { n: parseInt(m[1], 10), place: g.imgPlace, dateUS: g.imgDateUS, dateBR: g.imgDateBR, alt: g.alt };
    });
    base.journal = c.journal || [];
  } else {
    // países "under construction": galeria/diário não são renderizados -> descarta o placeholder morto
    base.gallery = [];
    base.journal = [];
  }
  return base;
});

const heroSlides = photosHero2[0].gallery;

// ---- builder (mesma lógica que o placesCard.js novo vai usar) ----
function expand(countries) {
  return countries.map((c) => {
    const out = { id: c.id, place: c.place, title: c.title, img: c.img, alt: c.alt };
    if (c.underConstruction) out.underConstruction = true;
    out.gallery = (c.gallery || []).map((g) => ({
      imgSmall: galPath(c.slug, g.n, "small"),
      imgLarge: galPath(c.slug, g.n, "large"),
      imgPlace: g.place,
      imgDateUS: g.dateUS,
      imgDateBR: g.dateBR,
      alt: g.alt,
    }));
    out.journal = c.journal || [];
    return out;
  });
}

// ---- verificação: a expansão reproduz o original (só onde há dados reais) ----
const rebuilt = expand(countries);
let checked = 0;
for (const orig of dataTravel) {
  const now = rebuilt.find((r) => r.id === orig.id);
  if (isRealGallery(orig)) {
    assert.deepEqual(now.gallery, orig.gallery, `gallery divergente em ${orig.place}`);
    assert.deepEqual(now.journal, orig.journal || [], `journal divergente em ${orig.place}`);
    checked++;
  }
  assert.equal(now.place, orig.place);
  assert.equal(now.img, orig.img);
  assert.equal(!!now.underConstruction, !!orig.underConstruction);
}
console.log(`deep-equal OK: ${checked} países com dados reais reproduzidos identicamente.`);

// ---- grava travel-data.js ----
const banner = `// Dados da viagem (conteúdo puro). Caminhos de imagem da galeria são\n// derivados por convenção no placesCard.js a partir de { slug, n }.\n// Gerado uma vez por tools/migrate-data.mjs.\n`;
const body =
  banner +
  `\nexport const countries = ${JSON.stringify(countries, null, 2)};\n` +
  `\nexport const heroSlides = ${JSON.stringify(heroSlides, null, 2)};\n`;

const outPath = fileURLToPath(new URL("../src/js/infoToRender/travel-data.js", import.meta.url));
await writeFile(outPath, body, "utf8");
console.log(`travel-data.js gravado (${(body.length / 1024).toFixed(1)}KB).`);
