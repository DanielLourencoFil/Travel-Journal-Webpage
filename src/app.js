// import {CardCarouselGenerator, PhotoCarouselGenerator} from "./utils/carouselGenerator.js"
import {CarouselGenerator} from "./utils/carouselGenerator.js"
import {placesCardsData, photosHero1, galleryImages, dataTravel} from "./dataGallery/placesCard.js"
import { renderGallery } from "./renderGallery.js"
import {fullCarousel} from "./fullCarousel.js"
import { renderJournal } from "./renderJournal.js"

//utils
import {scrollFullSection} from "./utils/scrollFullSection.js"
import { typingEffect } from "./utils/typingEffect.js";
import {getFullYear} from "./utils/getFullYear.js"
import { backToTopBtn } from "./utils/backToTopBtn.js"


// ===== CAROUSEL HERO (left side)===== //

const carouselHero1 = new CarouselGenerator('hero-slider-wrapper', photosHero1, 5000)
carouselHero1.sliderAction = 'onSlide'
carouselHero1.renderType = 2
carouselHero1.interval = 5000
carouselHero1.renderSlides('hero-slider', 'hero-slide-1')
carouselHero1.slideChangeType = 'infinite'
carouselHero1.slideChangeOnClick()

// ===== CAROUSEL HERO (rigth side)===== //


// ===== CAROUSEL PLACES CARDS ===== //
const carouselPlacesCard = new CarouselGenerator('places-card-carousel',dataTravel)
carouselPlacesCard.slideGeneralDataMap = true
carouselPlacesCard.slidesDisplayNumber = 4
carouselPlacesCard.renderType = 1
carouselPlacesCard.slideChangeOnClick()
carouselPlacesCard.slideChangeType = 'linear'
carouselPlacesCard.slideLinearValue = 25.5 // 4 slides per time : display max-width design
carouselPlacesCard.renderSlides('places-wrapper', 'place-card')

//===== RENDER IMAGES GALLERY after card selection / as default, the images related with the first card are rendered 

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

// ===== CAROUSEL FULL IMAGES - image gallery ===== //
fullCarousel('gallery')

////////////// UTILS
typingEffect()
backToTopBtn()
getFullYear()



