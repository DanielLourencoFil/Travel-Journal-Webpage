import { renderJournal } from "./renderJournal.js"
import { renderGallery } from "./renderGallery.js"

export class CarouselGenerator {
    constructor(sliderId, slidesData, interval=0){
        this.sliderContainer = document.getElementById(sliderId)
        this.slides = slidesData

        this.slidesDom; // created when slidesChangeOnClick || slidesChangeOnScroll are called
        this.slidesDisplayNumber = 1
        this.slideIndex = 0
        this.slideGroupId; 
        this.slider // create at renderSlides() - inner Container
        this.slideCSS // passed in renderSlides()
        
        this.slideGeneralDataMap = true // default
        
        this.slidesDisplayNumber = 1 // number of slides displayed on carousel per time : can be 1; 2; 3; 4; 5
        this.slideLinearValue = 100; // default
        this.slidesLinearTranslation = 100 //default value for single slide displayed | two = 104.2 | three = 103.25 | four = 106.5
        this.changeType // set by type of change: "onClick" || "onScroll"
        this.slideChangeType = "infinite" // default || "linear"
        this.hasBtn = false
        this.sliderAction;
        
        this.counter = 0    
        this.interval = interval
        this.automatic = interval === 0? false : true

        this.renderType;
        this.changeDirection = false; //right-left direction
    }
    //render slides without next buttons: change occur by click on image
    renderSlides = (slideCarousel, slideCSS) =>{
        this.slideCSS = slideCSS
        this.slider = document.createElement('div')
        this.slider.classList.add(slideCarousel)
        this.sliderContainer.appendChild(this.slider)
        this.slider = this.sliderContainer.querySelector(`.${slideCarousel}`)
    
        /////////////////// type of render based on html temple and data needs    
        this.renderType == 1 && this.renderType1() 
        this.renderType == 2 && this.renderType2() 
        
    ///////////////////
        if(this.slideChangeType === 'linear'){
            this.slider.querySelectorAll('.place-card').forEach((slide,i)=>{
                let slideAmount = `${i*this.slideLinearValue}%` 
                slide.style.left = slideAmount
                
            })
        }
    ///////////////////////
        if(this.automatic){
            setInterval(()=>{
                this.sliderActionInfinite(this.sliderContainer)
            },this.interval)
        }
    }
    renderType1 = () =>{
    this.slider.innerHTML = this.slides.map((slide,index) =>{
        const {id, place, title, img, alt} = slide
            
            let position = "next"
            let hideSlide = ''

            if(this.slideIndex == 0){
                if(index == 0) position = "active"
                if(index == this.slides.length-1) position = "last"
            }
            
            if(this.slideIndex > 0 && index == this.slideIndex-1) position = "last"
            if(this.slideIndex > 0 && index == this.slideIndex) position = "active"

            if(index >= this.slidesDisplayNumber){
                hideSlide = "hide-slide"
            }

            return `
             <article class="${!this.hasBtn? "onSlide": ''} ${this.slideCSS} ${position} ${hideSlide}" data-id="${id}">
                <p class="country-name">${place}</p>
                <img src="${img}" alt="${alt}" class="country-map">
                <h2 class="country-title">${title}</h2>
                <a href="#gallery"><p class="gallery-card"><i class="far fa-images gallery-card-icon"></i>Gallery</p></a>
                <div class="underline"></div>
                <a href="#journal"><p class="journal-card" ><i class="fas fa-book diary-card-icon"></i>Diary</p></a>
            </article>
            `
    }).join('')

    }
    renderType2 = ()=>{
        let tempItem;
        Object.values(this.slides).forEach(item=>{
            const render =() =>{
                this.slider.innerHTML = tempItem.gallery.map((slide,index) =>{
                    const {imgSmall, imgLarge,imgDateUS,imgDateBR, imgPlace, alt} = slide;
                let position = "next"
                let hideSlide = ''
                if(this.slideIndex == 0){
                    if(index == 0) position = "active"
                    if(index == item.gallery.length-1) position = "last"
                }
                
                if(this.slideIndex > 0 && index == this.slideIndex-1) position = "last"
                if(this.slideIndex > 0 && index == this.slideIndex) position = "active"
                if(this.slidesDisplayNumber > 0 && index == this.slidesDisplayNumber){
                    hideSlide = "hide-slide"
                }

                return `
                <article class="slide ${!this.hasBtn && "onSlide"} ${this.slideCSS} ${position} ${hideSlide}">
                <img srcset="${imgSmall} 650w, ${imgLarge} 1500w"
                sizes="(min-width: 150px) 100vw, (min-width: 1000px) 90vw"
                src="${imgLarge}" class="img-slide " alt="${alt}">
                </img>
                <div class="img-info">
                <p class="photo-place">${imgPlace}</p>
                <p class="photo-date">${imgDateUS}</p>
                <p class="photo-number">${index+1}/${item.gallery.length}</p>
                </div>
                </article>
                `
            }).join('')
            }

            if(item.id == this.slideGroupId && this.slideGeneralDataMap === false ){
                tempItem = item
                render()
                return
            }    
            if(this.slideGeneralDataMap === true){
                tempItem = item
                render()
                return
            }
        })
    }
    slideChangeOnClick = () =>{
        this.changeType = "onClick"
        //action change on slide is default: IMPORTANT slides must have a "slide" class
        let changerClass = "onSlide";
        
        // if action change is on btns sets 'slide-btn' as default: IMPORTANT btns must have a "slide-btn" class
        [...this.sliderContainer.children].forEach(children =>{
            if(children.classList.contains('slide-btn')){
                this.hasBtn = true
                changerClass = "slide-btn"
            }
        });

        //add eventListener to slides or btn
        this.slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]
        
            this.slidesDom.forEach(slide=>{
                slide.addEventListener('click', (e)=>{
             // call slide action based on type of change:
                if(this.slideChangeType === "infinite"){
                this.sliderActionInfinite(e.target)
            }
            if(this.slideChangeType === "linear"){
                this.sliderActionLinear(e.target)
            }
                
            })
        })
    }
    //slide change on scroll
    slideChangeOnScroll = ()=>{
        this.changeType = "onScroll"
        //action change on slide is default: IMPORTANT slides must have a "onSlide" class
        let changerClass = "onSlide";

        this.slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]

            this.slider.addEventListener('wheel', (e)=>{
            // call slide action based on type of change:
            if(this.slideChangeType === "infinite"){
            this.sliderActionInfinite(e)
            }
            if(this.slideChangeType === "linear"){
            this.sliderActionLinear(e)
            }
        })
    }
    sliderActionInfinite = (target) =>{
        // let condition;
        if(this.changeType === "onClick"){
            this.changeDirection = target.parentElement.classList.contains('next-btn');
        }
        if(this.changeType === "onScroll"){
            this.changeDirection = target.deltaY > 0;
        }
                
        //Left-right diretion change || set changeDirection = true (also set the button or scroll direction by means of which the change will occur, ie, left btn or scroll up)
        if(this.changeDirection){
            let active = this.slider.querySelector('.active')
            let last = this.slider.querySelector('.last')
            let next = last.previousElementSibling
            
            if(!next){
                next = this.slider.lastElementChild
            }
        
            active.classList.remove(['active'])
            active.classList.add(['next'])
        
            last.classList.remove(['last'])
            last.classList.add(['active'])
            
            next.classList.remove(['next'])
            next.classList.add(['last'])
        }
        // single direction change / if "next-btn" => right-left change
        else{
            let active = this.slider.querySelector('.active')
            let last = this.slider.querySelector('.last')
            let next = active.nextElementSibling
            
            if(!next){
                next = this.slider.firstElementChild
            }
        
            active.classList.remove(['active'])
            active.classList.add(['last'])
        
            last.classList.remove(['last'])
            last.classList.add(['next'])
            
            next.classList.remove(['next'])
            next.classList.add(['active'])
        }
    }
    sliderActionLinear = (e)=>{
        let numberOfSlidesToShow = this.slidesDisplayNumber
        
        if(e.parentElement.classList.contains('next-btn')){
            this.counter++
            if(this.counter >= 1 && this.counter < this.slides.length-numberOfSlidesToShow){
                e.parentElement.disabled = false
                this.slidesDom[0].disabled = false
            }
            else{
                
                e.parentElement.disabled = true
                this.slidesDom[0].disabled = false
            }
        } 
        if(e.parentElement.classList.contains('prev-btn')) {
            this.counter--
            if(this.counter >= 1 && this.counter < this.slides.length-numberOfSlidesToShow){
                e.parentElement.disabled = false
                this.slidesDom[1].disabled = false
            }
            else{
                
                e.parentElement.disabled = true
                this.slidesDom[1].disabled = false
            }
        }
        
        this.slider.querySelectorAll('.place-card').forEach((slide, index)=>{
            if(index > (numberOfSlidesToShow-1 + this.counter) || index < this.counter){
                slide.classList.add("hide-slide")
            }
            else{
                slide.classList.remove("hide-slide")
            }
            
           slide.style.transform = `translateX(-${(this.counter*this.slidesLinearTranslation)}%) `


           slide.addEventListener('mouseover', ()=>{
             slide.style.transform = `translateX(-${(this.counter*this.slidesLinearTranslation)}%) scale(1.025)`   
            })
           slide.addEventListener('mouseout', ()=>{
             slide.style.transform = `translateX(-${(this.counter*this.slidesLinearTranslation)}%) scale(1)  `   
            })
        })
    }
    //new possible ways for slide actions: ie. linear carousel
    // for futher code...
}