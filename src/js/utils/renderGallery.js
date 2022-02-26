import { dataTravel } from "../infoToRender/placesCard.js"

export function renderGallery(dataToRenderId = 0){
    const gallery = document.querySelector('#gallery')

    Object.values(dataTravel).forEach((item) =>{
        if(item.id == dataToRenderId){

            gallery.innerHTML = item.gallery.map((place, index) =>{
                const {img, imgPlace, imgDate, alt} = place
                  
                   return `
                   <article class="gallery-image">
                    <img src="${img}" data-image-id="${index}" data-place-id="${item.id}" alt="${alt}">
                    <div class="image-info-wrapper"
                    <p class="photo-place">${imgPlace}</p>
                    <p class="photo-number">${index+1}/${item.gallery.length}</p>
                    </div>
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