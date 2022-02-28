// it was replaced by css scroll-snap functionaltiy: 
// css scroll-snap is not working as expected; bugs when sections had no fix height, ie, gallery photos and jounal sections
//my intention is to use snap only for the hero and place cards section: So far i didn't it.
// this feature is to increase the user experience 

export function scrollFullSection(){

    window.addEventListener('scroll', (e)=>{
        const sectionsToScroll = document.querySelectorAll("[data-scroll]")
        sectionsToScroll.forEach((section, index) =>{
            
            if(section.getBoundingClientRect().top < 0 && section.getBoundingClientRect().bottom > 0 ){
                console.log('yes', section);
                  window.scroll(0, window.innerHeight) 
                window.scroll(0, window.innerHeight)

                console.log(section);
                if(window.scrollY){
                        window.scroll(0, window.innerHeight) 
                }
                if(window.scrollY  < 0){
                    window.scroll(0, -window.innerHeight) 
                   
                }
                
            }
        })
    })
}
