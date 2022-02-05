import { typingEffect } from "./utils/typingEffect.js";
import {scrollFullSection} from "./utils/scrollFullSection.js"
import {CarrouseGenerator, SliderCarrousel} from "./utils/carouselGenerator.js"
import {placesCardsData, photosHero1} from "./dataGallery/placesCard.js"



typingEffect()
scrollFullSection()

// ===== CAROUSEL PLACES CARS ===== //
const carouselPlacesCard = new CarrouseGenerator('places-card-carousel',placesCardsData)

carouselPlacesCard.slideChangeOnClick()
carouselPlacesCard.slideChangeType = 'linear'
carouselPlacesCard.slideLinearValue = 25.5 // 4 slides per time : display max-width design
carouselPlacesCard.renderSlides('places-wrapper', 'place-card')
// console.log(carouselPlacesCard);


//carousel hero

const carouselHero1 = new SliderCarrousel('hero-slider-wrapper', photosHero1)
console.log(carouselHero1);

carouselHero1.automatic = true
carouselHero1.interval = 5000
carouselHero1.renderSlides('hero-slider', 'hero-slide-1')
carouselHero1.slideChangeType = 'infinite'
carouselHero1.slideChangeOnClick()
console.log(carouselHero1.sliderContainer.getElementsByClassName('onSlide'));