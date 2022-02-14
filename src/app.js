import {CarouselGenerator} from "./utils/carouselGenerator.js"
import {placesCardsData, photosHero1, galleryImages, dataTravel, photosHero2} from "./dataGallery/placesCard.js"
import { renderGallery } from "./renderGallery.js"
import {fullCarousel} from "./fullCarousel.js"
import { renderJournal } from "./renderJournal.js"

//utils
import {scrollFullSection} from "./utils/scrollFullSection.js"
import { typingEffect } from "./utils/typingEffect.js";
import {getFullYear} from "./utils/getFullYear.js"
import { backToTopBtn } from "./utils/backToTopBtn.js"


// ===== CAROUSEL HERO (left side)===== //

const carouselHero1 = new CarouselGenerator('hero-slider-1-wrapper', photosHero1, 10000)
carouselHero1.sliderAction = 'onSlide'
carouselHero1.renderType = 2
carouselHero1.slideChangeType = 'infinite'
carouselHero1.slideChangeOnClick()
carouselHero1.renderSlides('hero-slider', 'hero-slide-1')

// ===== CAROUSEL HERO (rigth side)===== //

const carouselHero2= new CarouselGenerator('hero-slider-2-wrapper', photosHero2,7000)
carouselHero2.sliderAction = 'onSlide';
carouselHero2.renderType = 2;
carouselHero2.slideChangeType = 'infinite';
carouselHero2.slideChangeOnClick();
carouselHero2.renderSlides('hero-slider', 'hero-slide-1')



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

// ===== CAROUSEL FULL IMAGES - image gallery ===== //
const scrollYSections = document.querySelectorAll('.scroll-y-section');
const aboutBtn = document.querySelector('.about-btn')
const travelRouteBtn = document.querySelector('.bussola-btn')
const scrollSnap = document.querySelector('#scroll-snap-wrapper')
const aboutCloseBtn = document.querySelector('.about-close-btn')
const travelCloseBtn = document.querySelector('.travel-close-btn')

aboutBtn.addEventListener('click', (e)=>{
    scrollYSections[0].style.left = '0'  
    document.body.classList.add('hide-scroll-bar')
    
    aboutCloseBtn.addEventListener('click', (e)=>{
        scrollYSections[0].style.left = '100vw'
        document.body.classList.remove('hide-scroll-bar')
        // scrollYSections[0].style.position = 'fixed'
    })
})
travelRouteBtn.addEventListener('click', (e)=>{
    scrollYSections[1].style.left = '0'

    travelCloseBtn.addEventListener('click', (e)=>{
        scrollYSections[1].style.left = '-100vw'
    })

})




