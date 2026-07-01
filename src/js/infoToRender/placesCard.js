// Builder: expande os dados puros de travel-data.js na forma consumida pelos
// renderizadores. Os caminhos small/large da galeria são derivados por
// convenção a partir de { slug, n } — não são mais escritos à mão.
import { countries, heroSlides } from "./travel-data.js"

const IMG = "./images/"
const pad = (n) => String(n).padStart(2, "0")
const galleryPath = (slug, n, size) => `${IMG}${slug}/gallery/${slug}-${pad(n)}-${size}.avif`

export const dataTravel = countries.map((c) => {
    const country = { id: c.id, place: c.place, title: c.title, img: c.img, alt: c.alt }
    if (c.underConstruction) country.underConstruction = true

    country.gallery = (c.gallery || []).map((g) => ({
        imgSmall: galleryPath(c.slug, g.n, "small"),
        imgLarge: galleryPath(c.slug, g.n, "large"),
        imgPlace: g.place,
        imgDateUS: g.dateUS,
        imgDateBR: g.dateBR,
        alt: g.alt,
    }))
    country.journal = c.journal || []
    return country
})

export const photosHero2 = [{ id: 0, gallery: heroSlides }]
