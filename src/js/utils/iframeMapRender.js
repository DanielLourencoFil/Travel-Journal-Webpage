export function iframeMapRender(load){
    console.log('iframe 1');
    const iframeContainer = document.querySelector('#iframe-map')
    if(load === "true"){
        console.log('iframe 2');
        
        setTimeout(()=>{
            console.log('iframe 3');
            console.log('iframe start to render');
          iframeContainer.innerHTML = `
          <div class="hide-header" ></div>
          <iframe
              class="responsive-iframe"
              loading ="lazy"
              src="https://www.google.com/maps/d/embed?mid=1sE_LyTUzb8FvJM79OwldWwZgcgzdFw5K&ehbc=2E312F"
              frameborder="0"
              allowfullscreen>
          </iframe>
          `
      }, 2000)
    }
     
    //      iframeContainer.innerHTML = `
    // <div class="hide-header" ></div>
    //     <iframe
    //         class="responsive-iframe"
    //         loading ="lazy"
    //         src="https://www.google.com/maps/d/embed?mid=1sE_LyTUzb8FvJM79OwldWwZgcgzdFw5K&ehbc=2E312F"
    //         frameborder="0"
    //         allowfullscreen>
    //     </iframe>`
}