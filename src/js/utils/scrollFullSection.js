// it was replaced by css scroll-snap functionaltiy: so far has worked quite well

export function scrollFullSection(){

    window.addEventListener('scroll', (e)=>{
        const sectionsToScroll = document.querySelectorAll("[data-scroll]")
        // console.log(e.currentTarget.scrollY);
        sectionsToScroll.forEach((section, index) =>{
            // console.log((section.getBoundingClientRect().top < 0));
            // console.log(section.getBoundingClientRect().bottom );/*  */
            if(section.getBoundingClientRect().top < 0 && section.getBoundingClientRect().bottom > 0 ){
                console.log('yes', section);
                  window.scroll(0, window.innerHeight) 
                window.scroll(0, window.innerHeight)

                console.log(section);
                if(window.scrollY){
                    // if(index > sectionsToScroll.length -2){
                    //         console.log('no return');
                    //         return
                         
                    //     }else{

                    //     } 
                        window.scroll(0, window.innerHeight) 
                }
                if(window.scrollY  < 0){
                    window.scroll(0, -window.innerHeight) 
                   
                }
                
            }
        })
    })
}
