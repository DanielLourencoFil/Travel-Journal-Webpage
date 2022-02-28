import {galleryClickEvent} from "./fullCarousel.js"
import { carouselPlacesCardEventListener } from "./carouselPlacesCardEventListener.js";

export function screenResize(carouselPlacesCard){
    const gallery = document.querySelector('#gallery')
    
    let hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');
     
    const placesWrapper = document.querySelector('.places-wrapper')
    
    const size = window.getComputedStyle(document.body, '::after').getPropertyValue('content');

    //== indentify if screen is mobile size vertical; then remove fullscreen carousel feature
    hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');
    if(hasfullCarousel.indexOf('full-slide') == -1){
        gallery.removeEventListener('click', galleryClickEvent) 
    }
    else{
        gallery.addEventListener('click', galleryClickEvent)
    }

    //== render new cards carousel based on screen width 
    if(size.indexOf("size-1-screen") != -1){
        placesWrapper && placesWrapper.remove()
        
        // 1 slides per time
        carouselPlacesCard.counter = 0 
        carouselPlacesCard.slidesLinearTranslation = 100
        carouselPlacesCard.slidesDisplayNumber = 1 
        carouselPlacesCard.slideLinearValue = 100 
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        carouselPlacesCard.slidesDom[0].disabled = true
        carouselPlacesCard.slidesDom[1].disabled = false
    
        carouselPlacesCardEventListener(carouselPlacesCard)
}
    if(size.indexOf("size-2-screen") != -1){
        placesWrapper && placesWrapper.remove()
        
        // 2 slides per time
        carouselPlacesCard.counter = 0 
        carouselPlacesCard.slidesLinearTranslation = 104.2
        carouselPlacesCard.slidesDisplayNumber = 2
        carouselPlacesCard.slideLinearValue = 50 
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        carouselPlacesCard.slidesDom[0].disabled = true
        carouselPlacesCard.slidesDom[1].disabled = false

        carouselPlacesCardEventListener(carouselPlacesCard)

    }
    if(size.indexOf("size-3-screen") != -1){
        placesWrapper && placesWrapper.remove()
        
        // 3 slides per time
        carouselPlacesCard.counter = 1 
        carouselPlacesCard.slidesLinearTranslation = 103.25
        carouselPlacesCard.slideLinearValue = 33  
        carouselPlacesCard.slidesDisplayNumber = 3
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        carouselPlacesCard.slidesDom[0].disabled = true
        carouselPlacesCard.slidesDom[1].disabled = false

        carouselPlacesCardEventListener(carouselPlacesCard)
    }
    if(size.indexOf("size-4-screen") != -1){
        placesWrapper && placesWrapper.remove()

        // 4 slides per time
        carouselPlacesCard.counter = 1 
        carouselPlacesCard.slidesLinearTranslation = 106.5
        carouselPlacesCard.slideLinearValue = 25 
        carouselPlacesCard.slidesDisplayNumber = 4
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        carouselPlacesCard.slidesDom[0].disabled = true
        carouselPlacesCard.slidesDom[1].disabled = false

        carouselPlacesCardEventListener(carouselPlacesCard)
    }
}