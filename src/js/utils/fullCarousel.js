// import { PhotoCarouselGenerator } from "./utils/carouselGenerator.js";
import { CarouselGenerator } from "./carouselGenerator.js";
import {dataTravel} from "../infoToRender/placesCard.js";

export const galleryClickEvent = (e, time)=>{
   
        //generate Carousel full images
        // const galleryFullCarousel = new PhotoCarouselGenerator('gallery-full-carousel-wrapper', dataTravel)
        const galleryFullCarousel = new CarouselGenerator('gallery-full-carousel-wrapper', dataTravel, time)
        galleryFullCarousel.slideGeneralDataMap = false
        
        // const playSlider = document.querySelector('#play-gallery-btn')
        // playSlider.addEventListener('click',()=>{
        //     console.log('jjjjjjjjjj');
            
        //     // galleryFullCarousel.interval = 1000
        //     // galleryFullCarousel.automatic = true
        //     galleryClickEvent(e, 5000)
        // })

        // console.log(galleryFullCarousel.interval);
        
        // set type of render function
        galleryFullCarousel.renderType = 2
        //set change type
        galleryFullCarousel.slideChangeType = "infinite"
        
        // console.log(galleryFullCarousel.slides)
        //after image click
        if(e.target){
            galleryFullCarousel.slideIndex = e.target.getAttribute('data-image-id')
            galleryFullCarousel.slideGroupId = e.target.getAttribute('data-place-id')
        
            //remove class to hide-carousel: it is added below, after click "close-btn", to create a close effect 
            galleryFullCarousel.sliderContainer.classList.remove('hide-carousel')
            
            //bring carousel container to front of gallery
            galleryFullCarousel.sliderContainer.classList.add('show-carousel')
            
            //set position on window for carousel based on gallery position: to cover full width and height
            const sliderPosition = document.querySelector('.main-wrapper').getBoundingClientRect().top;
            galleryFullCarousel.sliderContainer.style.top = `${sliderPosition*-1}px`
            
            //render carousel into container
            galleryFullCarousel.renderSlides('gallery-full-carousel', 'full-carousel-image') 
        
            //set type of changing
            galleryFullCarousel.slideChangeOnScroll()
            
            //stop window scrolling in order to get the carousel in place and avoid conflict betwen scrolling change type
            document.body.classList.add('stop-scrolling')
            // document.querySelector('#scroll-snap-wrapper').classList.add('stop-scrolling')
                       
            //add event listener to close btn
            const closeGalleryBtn = document.querySelector('#close-gallery-btn')
            closeGalleryBtn.addEventListener('click', (e)=>{
                //recover window scrolling normal behaviour
                document.body.classList.remove('stop-scrolling')
                
                //remove carousel and set carousel container back under gallery   
                galleryFullCarousel.sliderContainer.classList.add('hide-carousel')
                setTimeout(function(){
                    galleryFullCarousel.sliderContainer.classList.remove('show-carousel')
                    // document.querySelector('#scroll-snap-wrapper').classList.remove('stop-scrolling')
                    galleryFullCarousel.slider.remove()
                }, 1000);
            
            })
        }
    }

export function fullCarousel(rootElementId, removeEvent = false){
const gallery = document.getElementById(`${rootElementId}`)

gallery.addEventListener('click', galleryClickEvent)

// console.log('from carousel');
    // console.log(removeEvent);
    // if(removeEvent == true){
    //     gallery.removeEventListener('click', galleryClickEvent)
    //     console.log('ddddddddddd',gallery.removeEventListener('click', galleryClickEvent));
    // } 

}

