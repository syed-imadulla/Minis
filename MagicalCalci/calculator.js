/* =========================================
   CONFIG
========================================= */

const SECRET_PASSWORD = "121124";

/* =========================================
   ELEMENTS
========================================= */

const display =
document.getElementById("display");

const buttons =
document.querySelectorAll(".btn");

const equalBtn =
document.getElementById("equalBtn");

const overlay =
document.getElementById("unlockOverlay");

const starsContainer =
document.getElementById("stars");

/* =========================================
   CALCULATOR STATE
========================================= */

let expression = "";

/* =========================================
   UPDATE DISPLAY
========================================= */

function updateDisplay(){

    display.textContent =
    expression || "0";

}

/* =========================================
   BUTTON INPUTS
========================================= */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value =
        button.dataset.value;

        if(value === "C"){

            clearCalculator();
            return;

        }

        expression += value;

        updateDisplay();

    });

});

/* =========================================
   CLEAR
========================================= */

function clearCalculator(){

    expression = "";

    updateDisplay();

}

/* =========================================
   BACKSPACE
========================================= */

function backspace(){

    expression =
    expression.slice(0,-1);

    updateDisplay();

}

/* =========================================
   EVALUATE
========================================= */

function evaluateExpression(){

    if(expression === SECRET_PASSWORD){

        unlockPortal();
        return;

    }

    try{

        const result =
        eval(expression);

        expression =
        result.toString();

        updateDisplay();

    }

    catch{

        display.textContent =
        "Error";

        expression = "";

    }

}

/* =========================================
   EQUAL BUTTON
========================================= */

equalBtn.addEventListener(
"click",
evaluateExpression
);

/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
"keydown",
(event)=>{

    const key =
    event.key;

    if(
        /^[0-9]$/.test(key)
    ){

        expression += key;

        updateDisplay();
    }

    else if(
        key === "+"
        || key === "-"
        || key === "*"
        || key === "/"
        || key === "."
        || key === "("
        || key === ")"
    ){

        expression += key;

        updateDisplay();
    }

    else if(
        key === "Backspace"
    ){

        backspace();
    }

    else if(
        key === "Escape"
    ){

        clearCalculator();
    }

    else if(
        key === "Enter"
        || key === "="
    ){

        evaluateExpression();
    }

});
/* =========================================
   SECRET PORTAL
========================================= */

function unlockPortal(){

    overlay.classList.add(
    "active"
    );

    createPortalStars();

    setTimeout(()=>{

        window.location.href =
        "surprise.html";

    },2500);

}

/* =========================================
   STAR GENERATION
========================================= */

function createStars(){

    for(let i=0;i<180;i++){

        const star =
        document.createElement("div");

        star.classList.add("star");

        const size =
        Math.random()*3 + 1;

        star.style.width =
        size + "px";

        star.style.height =
        size + "px";

        star.style.left =
        Math.random()*100 + "%";

        star.style.top =
        Math.random()*100 + "%";

        star.style.animationDelay =
        Math.random()*4 + "s";

        starsContainer.appendChild(
        star
        );

    }

}

createStars();

/* =========================================
   SHOOTING STARS
========================================= */

function createShootingStar(){

    const star =
    document.createElement("div");

    star.classList.add(
    "shooting-star"
    );

    star.style.left =
    Math.random() *
    window.innerWidth +
    "px";

    star.style.top =
    Math.random() * 250 +
    "px";

    document.body.appendChild(
    star
    );

    setTimeout(()=>{

        star.remove();

    },1500);

}

setInterval(()=>{

    createShootingStar();

},9000);

/* =========================================
   PORTAL PARTICLES
========================================= */

function createPortalStars(){

    for(let i=0;i<120;i++){

        const particle =
        document.createElement("div");

        particle.innerHTML =
        Math.random() > 0.5
        ? "✨"
        : "⭐";

        particle.style.position =
        "fixed";

        particle.style.left =
        Math.random() *
        window.innerWidth +
        "px";

        particle.style.top =
        Math.random() *
        window.innerHeight +
        "px";

        particle.style.fontSize =
        Math.random()*16 + 12
        + "px";

        particle.style.zIndex =
        "10000";

        particle.style.pointerEvents =
        "none";

        document.body.appendChild(
        particle
        );

        particle.animate([

            {
                opacity:1,
                transform:
                "translateY(0)"
            },

            {
                opacity:0,
                transform:
                "translateY(-150px)"
            }

        ],{

            duration:2000,
            easing:"ease-out"

        });

        setTimeout(()=>{

            particle.remove();

        },2000);

    }

}

/* =========================================
   BUTTON PRESS EFFECT
========================================= */

document.querySelectorAll(
".btn, #equalBtn"
).forEach(button=>{

    button.addEventListener(
    "mousedown",
    ()=>{

        button.style.transform =
        "scale(.95)";

    });

    button.addEventListener(
    "mouseup",
    ()=>{

        button.style.transform =
        "";

    });

});

/* =========================================
   WELCOME ANIMATION
========================================= */

window.addEventListener(
"load",
()=>{

    document.querySelector(
    ".calculator-card"
    ).animate(

    [

        {
            opacity:0,
            transform:
            "translateY(50px)"
        },

        {
            opacity:1,
            transform:
            "translateY(0)"
        }

    ],

    {
        duration:1200,
        easing:"ease-out"
    }

    );

});