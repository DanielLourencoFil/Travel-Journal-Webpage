export function scrollFullSection(){
    document.body.addEventListener('wheel', (e)=>{
        const sectionsToScroll = document.querySelectorAll("[data-scroll]")
        console.log(sectionsToScroll);
        sectionsToScroll.forEach((section, index) =>{
            // console.log(section.getBoundingClientRect().bottom );/*  */
            if(section.getBoundingClientRect().top < 0 && section.getBoundingClientRect().bottom > 0){
               console.log(sectionsToScroll.length);
                // window.scroll(0, window.innerHeight)

                // console.log(section);
                if(e.deltaY > 0){
                    if(index > sectionsToScroll.length -2){
                            console.log('no return');
                            return
                         
                        }else{

                            window.scroll(0, window.innerHeight) 
                        } 
                }
                if(e.deltaY < 0){
                    window.scroll(0, -window.innerHeight) 
                   
                }
                
            }
        })
    })
}