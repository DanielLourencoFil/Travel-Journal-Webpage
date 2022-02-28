import { renderJournal } from "./renderJournal.js"
import { renderGallery } from "./renderGallery.js"

export function carouselPlacesCardEventListener(carousel){
    const carouselPlacesCards = carousel.slider.children;
    
    [...carouselPlacesCards].forEach(slide=>{
    slide.addEventListener('click', e =>{
        if(e.target.classList.contains('journal-card') || e.target.classList.contains('gallery-card')){
            // const gallery = document.querySelector('#gallery')
            // gallery.innerHTML = ''
            renderJournal(slide.dataset.id)
            renderGallery(slide.dataset.id)
        }
    })
    });
    
}