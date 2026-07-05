import { dataTravel } from "../infoToRender/placesCard.js";
import { L } from "../i18n/i18n.js"

const underConstructionCard = (place) => `
    <article class="journal-text-wrapper under-construction">
        <p class="under-construction-icon">🚧</p>
        <p class="under-construction-title">${place} — coming soon</p>
        <p class="under-construction-text">The journal for this leg of the trip is being written.</p>
    </article>
`

let dataId = 0; // país atual (para re-render ao trocar de idioma)
export function renderJournal(dataToRenderId, pageToRender = 0){
    // sem argumento (ex.: re-render ao trocar idioma) reusa o país atual
    if (dataToRenderId === undefined) dataToRenderId = dataId
    const journalWrapper = document.getElementById('journal-wrapper')
    const journalPages = document.getElementById('journal-pages')
    dataId = dataToRenderId

    journalPages.innerHTML = ''

    const item = dataTravel.find((it) => it.id == dataToRenderId)
    if (!item) return

    if (item.underConstruction || !item.journal) {
        journalWrapper.innerHTML = underConstructionCard(item.place)
        return
    }

    const pagination = Math.ceil(item.journal.length / 2)
    if (pagination > 1) {
        for (let i = 0; i < pagination; i++) {
            journalPages.innerHTML += `<a href="#journal"><span data-page="${i+1}">${i+1}</span></a>`
        }
    }

    journalWrapper.innerHTML = item.journal.map((diary, index) => {
        const { title, place, date, distance, img, text, alt } = diary

        if (index >= (pageToRender * 2) && index <= ((pageToRender * 2) + 1)) {
            return `
                <article class="journal-text-wrapper" data-id=${index}>
                    <h3 class="journal-title">${L(title)}</h3>
                    <div class="journal-info">
                        <p class="journal-data">${date}</p>
                        <p class="journal-location">${L(place)}</p>
                        <p class="journal-distance">${distance}</p>
                    </div>
                    <p class="journal-text"><img class="journal-image" src="${img}" alt="${L(alt)}" loading="lazy" decoding="async">${L(text)}</p>
                </article>
            `
        }
    }).join('')
}

const journalPages = document.getElementById('journal-pages')
journalPages.addEventListener('click', (e) => {
    if (e.target.getAttribute("data-page")) {
        let page = parseInt(e.target.dataset.page) - 1;
        renderJournal(dataId, page)
    }
})
