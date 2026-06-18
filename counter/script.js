let dec = document.getElementById("decrement");
let res = document.getElementById("reset");
let inc = document.getElementById("increment");
let digit = document.querySelector(".digit");
let gif = document.getElementById("specialGif");
let sound = document.getElementById("bgSound");

let played = false;
sound.loop=true;

function updateUI(){
    let num = parseInt(digit.textContent);

    if(num === 67){
        digit.style.color = "yellow";
        gif.classList.add("show");

        if(!played){
            sound.currentTime = 0;
            sound.play();
            played = true;
        }

    }else{
        digit.style.color = "#e8e6e3";
        gif.classList.remove("show");

        sound.pause();          
        sound.currentTime = 0;  

        played = false;
    }
}

dec.addEventListener("click",()=>{
    digit.textContent = parseInt(digit.textContent) - 1;
    updateUI();
});

res.addEventListener("click",()=>{
    digit.textContent = 0;
    updateUI();
});

inc.addEventListener("click",()=>{
    digit.textContent = parseInt(digit.textContent) + 1;
    updateUI();
});