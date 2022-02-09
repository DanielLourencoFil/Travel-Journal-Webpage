import { dataTravel } from "./dataGallery/placesCard.js";

export function renderJournal(dataToRenderId = 0){
    const journalWrapper = document.getElementById('journal-wrapper')
    
    // console.log(dataTravel);
    Object.values(dataTravel).forEach((item) =>{
        // console.log(item.id);
        if(item.id == dataToRenderId){
            // console.log(dataToRenderId);
            // console.log(item.journal);

            journalWrapper.innerHTML = item.journal.map((diary, index) =>{
                // console.log(diary.alt);
                const {title, place, date, distance, img, text, alt} = diary
                  
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
             
            }).join('')
        }
    })

}