let charIndex1 = 0;
let charIndex2 = 0;
let charIndex3 = 0;

let isTimeforReverTyping = false


export function typingEffect(){
    const text1 = ['Once Upon a Dream Called','Latin America...']; 
    const text2 = 'Latin America...'; 
    const speed = 100; 
    
        if (charIndex1 < text1[0].length) {
          document.getElementById("main-title-1").innerHTML += text1[0].charAt(charIndex1);
          charIndex1++;
          setTimeout(typingEffect, speed);
        }
    
    //starts tryping second text after the first one is done
    if(charIndex1 === text1[0].length && charIndex2 < text1[1].length){
        // charIndex1 = 0
        setTimeout(function(){
            document.getElementById("main-title-2").innerHTML += text1[1].charAt(charIndex2);
          charIndex2++;
          setTimeout(typingEffect, speed);

        },speed)
    }
    
    //starts reversetryping
    // if(charIndex2 === text1[1].length){
        
    //     setTimeout(typingEffectReverse,3000)
    //     charIndex2++
    //     console.log('yes');
    // }
    
}  

function typingWriter(){
    if (charIndex1 < text1[0].length) {
          document.getElementById("main-title-1").innerHTML += text1[0].charAt(charIndex1);
          charIndex1++;
          setTimeout(typingEffect, speed);
        }
}

let counter = 0

export function typingEffectReverse(){
    const text1 = 'Once Upon a Dream Called'; 
    let text2 = ['Latin America...', 'Bike Trip...', "World Traveling..."]; 
    // let text2 = 'Latin America...'; 
    const speed = 300; 

    if (charIndex3 <= text2[0].length && counter === 0) {
        
      document.getElementById("main-title-2").innerHTML = text2[0].slice(0, text2[0].length-charIndex3)
      charIndex3++;
      setTimeout(typingEffectReverse, speed);
    }
    if(charIndex3 === text2[0].length && counter === 0){
        counter++
        charIndex3 = 0
    

    }

    
    
}


/*
const text1 = 'Once Upon a Dream Called'; 
const text2 = 'Latin America...'; 
const speed = 300; 
export function typingEffect(){

    if (charIndex1 < text1.length) {
      document.getElementById("main-title-1").innerHTML += text1.charAt(charIndex1);
      charIndex1++;
      setTimeout(typingEffect, speed);
    }
    //starts tryping second text after the first one is done
    if(charIndex1 === text1.length && charIndex2 < text2.length){
        document.getElementById("main-title-2").innerHTML += text2.charAt(charIndex2);
      charIndex2++;
      setTimeout(typingEffect, speed);
    }
    // charIndex1 =0
    // charIndex2 =0
    if(charIndex2 === text2.length){
        setTimeout(typingEffectReverse,3000)
        charIndex2++
        console.log('yes');
        
        
    }
   

    
}

export function typingEffectReverse(){
    const text1 = 'Once Upon a Dream Called'; 
    let text2 = 'Latin America...'; 
    let text2 = 'Latin America...'; 
    const speed = 300; 

    if (charIndex3 <= text2.length) {
        
      document.getElementById("main-title-2").innerHTML = text2.slice(0, text2.length-charIndex3)
      charIndex3++;
      setTimeout(typingEffectReverse, speed);
    }
    
    
}




*/