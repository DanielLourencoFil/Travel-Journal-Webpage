export function scrollFullSection(){
    document.body.addEventListener('wheel', (e)=>{
        if(e.deltaY > 0){
            window.scroll(0, window.innerHeight) 
        }
        else{
            window.scroll(0, -window.innerHeight) 

        }
    })
}