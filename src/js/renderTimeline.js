export function renderTimeline(data){
    
    const timelineWrapper = document.querySelector('#timeline')
    timelineWrapper.innerHTML =  data.map((item, index)=>{
        const{place, date}=item
        return `
        <li class="waypoint">
            <div class="timeline-circle">
                <p class="circle-number">${index+1}</p>
            </div>
            <div class="timeline-panel">
                <h1 class="timeline-panel-title">${place}</h1>
                <p class="timeline-panel-date">${date}</p>
            </div>
        </li>
        `
    }).join('')

}