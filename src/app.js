import {CarouselGenerator} from "./utils/carouselGenerator.js"
import {placesCardsData, photosHero1, galleryImages, dataTravel, photosHero2} from "./dataGallery/placesCard.js"
import { renderGallery } from "./renderGallery.js"
import {fullCarousel, galleryClickEvent} from "./fullCarousel.js"
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
const gallery = document.getElementById('gallery')
let hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');

if(hasfullCarousel.indexOf('full-slide') == -1){
    gallery.removeEventListener('click', galleryClickEvent) 
        // console.log('yyyyyoooooooooooooo');
        // let removeEvent = true
        // fullCarousel('gallery', removeEvent)
}else{
    gallery.addEventListener('click', galleryClickEvent)
        // console.log('else from first ooooooo');

}

window.addEventListener('resize',()=>{
    screenSize()
})
screenSize()

function screenSize(){
    const cardsWrapper = document.querySelector('.places-wrapper')
    const size = window.getComputedStyle(document.body, '::after').getPropertyValue('content');
    // console.log(cardsWrapper);
    // const gallery = document.getElementById('gallery')
   
    hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');

    if(hasfullCarousel.indexOf('full-slide') == -1){
        gallery.removeEventListener('click', galleryClickEvent) 
        // console.log('full slide resize yyyyyyyyyyy');
        // let removeEvent = true
        // fullCarousel('gallery', removeEvent)
    }
    else{
        gallery.addEventListener('click', galleryClickEvent)
        // console.log('else esle yyyyyyyyy');

    }

    if(size.indexOf("size-1-screen") != -1){
        cardsWrapper && cardsWrapper.remove()
        // 1 slides per time
        carouselPlacesCard.slidesLinearTranslation = 100
        carouselPlacesCard.slidesDisplayNumber = 1 
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
        
        // let removeEvent = true
        // fullCarousel('gallery', removeEvent)
    }
    if(size.indexOf("size-2-screen") != -1){
        // console.log(size);
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

        // let removeEvent = false
        // fullCarousel('gallery', removeEvent)
    }
    if(size.indexOf("size-4-screen") != -1){
        cardsWrapper && cardsWrapper.remove()
        // 4 slides per time
        carouselPlacesCard.slidesLinearTranslation = 106.5
        carouselPlacesCard.slideLinearValue = 25 
        carouselPlacesCard.slidesDisplayNumber = 4
        carouselPlacesCard.renderSlides('places-wrapper', 'place-card')

        // let removeEvent = false
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


// =====   ABOUT - ROUTE - CONTACT - sections ===== //
const scrollYSections = document.querySelectorAll('.scroll-y-section');
const contactSection = document.querySelector('.contact-wrapper')

const travelRouteBtn = document.querySelector('.bussola-btn')
const travelCloseBtn = document.querySelector('.travel-close-btn')

const aboutBtn = document.querySelector('.about-btn')
const aboutCloseBtn = document.querySelector('.about-close-btn')

const contactBtn = document.querySelector('.contact-btn')
const contactCloseBtn = document.querySelector('.contact-close-btn')
// const scrollSnap = document.querySelector('#scroll-snap-wrapper')

aboutBtn.addEventListener('click', (e)=>{
    scrollYSections[0].style.left = '0'
    
    //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section  
    document.body.classList.add('hide-scroll-bar')
    
    aboutCloseBtn.addEventListener('click', (e)=>{
        scrollYSections[0].style.left = '100vw'

        // add back Y scroll to whole document body    
        document.body.classList.remove('hide-scroll-bar')
    })
})

travelRouteBtn.addEventListener('click', (e)=>{
    scrollYSections[1].style.left = '0'
    //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section
    document.body.classList.add('hide-scroll-bar')

    //********* By default the Y scroll bar is hidden. Add it when the slide translation is over. It is necessary to avoid the unpleasant presence of the Y scroll bar while the slide is moving
    // get the time for the transition effect
    let time = window.getComputedStyle(scrollYSections[1]).getPropertyValue('transition')
    time = parseInt(time.split(' ')[1].split('s')[0]);
    
    // add a class to show the Y scroll bar after transition effect is over
    setTimeout(function() {
        scrollYSections[1].classList.remove('hide-scroll-bar')
    }, time*1000)
    
    travelCloseBtn.addEventListener('click', (e)=>{
        scrollYSections[1].style.left = '-100vw'
        
        // add back Y scroll to whole document body    
        document.body.classList.remove('hide-scroll-bar')
        
        // hide Y scroll bar to current section
        scrollYSections[1].classList.add('hide-scroll-bar')
    })
})

contactBtn.addEventListener('click', (e)=>{
    contactSection.classList.add('show-contact-section')
    document.body.classList.add('hide-scroll-bar')
    
    setTimeout(function(){
        contactSection.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
    },1000)
    
    contactCloseBtn.addEventListener('click', ()=>{
        document.body.classList.remove('hide-scroll-bar')

        contactSection.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        setTimeout(function(){
            contactSection.classList.remove('show-contact-section')
    },500)
    })
})



////////////// UTILS
// typingEffect()
backToTopBtn()
getFullYear()
