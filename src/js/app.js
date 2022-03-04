//carousels
import {CarouselGenerator} from "./utils/carouselGenerator.js"
import {fullCarousel} from "./utils/fullCarousel.js"

// event listeners
import {carouselPlacesCardEventListener} from "./utils/carouselPlacesCardEventListener.js"
import {fullCarouselRemoveEventListner} from "./utils/fullCarouselRemoveEventListner.js"
import { screenResize } from "./utils/screenResize.js"

//render functions
import { renderTimeline } from "./utils/renderTimeline.js"
import { renderJournal } from "./utils/renderJournal.js"
import { renderGallery } from "./utils/renderGallery.js"

//info to render
import {dataTravel, photosHero2} from "./infoToRender/placesCard.js"
import {timelineInfo} from "./infoToRender/timelineInfo.js"
import { iframeMapRender } from "./utils/iframeMapRender.js"

//utils
import { typingEffect } from "./utils/typingEffect.js"; // needs implementation
import {getFullYear} from "./utils/getFullYear.js"
import { backToTopBtn } from "./utils/backToTopBtn.js"



//===== LOADING SCREEN ===== //
//bugs with some mobiles : they never add class : settime out as a backup for such cases
const loader = document.querySelector('.loading')

document.addEventListener('DOMContentLoaded', ()=>{
    loader.classList.add('hide-loader')
})
setTimeout(function(){
    loader.classList.add('hide-loader')
},3000)

//==== iframe render after whole page is loaded
iframeMapRender()

//===== CAROUSEL Photos HERO ===== //
const carouselHero2= new CarouselGenerator('hero-slider-2-wrapper', photosHero2,7000)
carouselHero2.sliderAction = 'onSlide';
carouselHero2.renderType = 2;
carouselHero2.slideChangeType = 'infinite';
carouselHero2.slideChangeOnClick();
carouselHero2.renderSlides('hero-slider', 'hero-slide')


// ===== CAROUSEL PLACES CARDS ===== //
const carouselPlacesCard = new CarouselGenerator('places-card-carousel',dataTravel)
carouselPlacesCard.renderType = 1
carouselPlacesCard.slideChangeOnClick()
carouselPlacesCard.slideChangeType = 'linear'

//=== change carousel cards based on screen rezise and mobile change to horizontal screen orientation
window.addEventListener('resize',()=>{
    screenResize(carouselPlacesCard)
})
//=== default 
screenResize(carouselPlacesCard)
//=== add eventlistener to render gallery and journal by clicking on card
carouselPlacesCardEventListener(carouselPlacesCard)

//===== RENDER IMAGES GALLERY after card selection / as default, the images related with the first card are rendered 
window.onload = ()=>{
console.log('rendering gallery and journal');
    renderGallery()
    renderJournal()
   
    // ===== CAROUSEL FULL IMAGES - image gallery ===== //
    
    // fullCarousel('gallery')
    
    //=== mobiles with vertical screen orientation don't need fullScreen photos carousel
    // fullCarouselRemoveEventListner()
    
}

// =====   ABOUT - ROUTE - TIMETABLE - CONTACT - sections ===== //
const scrollYSections = document.querySelectorAll('.scroll-y-section');
const contactSection = document.querySelector('.contact-wrapper')

//== ABOUT
const aboutBtn = document.querySelector('.about-btn')
const aboutCloseBtn = document.querySelector('.about-close-btn')

aboutBtn.addEventListener('click', (e)=>{
    scrollYSections[0].style.display = 'block'
    
    setTimeout(()=> scrollYSections[0].style.left = '0'
,100)
    
    //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section  
    document.body.classList.add('hide-scroll-bar')

    // get the time for the transition effect
    let time = window.getComputedStyle(scrollYSections[0]).getPropertyValue('transition')
    time = parseInt(time.split(' ')[1].split('s')[0]);
    
    aboutCloseBtn.addEventListener('click', (e)=>{
        scrollYSections[0].style.left = '100vw'
        setTimeout(()=> scrollYSections[0].style.display = 'none'
,time*1000)

        // add back Y-scroll to body    
        document.body.classList.remove('hide-scroll-bar')

    })
})

//== TRAVEL ROUTE 
const travelRouteBtn = document.querySelector('.bussola-btn')
const travelCloseBtn = document.querySelector('.travel-close-btn')
const travelRouteTimelineBtn = document.querySelector('.timeline-open-small-screen')

travelRouteBtn.addEventListener('click', (e)=>{
    // scrollYSections[1].style.left = '0'
    scrollYSections[1].classList.add('hide-timeline')
    scrollYSections[2].classList.add('show-timeline') // small screen width = 100vw; big screen width = -94vw 

    // scrollYSections[2].style.left = '-94vw' // wide screen

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
    
})
travelCloseBtn.addEventListener('click', (e)=>{
    scrollYSections[1].classList.remove('hide-timeline')
    scrollYSections[1].style.left = '-100vw'
    scrollYSections[2].classList.remove('show-timeline')
    // scrollYSections[2].style.left = '-100vw'

    // add back Y-scroll to body    
    document.body.classList.remove('hide-scroll-bar')
    
    // hide Y scroll bar to current section
    scrollYSections[1].classList.add('hide-scroll-bar')
})

travelRouteTimelineBtn.addEventListener('click', ()=>{
    scrollYSections[2].classList.add('show-timeline-small-screen')
    scrollYSections[2].classList.remove('show-timeline')

    timelineBtn.classList.add('hide-timeline-btn')
    timelineCloseBtn.classList.add('show-timeline-btn')

        document.body.classList.add('hide-scroll-bar')
})

//== TIMELINE

const timelineBtn = document.querySelector('.timeline-btn')
const timelineCloseBtn = document.querySelector('.timeline-close-btn')

timelineBtn.addEventListener('click', (e)=>{
    scrollYSections[2].classList.add('hide-timeline')

    //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section
    document.body.classList.add('hide-scroll-bar')

    //********* By default the Y scroll bar is hidden. Add it when the slide translation is over. It is necessary to avoid the unpleasant presence of the Y scroll bar while the slide is moving
    // get the time for the transition effect
    let time = window.getComputedStyle(scrollYSections[2]).getPropertyValue('transition')
    time = parseInt(time.split(' ')[1].split('s')[0]);
    
    // add a class to show the Y scroll bar after transition effect is over
    setTimeout(function() {
        scrollYSections[1].classList.remove('hide-scroll-bar')
        //hide open btn and show close btn
        timelineBtn.classList.add('hide-timeline-btn')
        timelineCloseBtn.classList.add('show-timeline-btn')
    }, time*1000)
    
})
timelineCloseBtn.addEventListener('click', (e)=>{
    console.log('close btn');
    scrollYSections[2].classList.remove('show-timeline-small-screen')
        scrollYSections[2].classList.remove('hide-timeline')

    // add back Y scroll to whole document body    
    document.body.classList.remove('hide-scroll-bar')
    
    // hide Y scroll bar to current section
    scrollYSections[2].classList.add('hide-scroll-bar')

    //show open btn and hide close btn
    timelineBtn.classList.remove('hide-timeline-btn')
    timelineCloseBtn.classList.remove('show-timeline-btn')
})

//************** TIMELINE ***************/
renderTimeline(timelineInfo)

//== CONTACT
const contactBtn = document.querySelector('.contact-btn')
const contactCloseBtn = document.querySelector('.contact-close-btn')

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


//************** SECONDARY FEATURES ***************/
// typingEffect()
backToTopBtn()
getFullYear()
