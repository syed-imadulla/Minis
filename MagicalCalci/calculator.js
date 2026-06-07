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
   ENHANCED PORTAL ENTRY - LIKE WALKING THROUGH
========================================= */

function unlockPortal() {
    // Show overlay first
    overlay.classList.add("active");
    
    // Create tunnel effect (feels like entering)
    createPortalTunnel();
    
    // Create spiral rays being sucked into center
    createSpiralRays();
    
    // Create streaming particles
    createPortalStream();
    
    // Screen flash before redirect
    setTimeout(() => {
        createScreenFlash();
    }, 1300);
    
    // Launch mini fireworks around portal
    launchPortalFireworks();
    
    // Redirect after the portal journey
    setTimeout(() => {
        window.location.href = "surprise.html";
    }, 2600);
}

/* Create expanding tunnel rings (the "entering" effect) */
function createPortalTunnel() {
    const tunnelDiv = document.createElement("div");
    tunnelDiv.className = "portal-tunnel";
    
    // Create multiple rings for depth
    for (let i = 0; i < 8; i++) {
        const ring = document.createElement("div");
        ring.className = "tunnel-ring";
        ring.style.animationDelay = (i * 0.08) + "s";
        ring.style.background = `conic-gradient(from ${i * 45}deg, #6f42ff, #ff69b4, #00ccff, #6f42ff)`;
        ring.style.opacity = 1 - (i * 0.08);
        tunnelDiv.appendChild(ring);
    }
    
    document.body.appendChild(tunnelDiv);
    
    setTimeout(() => {
        tunnelDiv.remove();
    }, 2000);
}

/* Create spiral light rays being sucked toward center */
function createSpiralRays() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 60; i++) {
        const ray = document.createElement("div");
        ray.className = "spiral-ray";
        
        // Random start position from edges
        const fromEdge = Math.random() * 4;
        let startX, startY;
        if (fromEdge < 1) { // top
            startX = Math.random() * window.innerWidth;
            startY = -20;
        } else if (fromEdge < 2) { // bottom
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 20;
        } else if (fromEdge < 3) { // left
            startX = -20;
            startY = Math.random() * window.innerHeight;
        } else { // right
            startX = window.innerWidth + 20;
            startY = Math.random() * window.innerHeight;
        }
        
        ray.style.left = startX + "px";
        ray.style.top = startY + "px";
        ray.style.setProperty("--centerX", (centerX - startX) + "px");
        ray.style.setProperty("--centerY", (centerY - startY) + "px");
        ray.style.animationDelay = (Math.random() * 0.6) + "s";
        ray.style.width = (Math.random() * 6 + 2) + "px";
        ray.style.height = (Math.random() * 120 + 60) + "px";
        ray.style.background = `linear-gradient(to bottom, rgba(255,255,255,0), hsl(${260 + Math.random() * 100}, 100%, 70%), rgba(255,255,255,0))`;
        
        document.body.appendChild(ray);
        
        setTimeout(() => {
            if (ray && ray.remove) ray.remove();
        }, 2000);
    }
}

/* Create streaming particles flying into portal */
function createPortalStream() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const symbols = ["✨", "⭐", "💫", "🌀", "🌟", "⚡", "💜", "🔮"];
    
    for (let i = 0; i < 180; i++) {
        const particle = document.createElement("div");
        particle.className = "portal-particle";
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Start from random edge positions
        const side = Math.floor(Math.random() * 4);
        let startX, startY;
        if (side === 0) { startX = Math.random() * window.innerWidth; startY = -30; }
        else if (side === 1) { startX = Math.random() * window.innerWidth; startY = window.innerHeight + 30; }
        else if (side === 2) { startX = -30; startY = Math.random() * window.innerHeight; }
        else { startX = window.innerWidth + 30; startY = Math.random() * window.innerHeight; }
        
        particle.style.left = startX + "px";
        particle.style.top = startY + "px";
        particle.style.fontSize = (Math.random() * 20 + 14) + "px";
        
        // Calculate trajectory toward center with swirling
        const dx = centerX - startX;
        const dy = centerY - startY;
        const swirlX = (Math.random() - 0.5) * 300;
        const swirlY = (Math.random() - 0.5) * 300;
        
        particle.style.setProperty("--tx", (dx * 0.4 + swirlX) + "px");
        particle.style.setProperty("--ty", (dy * 0.4 + swirlY) + "px");
        particle.style.setProperty("--tx2", (dx * 0.9 + swirlX * 0.5) + "px");
        particle.style.setProperty("--ty2", (dy * 0.9 + swirlY * 0.5) + "px");
        
        particle.style.animationDelay = (Math.random() * 0.8) + "s";
        particle.style.animationDuration = (Math.random() * 1 + 1.2) + "s";
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle && particle.remove) particle.remove();
        }, 2000);
    }
}

/* White flash effect */
function createScreenFlash() {
    const flash = document.createElement("div");
    flash.className = "screen-flash";
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (flash && flash.remove) flash.remove();
    }, 500);
}

/* Portal fireworks around the ring */
function launchPortalFireworks() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            for (let i = 0; i < 40; i++) {
                const spark = document.createElement("div");
                spark.innerHTML = "💜";
                spark.style.position = "fixed";
                spark.style.left = centerX + "px";
                spark.style.top = centerY + "px";
                spark.style.fontSize = (Math.random() * 14 + 10) + "px";
                spark.style.pointerEvents = "none";
                spark.style.zIndex = "10001";
                spark.style.transition = "all 1s ease-out";
                
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 200 + 50;
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist;
                
                document.body.appendChild(spark);
                
                requestAnimationFrame(() => {
                    spark.style.transform = `translate(${tx}px, ${ty}px)`;
                    spark.style.opacity = "0";
                });
                
                setTimeout(() => spark.remove(), 1000);
            }
        }, burst * 300);
    }
}

/* Also update the portal stars function to be more dramatic */
function createPortalStars() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement("div");
        particle.innerHTML = Math.random() > 0.5 ? "✨" : "⭐";
        particle.style.position = "fixed";
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = Math.random() * window.innerHeight + "px";
        particle.style.fontSize = Math.random() * 18 + 12 + "px";
        particle.style.zIndex = "10000";
        particle.style.pointerEvents = "none";
        
        document.body.appendChild(particle);
        
        // Animate toward center
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const dx = centerX - startX;
        const dy = centerY - startY;
        
        particle.animate([
            { opacity: 1, transform: "translate(0, 0) rotate(0deg)" },
            { opacity: 0.8, transform: `translate(${dx * 0.3}px, ${dy * 0.3}px) rotate(120deg)` },
            { opacity: 0, transform: `translate(${dx * 0.9}px, ${dy * 0.9}px) rotate(360deg)` }
        ], {
            duration: 1800,
            easing: "cubic-bezier(0.2, 0.9, 0.4, 1)"
        });
        
        setTimeout(() => particle.remove(), 1900);
    }
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