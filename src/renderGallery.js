import { dataTravel } from "./dataGallery/placesCard.js"

export function renderGallery(dataToRenderId = 0){
    const gallery = document.querySelector('#gallery')
    //   console.log(dataTravel);

// console.log(dataTravel);
    Object.values(dataTravel).forEach((item) =>{
        // console.log(item.id);
        if(item.id == dataToRenderId){
            // console.log(dataToRenderId);
            // console.log(item.journal);

            gallery.innerHTML = item.gallery.map((place, index) =>{
                // console.log(diary.alt);
                // console.log(item.id, 'id');
                const {img, imgPlace, imgDate, alt} = place
                  
                   return `
                   <article class="gallery-image">
                    <img src="${img}" data-image-id="${index}" data-place-id="${item.id}" alt="${alt}">
                    </article>
                   ` 
             
            }).join('')
        }
    })




    // gallery.innerHTML = dataTravel.map((image, index)=>{
    //     return ` <article class="gallery-image">
    //     <img src="${image.img}" data-image-id="${index}" alt="">
    //             </article>`
    //         }).join('')
    
}