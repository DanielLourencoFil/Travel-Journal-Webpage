import {CarouselGenerator, SliderCarousel} from "./utils/carouselGenerator.js"
import {placesCardsData, photosHero1, galleryImages, dataTravel} from "./dataGallery/placesCard.js"
import { renderGallery } from "./renderGallery.js"
import {fullCarousel} from "./fullCarousel.js"
import { renderJournal } from "./renderJournal.js"

//utils
import {scrollFullSection} from "./utils/scrollFullSection.js"
import { typingEffect } from "./utils/typingEffect.js";
import {getFullYear} from "./utils/getFullYear.js"
import { backToTopBtn } from "./utils/backToTopBtn.js"


// ===== CAROUSEL PLACES CARDS ===== //
const carouselPlacesCard = new CarouselGenerator('places-card-carousel',dataTravel)
carouselPlacesCard.slidesDisplayNumber = 4
carouselPlacesCard.slideChangeOnClick()
carouselPlacesCard.slideChangeType = 'linear'
carouselPlacesCard.slideLinearValue = 25.5 // 4 slides per time : display max-width design
carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
// console.log(carouselPlacesCard);


//carousel hero

const carouselHero1 = new SliderCarousel('hero-slider-wrapper', photosHero1, 5000)

// carouselHero1.automatic = true
carouselHero1.interval = 5000
carouselHero1.renderSlides('hero-slider', 'hero-slide-1')
carouselHero1.slideChangeType = 'infinite'
carouselHero1.slideChangeOnClick()
// console.log(carouselHero1);

//////////
//RENDER IMAGES GALLERY after card selection / as default, the images related with the first card are rendered 

renderGallery()
renderJournal()

const carouselPlacesCards = carouselPlacesCard.slider.children;

[...carouselPlacesCards].forEach(slide=>{
    slide.addEventListener('click', e =>{
        if(e.target.classList.contains('journal-card') || e.target.classList.contains('gallery-card')){
            // console.log(slide.dataset.id);
            renderJournal(slide.dataset.id)
            renderGallery(slide.dataset.id)
        }
    })
});


fullCarousel('gallery')

////////////// UTILS
typingEffect()
backToTopBtn()
getFullYear()

// scrollFullSection() // need fix





/*
function renderJournal(rootElementWrapper, dataRender){
    const journalWrapper = document.getElementById(rootElementWrapper)
    
    Object.values(dataRender).forEach((item) =>{
        console.log(item);
        if(item.id === 2){

            Object.values(item).forEach((place, index) =>{
               journalWrapper.innerHTML = place.journal.map((info,index) =>{
   
                   const {title, place, date, distance, img, text, alt} = info
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
               })
        }
    })

}
*/