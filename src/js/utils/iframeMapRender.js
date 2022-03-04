export function iframeMapRender(){
    const iframeContainer = document.querySelector('#iframe-map')
    window.onload = (()=>{
        iframeContainer.innerHTML = `
        <div class="hide-header" ></div>
        <iframe
            class="responsive-iframe"
            src="https://www.google.com/maps/d/embed?mid=1sE_LyTUzb8FvJM79OwldWwZgcgzdFw5K&ehbc=2E312F"
            frameborder="0"
            allowfullscreen>
        </iframe>
        `
    })
}