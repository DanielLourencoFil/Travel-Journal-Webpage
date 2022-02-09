export function backToTopBtn(){
    const backToTopBtn = document.createElement('button')
    backToTopBtn.setAttribute('id', 'back-to-top-btn')
    backToTopBtn.innerHTML = `<a href="#places-cards"><i class="fas fa-bicycle bike-to-top-btn"></i></a>`
    backToTopBtn.disabled = true
    
    document.body.appendChild(backToTopBtn)

    const iconBtn = backToTopBtn.querySelector('i')
    window.addEventListener('scroll',(e)=>{
        if(window.scrollY > window.innerHeight*1.1){
            backToTopBtn.disabled = false
            backToTopBtn.classList.add('show-back-btn')
        }
        else{
            backToTopBtn.disabled = true
            backToTopBtn.classList.remove('show-back-btn')
        }
    })
}
