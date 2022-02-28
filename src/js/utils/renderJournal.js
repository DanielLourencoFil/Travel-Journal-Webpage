import { dataTravel } from "../infoToRender/placesCard.js";

let dataId;
export function renderJournal(dataToRenderId = 0, pageToRender = 0){
    const journalWrapper = document.getElementById('journal-wrapper')
    const journalPages = document.getElementById('journal-pages')
    dataId = dataToRenderId
    let pagination;

    journalPages.innerHTML = ''

    Object.values(dataTravel).forEach((item) =>{
        if(item.id == dataToRenderId){
            pagination = Math.ceil(item.journal.length/2)
            if(pagination > 1){
                for(let i = 0; i < pagination; i++){
                journalPages.innerHTML += `<a href="#journal"><span data-page="${i+1}">${i+1}</span></a>`
                }
                
            }
            
            journalWrapper.innerHTML = item.journal.map((diary, index) =>{
                const {title, place, date, distance, img, text, alt} = diary
                pagination = diary.length;

                if(index >= (pageToRender * 2) && index <= ((pageToRender*2)+1)){
                    return `
                    <article class="journal-text-wrapper" data-id=${index} >
                    <h3 class="journal-title">${title}</h3>
                    <div class="journal-info">
                    <p class="journal-data">${date}</p>  
                    <p class="journal-location">${place}</p>  
                    <p class="journal-distance">${distance}</p>  
                    </div>
                    <p class="journal-text"><img class="journal-image" src="${img}" alt="${alt}">${text}</p>
                    </article>
                    ` 
                }
            }).join('')
        }
    })
    
    
}
const journalPages = document.getElementById('journal-pages')
journalPages.addEventListener('click', (e)=>{
    if(e.target.getAttribute("data-page")){

        let page = parseInt(e.target.dataset.page) -1;
        renderJournal(dataId, page)
    }
})