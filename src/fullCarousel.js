import { SliderCarousel } from "./utils/carouselGenerator.js";
import {dataTravel } from "./dataGallery/placesCard.js";

export function fullCarousel(rootElementId){
const gallery = document.getElementById(`${rootElementId}`)

    gallery.addEventListener('click', (e)=>{
        //generate Carousel full images
        const galleryFullCarousel = new SliderCarousel('gallery-full-carousel-wrapper', dataTravel)
        
        //set change type
        galleryFullCarousel.slideChangeType = "infinite"
        
        // console.log(galleryFullCarousel.slides)
        //after image click
        if(e.target){
            console.log(e.target);
            galleryFullCarousel.slideIndex = e.target.getAttribute('data-image-id')
            galleryFullCarousel.slideGroupId = e.target.getAttribute('data-place-id')
            console.log(galleryFullCarousel.slideGroupId);
        
            //remove class to hide-carousel: it is added below, after click "close-btn", to create a close effect 
            galleryFullCarousel.sliderContainer.classList.remove('hide-carousel')
            
            //bring carousel container to front of gallery
            galleryFullCarousel.sliderContainer.classList.add('show-carousel')
            
            //set position on window for carousel based on gallery position: to cover full width and height
            const sliderPosition = document.getElementById('gallery').getBoundingClientRect().top;
            galleryFullCarousel.sliderContainer.style.top = `${sliderPosition*-1}px`
            
            //render carousel into container
            galleryFullCarousel.renderSlides('gallery-full-carousel', 'full-carousel-image') 
        
            //set type of changing
            galleryFullCarousel.slideChangeOnScroll()
            
            //stop window scrolling in order to get the carousel in place and avoid conflict betwen scrolling change type
            document.body.classList.add('stop-scrolling')
            
            //add event listener to close btn
            const closeGalleryBtn = document.querySelector('#close-gallery')
            closeGalleryBtn.addEventListener('click', (e)=>{
                //recover window scrolling normal behaviour
                document.body.classList.remove('stop-scrolling')
                
                //remove carousel and set carousel container back under gallery   
                galleryFullCarousel.sliderContainer.classList.add('hide-carousel')
                setTimeout(function(){
                    galleryFullCarousel.sliderContainer.classList.remove('show-carousel')
                    galleryFullCarousel.slider.remove()
                }, 1000);
            
            })
        }
    })
}