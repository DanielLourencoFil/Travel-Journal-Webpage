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
// carouselHero1.slideGeneralDataMap = true
carouselHero1.sliderAction = 'onSlide'
carouselHero1.renderType = 2
carouselHero1.slideChangeType = 'infinite'
carouselHero1.slideChangeOnClick()
carouselHero1.renderSlides('hero-slider', 'hero-slide-1')

// ===== CAROUSEL HERO (rigth side)===== //

const carouselHero2= new CarouselGenerator('hero-slider-2-wrapper', photosHero2,7000)
// carouselHero1.slideGeneralDataMap = true

carouselHero2.sliderAction = 'onSlide';
carouselHero2.renderType = 2;
carouselHero2.slideChangeType = 'infinite';
carouselHero2.slideChangeOnClick();
carouselHero2.renderSlides('hero-slider', 'hero-slide-1')



// ===== CAROUSEL PLACES CARDS ===== //
const carouselPlacesCard = new CarouselGenerator('places-card-carousel',dataTravel)
// carouselPlacesCard.slideGeneralDataMap = true
carouselPlacesCard.renderType = 1
carouselPlacesCard.slideChangeOnClick()
carouselPlacesCard.slideChangeType = 'linear'
// carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
// carouselPlacesCard.slidesDisplayNumber = 4
// carouselPlacesCard.slideLinearValue = 25.5 // 4 slides per time : display max-width design


//////////////////////////////////////////
window.addEventListener('resize',()=>{
    screenSize()
    // fullCarousel('gallery')
})
screenSize()

function screenSize(){
    const cardsWrapper = document.querySelector('.places-wrapper')
    console.log(cardsWrapper);
    const gallery = document.getElementById('gallery')
    const size = window.getComputedStyle(document.body, '::after').getPropertyValue('content');
    const hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');
    if(hasfullCarousel.indexOf('full-slide') == -1){
        console.log('yyyyyyyyyyyyyyyyy');
         let removeEvent = true
        fullCarousel('gallery', removeEvent)
    }
    else{
            fullCarousel('gallery')

    }

    if(size.indexOf("size-1-screen") != -1){
        cardsWrapper && cardsWrapper.remove()
        // 1 slides per time
        carouselPlacesCard.slidesLinearTranslation = 100
        carouselPlacesCard.slidesDisplayNumber = 1 
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        
        let removeEvent = true
        // fullCarousel('gallery', removeEvent)
    }
    if(size.indexOf("size-2-screen") != -1){
        console.log(size);
        cardsWrapper && cardsWrapper.remove()
        // 2 slides per time
        carouselPlacesCard.slidesLinearTranslation = 104.2
        carouselPlacesCard.slidesDisplayNumber = 2
        carouselPlacesCard.slideLinearValue = 50 
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        
        let removeEvent = false
        // fullCarousel('gallery')
    }
    if(size.indexOf("size-3-screen") != -1){
        cardsWrapper && cardsWrapper.remove()
        // 3 slides per time
        carouselPlacesCard.slidesLinearTranslation = 103.25
        carouselPlacesCard.slideLinearValue = 33  
        carouselPlacesCard.slidesDisplayNumber = 3
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')

        let removeEvent = false
        fullCarousel('gallery', removeEvent)
    }
    if(size.indexOf("size-4-screen") != -1){
        cardsWrapper && cardsWrapper.remove()
        // 4 slides per time
        carouselPlacesCard.slidesLinearTranslation = 106.5
        carouselPlacesCard.slideLinearValue = 25 
        carouselPlacesCard.slidesDisplayNumber = 4
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')

        let removeEvent = false
        // fullCarousel('gallery', removeEvent)
}
}



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
// fullCarousel('gallery')

////////////// UTILS
// typingEffect()
backToTopBtn()
getFullYear()

// =====   ABOUT - ROUTE - CONTACT - sections ===== //
const scrollYSections = document.querySelectorAll('.scroll-y-section');
const contactSection = document.querySelector('.contact-wrapper')
const travelRouteBtn = document.querySelector('.bussola-btn')
const aboutBtn = document.querySelector('.about-btn')
const contactBtn = document.querySelector('.contact-btn')
const aboutCloseBtn = document.querySelector('.about-close-btn')
const travelCloseBtn = document.querySelector('.travel-close-btn')
const contactCloseBtn = document.querySelector('.contact-close-btn')
// const scrollSnap = document.querySelector('#scroll-snap-wrapper')

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
    document.body.classList.add('hide-scroll-bar')
    
    travelCloseBtn.addEventListener('click', (e)=>{
        scrollYSections[1].style.left = '-100vw'
        document.body.classList.remove('hide-scroll-bar')
    })
})
contactBtn.addEventListener('click', (e)=>{
    document.body.classList.add('hide-scroll-bar')
    contactSection.classList.add('show-contact-section')
    setTimeout(function(){

        contactSection.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
    },750)
    
    document.body.classList.remove('hide-scroll-bar')
    contactCloseBtn.addEventListener('click', ()=>{

        contactSection.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        setTimeout(function(){
            contactSection.classList.remove('show-contact-section')
    },500)
    })
})






/*

// ===== CAROUSEL PLACES CARDS ===== //
const carouselPlacesCard = new CarouselGenerator('places-card-carousel',dataTravel)
carouselPlacesCard.slideGeneralDataMap = true
carouselPlacesCard.slidesDisplayNumber = 4
carouselPlacesCard.renderType = 1
carouselPlacesCard.slideChangeOnClick()
carouselPlacesCard.slideChangeType = 'linear'
carouselPlacesCard.slideLinearValue = 25.5 // 4 slides per time : display max-width design
carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
*/