export function iframeMapRender(){
    const iframeContainer = document.querySelector('#iframe-map')
    // setTimeout(()=>{
    //     console.log('iframe start to render');
    //     iframeContainer.innerHTML = `
    //     <div class="hide-header" ></div>
    //     <iframe
    //         class="responsive-iframe"
    //         loading ="lazy"
    //         src="https://www.google.com/maps/d/embed?mid=1sE_LyTUzb8FvJM79OwldWwZgcgzdFw5K&ehbc=2E312F"
    //         frameborder="0"
    //         allowfullscreen>
    //     </iframe>
    //     `
    // }, 7000)
     window.onload = ()=>{
         iframeContainer.innerHTML = `
    <div class="hide-header" ></div>
        <iframe
            class="responsive-iframe"
            loading ="lazy"
            src="https://www.google.com/maps/d/embed?mid=1sE_LyTUzb8FvJM79OwldWwZgcgzdFw5K&ehbc=2E312F"
            frameborder="0"
            allowfullscreen>
        </iframe>`
    }
}