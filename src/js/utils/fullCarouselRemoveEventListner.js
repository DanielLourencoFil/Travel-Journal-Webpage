import {galleryClickEvent} from "./fullCarousel.js"

export function fullCarouselRemoveEventListner(){
    const gallery = document.getElementById('gallery')
    let hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');
    
    if(hasfullCarousel.indexOf('full-slide') == -1){
    gallery.removeEventListener('click', galleryClickEvent) 
        
    }else{
    gallery.addEventListener('click', galleryClickEvent)
    }
}