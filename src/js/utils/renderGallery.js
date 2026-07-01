import { dataTravel } from "../infoToRender/placesCard.js"

const underConstructionCard = (place) => `
    <div class="under-construction">
        <p class="under-construction-icon">🚧</p>
        <p class="under-construction-title">${place} — coming soon</p>
        <p class="under-construction-text">Photos for this leg of the trip are on their way.</p>
    </div>
`

export function renderGallery(dataToRenderId = 0) {
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
                    alt="${alt}"
                    loading="lazy"
                    decoding="async"
                >
                <div class="image-info-wrapper">
                    <p class="photo-place">${imgPlace}</p>
                    <p class="photo-number">${index + 1}/${item.gallery.length}</p>
                </div>
            </article>
        `
    }).join('')
}
