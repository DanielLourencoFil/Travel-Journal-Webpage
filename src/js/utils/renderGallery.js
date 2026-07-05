import { dataTravel } from "../infoToRender/placesCard.js"
import { L } from "../i18n/i18n.js"

let currentId = 0 // último país renderizado (para re-render ao trocar de idioma)

const underConstructionCard = (place) => `
    <div class="under-construction">
        <p class="under-construction-icon">🚧</p>
        <p class="under-construction-title">${place} — coming soon</p>
        <p class="under-construction-text">Photos for this leg of the trip are on their way.</p>
    </div>
`

export function renderGallery(dataToRenderId) {
    // sem argumento (ex.: re-render ao trocar idioma) reusa o país atual
    if (dataToRenderId === undefined) dataToRenderId = currentId
    else currentId = dataToRenderId

    const gallery = document.querySelector('#gallery')

    const item = dataTravel.find((place) => place.id == dataToRenderId)
    if (!item) return

    if (item.underConstruction || !item.gallery) {
        gallery.innerHTML = underConstructionCard(item.place)
        return
    }

    gallery.innerHTML = item.gallery.map((place, index) => {
        const { imgSmall, imgLarge, imgPlace, alt } = place

        return `
            <article class="gallery-image">
                <img
                    srcset="${imgSmall} 650w, ${imgLarge} 1500w"
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    src="${imgSmall}"
                    data-image-id="${index}"
                    data-place-id="${item.id}"
                    alt="${L(alt)}"
                    loading="lazy"
                    decoding="async"
                >
                <div class="image-info-wrapper">
                    <p class="photo-place">${L(imgPlace)}</p>
                    <p class="photo-number">${index + 1}/${item.gallery.length}</p>
                </div>
            </article>
        `
    }).join('')
}
