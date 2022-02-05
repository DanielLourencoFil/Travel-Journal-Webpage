const photos = [
    {
        img: "./images/DSC_0029.JPG"
    },
    {
        img: "./images/DSC_0083 (2).JPG"
    },
    {
        img: "./images/DSC_0185.JPG"
    },
    {
        img: "./images/DSC_0083 (2).JPG"
    },
]
const photos2 = [
    {
        img: "./images/DSC_0195.JPG"
    },
    {
        img: "./images/DSC_0185.JPG"
    },
    {
        img: "./images/DSC_0196.JPG"
    },
    {
        img: "./images/DSC_0200.JPG"
    },
    {
        img: "./images/DSC_0210.JPG"
    },
]


// class SliderCarrousel {
//     constructor(sliderId, slidesArray, interval=0){
//         this.sliderContainer = document.getElementById(sliderId)
//         this.slides = slidesArray
//         this.slider // create at renderSlides()
//         this.slideCSS // passed in renderSlides()
        
//         this.interval = interval
//         this.automatic = interval === 0? false : true
        
//         this.changeType // set by type of change: "onClick" || "onScroll"
//         this.hasBtn = false

//         //if no interval or ZERO is passed the automatic change is disable
//         this.automatic = (interval === 0) ? false: true
//     }
//     //render slides without next buttons: change occur by click on image
//     renderSlides = (slideCarousel, slideCSS) =>{
//         this.slideCSS = slideCSS

//         this.slider = document.createElement('div')
//         this.slider.classList.add(slideCarousel)
//         this.sliderContainer.appendChild(this.slider)

//         this.slider = this.sliderContainer.querySelector(`.${slideCarousel}`)
        
//         this.slider.innerHTML = this.slides.map((slide,index) =>{

//             let position = "next"
//             if(index === 0) position = "active"
//             if(index === this.slides.length-1) position = "last"

//             return ` 
//             <article class="${!this.hasBtn && "onSlide"} ${this.slideCSS} ${position}">
//                 <img src="${slide.img}" class="img-slide " alt=""></img>
//             </article>
//             `
//         }).join('')
        
//         if(this.automatic){
//             console.log(this.automatic);
//             setInterval(()=>{
//                 this.sliderActionSlide(this.sliderContainer)
//             },this.interval)
//         }
//     }
    
//     slideChangeOnClick = () =>{
//         this.changeType = "onClick"
//         //action change on slide is default: IMPORTANT slides must have a "slide" class
//         let changerClass = "onSlide";
        
//         // if action change is on btns sets 'slide-btn' as default: IMPORTANT btns must have a "slide-btn" class
//         [...this.sliderContainer.children].forEach(children =>{
//             if(children.classList.contains('slide-btn')){
//                 this.hasBtn = true
//                 changerClass = "slide-btn"
//             }
//         });

//         //add eventListener to slides or btn
//         const slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]
        
//         slidesDom.forEach(slide=>{
//             slide.addEventListener('click', (e)=>{
//         // call slide action to slides or btn
//                 this.sliderAction(e.target)
//             })
//         })
//     }

//     //slide change on scroll
//     slideChangeOnScroll = ()=>{
//         this.changeType = "onScroll"
//         //action change on slide is default: IMPORTANT slides must have a "onSlide" class
//         let changerClass = "onSlide";

//         const slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]

//          this.slider.addEventListener('wheel', (e)=>{
//              this.sliderAction(e)
//          })
//     }
    
// /////////////////
// sliderAction = function (target){
        
//         let condition;
        
//         if(this.changeType === "onClick"){
//             let onClickCondition = target.classList.contains('prev-btn');
//             condition = onClickCondition    
//         }
//         if(this.changeType === "onScroll"){
//             let onScrollCondition = target.deltaY > 1;
//             condition = onScrollCondition    
//         }
                
//         //left-right diretion change
//         if(condition){
//             let active = this.slider.querySelector('.active')
//             let last = this.slider.querySelector('.last')
//             let next = last.previousElementSibling
            
//             if(!next){
//                 next = this.slider.lastElementChild
//             }
        
//             active.classList.remove(['active'])
//             active.classList.add(['next'])
        
//             last.classList.remove(['last'])
//             last.classList.add(['active'])
            
//             next.classList.remove(['next'])
//             next.classList.add(['last'])
//         }
//         // single direction change / if "next-btn" right-left change
//         else{
//             let active = this.slider.querySelector('.active')
//             let last = this.slider.querySelector('.last')
//             let next = active.nextElementSibling
            
//             if(!next){
//                 next = this.slider.firstElementChild
//             }
        
//             active.classList.remove(['active'])
//             active.classList.add(['last'])
        
//             last.classList.remove(['last'])
//             last.classList.add(['next'])
            
//             next.classList.remove(['next'])
//             next.classList.add(['active'])
//         }
//     }
//     //new possible ways for slide actions: ie. linear carousel
//     // for futher code...
// }

// const slider1 = new Slider('slider1', photos, 3000)
// const slider1 = new SliderCarrousel('slider1', photos2)

// slider1.renderSlides('slider-wrapper-full', 'slide-full')
// // slider1.slideChangeOnScroll()
// slider1.slideChangeOnClick()
// console.log(slider1);


const cards = [
    {
        img: "./images/DSC_0195.JPG",
        place: "MÉXICO",
        title: "Tοda jornada tem um começo!"
    },
    {
        img: "./images/DSC_0185.JPG",
        place: "CENTRAL AMERICA",
        title: "On the road to the Jungle"
    },
    {
        img: "./images/DSC_0196.JPG",
        place: "COLOMBIA",
        title: "Almost like Home"
    },
    {
        img: "./images/DSC_0200.JPG",
        place: "ECUADOR",
        title: "Game changer"
    },
    {
        img: "./images/DSC_0195.JPG",
        place: "MÉXICO",
        title: "Tοda jornada tem um começo!"
    },
    {
        img: "./images/DSC_0185.JPG",
        place: "CENTRAL AMERICA",
        title: "On the road to the Jungle"
    },
    {
        img: "./images/DSC_0196.JPG",
        place: "COLOMBIA",
        title: "Almost like Home"
    },
    {
        img: "./images/DSC_0200.JPG",
        place: "ECUADOR",
        title: "Game changer"
    },
    
]


class SliderCarrouselCard {
    constructor(sliderId, slidesArray, interval=0){
        this.sliderContainer = document.getElementById(sliderId)
        this.slides = slidesArray
        this.slidesDom; // created when slidesChangeOnClick || slidesChangeOnScroll are called

        this.slider // create at renderSlides() - inner Container
        this.slideCSS // passed in renderSlides()
        
        this.interval = interval
        this.automatic = interval === 0? false : true
        
        this.changeType // set by type of change: "onClick" || "onScroll"
        this.slideChangeType = "circular" // default || "linear"
        this.slideLinearValue = 100; // default
        this.hasBtn = false
        
        this.counter = 0    
        //if no interval or ZERO is passed the automatic change is disable
        this.automatic = (interval === 0) ? false: true
    }
    //render slides without next buttons: change occur by click on image
    renderSlides = (slideCarousel, slideCSS) =>{
        this.slideCSS = slideCSS

        this.slider = document.createElement('div')
        this.slider.classList.add(slideCarousel)
        this.sliderContainer.appendChild(this.slider)

        this.slider = this.sliderContainer.querySelector(`.${slideCarousel}`)
        
        this.slider.innerHTML = this.slides.map((slide,index) =>{

            let position = "next"
            let hideSlide = ''

            if(index === 0) position = "active"
            if(index === this.slides.length-1) position = "last"
            if(index === this.slides.length/2) hideSlide = "hide-slide"
            

            return `
             <article class="${!this.hasBtn && "onSlide"} ${this.slideCSS} ${position} ${hideSlide}">
                <p class="country-name">${slide.place}</p>
                <h2 class="country-title">${slide.title}</h2>
                <div class="underline"></div>
                <p class="gallery-card"><i class="far fa-images gallery-card-icon"></i>Gallery</p>
                <p class="diary-card" ><i class="fas fa-book diary-card-icon"></i>Diary</p>
            </article>
           
            `
        }).join('')
        
///////////////////
        if(this.slideChangeType === 'linear'){
            console.log('from linear change');
            this.slider.querySelectorAll('.place-card').forEach((slide,i)=>{
                let slideAmount = `${i*this.slideLinearValue}%` 
                slide.style.left = slideAmount
                
            })
        }

///////////////////////
        if(this.automatic){
            console.log(this.automatic);
            setInterval(()=>{
                this.sliderActionSlide(this.sliderContainer)
            },this.interval)
        }
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
                if(this.slideChangeType === "circular"){
                this.sliderActionCircular(e.target)
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
            if(this.slideChangeType === "circular"){
            this.sliderActionCircular(e)
            }
            if(this.slideChangeType === "linear"){
            this.sliderActionLinear(e)
            }
        })
    }
    
/////////////////
sliderActionCircular = (target) =>{
        console.log('from cicular');
        let condition;
        
        if(this.changeType === "onClick"){
            let onClickCondition = target.classList.contains('prev-btn');
            condition = onClickCondition    
        }
        if(this.changeType === "onScroll"){
            let onScrollCondition = target.deltaY > 1;
            condition = onScrollCondition    
        }
                
        //left-right diretion change
        if(condition){
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
        // single direction change / if "next-btn" right-left change
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
    //new possible ways for slide actions: ie. linear carousel
    // for futher code...
    
    sliderActionLinear = (e)=>{
        console.log('from line');
        let numberOfSlidesToShow = this.slides.length/2
        
        // add css classes for fading effect


        if(e.parentElement.classList.contains('next-btn')){
            this.counter++
            this.counter < numberOfSlidesToShow && this.counter >= 0 ? e.parentElement.disabled = false : e.parentElement.disabled = true
            this.slidesDom[0].disabled = false
            if(this.counter < 0) this.counter = 0
        } 
        if(e.parentElement.classList.contains('prev-btn')) {
            this.counter--

            this.counter < numberOfSlidesToShow && this.counter >= 0? e.parentElement.disabled = false : e.parentElement.disabled = true
            this.slidesDom[1].disabled = false
            if(this.counter < 0) this.counter = 0
        }
        
        this.slider.querySelectorAll('.place-card').forEach((slide, index)=>{

            if(index > (numberOfSlidesToShow-1 + this.counter) || index < this.counter){
                console.log(numberOfSlidesToShow-1 + this.counter, "counter =", this.counter);
                
                slide.classList.add("hide-slide")
            }
           
            else{
                slide.classList.remove("hide-slide")

            }


            // slide.style.transform = `translateX(-${(this.counter*103.5)}%) `0k
           slide.style.transform = `translateX(-${(this.counter*108.5)}%)  `

           slide.addEventListener('mouseover', ()=>{
             slide.style.transform = `translateX(-${(this.counter*108.5)}%) scale(1.1)  `   
            })
           slide.addEventListener('mouseout', ()=>{
             slide.style.transform = `translateX(-${(this.counter*108.5)}%) scale(1)  `   
            })
        })

    }
}

const placesCardCarousel = new SliderCarrouselCard("places-card-carousel", cards)
placesCardCarousel.slideChangeType = "linear"
// placesCardCarousel.slideLinearValue = 25.3;ok
placesCardCarousel.slideLinearValue = 25.5; //ok
placesCardCarousel.renderSlides('places-wrapper', 'place-card')
placesCardCarousel.slideChangeOnClick()
console.log(placesCardCarousel);
