/* =========================================
   RELATIONSHIP DATE
========================================= */

const RELATIONSHIP_START =
new Date("2024-11-12T00:00:00");

/* =========================================
   STAR FIELD
========================================= */

const starCanvas =
document.getElementById(
"starCanvas"
);

const starCtx =
starCanvas.getContext("2d");

let stars = [];

function resizeStars(){

    starCanvas.width =
    window.innerWidth;

    starCanvas.height =
    window.innerHeight;

}

resizeStars();

window.addEventListener(
"resize",
resizeStars
);

function createStars(){

    stars = [];

    for(let i=0;i<300;i++){

        stars.push({

            x:
            Math.random() *
            starCanvas.width,

            y:
            Math.random() *
            starCanvas.height,

            size:
            Math.random() * 2.5,

            opacity:
            Math.random(),

            speed:
            Math.random() * 0.015

        });

    }

}

createStars();

function animateStars(){

    starCtx.clearRect(
    0,
    0,
    starCanvas.width,
    starCanvas.height
    );

    stars.forEach(star=>{

        star.opacity +=
        (Math.random() - .5)
        * star.speed;

        if(star.opacity < .2)
        star.opacity = .2;

        if(star.opacity > 1)
        star.opacity = 1;

        starCtx.beginPath();

        starCtx.arc(

            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2

        );

        starCtx.fillStyle =
        `rgba(255,255,255,${star.opacity})`;

        starCtx.fill();

    });

    requestAnimationFrame(
    animateStars
    );

}

animateStars();

/* =========================================
   FLOATING LANTERNS
========================================= */

const lanternContainer =
document.getElementById(
"lanternContainer"
);

function createLantern(){

    const lantern =
    document.createElement("div");

    lantern.className =
    "lantern";

    lantern.style.left =
    Math.random()*100 + "vw";

    lantern.style.animationDuration =
    (15 + Math.random()*8)
    + "s";

    lanternContainer.appendChild(
    lantern
    );

    setTimeout(()=>{

        lantern.remove();

    },25000);

}

for(let i=0;i<10;i++){

    setTimeout(
    createLantern,
    i * 700
    );

}

setInterval(
createLantern,
2200
);

/* =========================================
   FIREFLIES
========================================= */

const fireflyContainer =
document.getElementById(
"fireflyContainer"
);

function createFirefly(){

    const fly =
    document.createElement("div");

    fly.className =
    "firefly";

    fly.style.left =
    Math.random()*100 + "vw";

    fly.style.top =
    Math.random()*100 + "vh";

    fireflyContainer.appendChild(
    fly
    );

    setTimeout(()=>{

        fly.remove();

    },6000);

}

for(let i=0;i<40;i++){

    createFirefly();

}

setInterval(
createFirefly,
800
);

/* =========================================
   SHOOTING STARS
========================================= */

function createShootingStar(){

    const star =
    document.createElement("div");

    star.className =
    "shooting-star";

    star.style.left =
    Math.random()*window.innerWidth
    + "px";

    star.style.top =
    Math.random()*250
    + "px";

    document.body.appendChild(
    star
    );

    setTimeout(()=>{

        star.remove();

    },1500);

}

setInterval(()=>{

    if(Math.random() > .55){

        createShootingStar();

    }

},6000);

/* =========================================
   RELATIONSHIP COUNTER
========================================= */

function updateCounter(){

    const now =
    new Date();

    const diff =
    now - RELATIONSHIP_START;

    const days =
    Math.floor(
    diff / 86400000
    );

    const hours =
    Math.floor(
    diff / 3600000
    ) % 24;

    const minutes =
    Math.floor(
    diff / 60000
    ) % 60;

    const seconds =
    Math.floor(
    diff / 1000
    ) % 60;

    document.getElementById(
    "days"
    ).textContent = days;

    document.getElementById(
    "hours"
    ).textContent = hours;

    document.getElementById(
    "minutes"
    ).textContent = minutes;

    document.getElementById(
    "seconds"
    ).textContent = seconds;

}

updateCounter();

setInterval(
updateCounter,
1000
);

/* =========================================
   REASONS CAROUSEL
========================================= */

const wishes =
document.querySelectorAll(
".wish"
);

let wishIndex = 0;

setInterval(()=>{

    wishes[wishIndex]
    .classList.remove(
    "active"
    );

    wishIndex =
    (wishIndex + 1)
    %
    wishes.length;

    wishes[wishIndex]
    .classList.add(
    "active"
    );

},3500);

/* =========================================
   LOVE LETTER TEXT
========================================= */

const LOVE_LETTER = `
Every moment with you feels like a beautiful dream.
You bring happiness, warmth, and meaning to my life.
This little surprise is just a small reminder of how much you mean to me.
No matter where life takes us, you will always have a special place in my heart.

Forever Yours ❤️
Syed Imadulla

I Love You Soooo Much 😳😘❤️
`;

/* =========================================
   ELEMENTS
========================================= */

const giftBox =
document.getElementById(
"giftBox"
);

const giftPhoto =
document.getElementById(
"giftPhoto"
);

const giftAudio =
document.getElementById(
"giftAudio"
);

const voiceMessage =
document.getElementById(
"voiceMessage"
);

const letterPaper =
document.querySelector(
".letterPaper"
);

const loveLetter =
document.getElementById(
"loveLetter"
);

/* =========================================
   GIFT STATE
========================================= */

let giftOpened = false;

/* =========================================
   GOLDEN SPARKLES
========================================= */

function createGiftSparkles(){

    const rect =
    giftBox.getBoundingClientRect();

    for(let i=0;i<100;i++){

        const sparkle =
        document.createElement("div");

        sparkle.innerHTML =
        Math.random() > .5
        ? "✨"
        : "⭐";

        sparkle.style.position =
        "fixed";

        sparkle.style.left =
        rect.left +
        rect.width/2 +
        "px";

        sparkle.style.top =
        rect.top +
        rect.height/2 +
        "px";

        sparkle.style.fontSize =
        (12 + Math.random()*20)
        + "px";

        sparkle.style.pointerEvents =
        "none";

        sparkle.style.zIndex =
        "9999";

        document.body.appendChild(
        sparkle
        );

        const x =
        (Math.random()-0.5)
        * 900;

        const y =
        (Math.random()-0.5)
        * 700;

        sparkle.animate(

        [

            {
                opacity:1,
                transform:
                "translate(0,0) scale(1)"
            },

            {
                opacity:0,
                transform:
                `translate(${x}px,${y}px) scale(.3)`
            }

        ],

        {
            duration:2500,
            easing:"ease-out"
        }

        );

        setTimeout(()=>{

            sparkle.remove();

        },2500);

    }

}

/* =========================================
   LETTER TYPEWRITER
========================================= */

let typingStarted =
false;

function startTypewriter(){

    if(typingStarted)
    return;

    typingStarted =
    true;

    let i = 0;

    function type(){

        if(
        i <
        LOVE_LETTER.length
        ){

            const char =
            LOVE_LETTER[i];

            loveLetter.innerHTML +=

            char === "\n"
            ? "<br>"
            : char;

            i++;

            setTimeout(
            type,
            28
            );

        }

    }

    type();

}

/* =========================================
   PHOTO REVEAL
========================================= */

function revealPhoto(){

    giftPhoto.style.display =
    "block";

    requestAnimationFrame(()=>{

        giftPhoto.classList.add(
        "show"
        );

    });

}

/* =========================================
   AUDIO REVEAL
========================================= */

function revealAudio(){

    giftAudio.style.display =
    "block";

    requestAnimationFrame(()=>{

        giftAudio.classList.add(
        "show"
        );

    });

}

/* =========================================
   LETTER REVEAL
========================================= */

function revealLetter(){

    letterPaper.classList.add(
    "show"
    );

    startTypewriter();

}

/* =========================================
   GIFT OPENING
========================================= */

giftBox.addEventListener(
"click",
openGift
);

function openGift(){

    if(giftOpened)
    return;

    giftOpened =
    true;

    /* OPEN LID */

    giftBox.classList.add(
    "open"
    );

    /* SPARKLES */

    createGiftSparkles();

    /* MINI FIREWORKS */

    setTimeout(()=>{

        if(
        typeof launchMiniFireworks
        === "function"
        ){

            launchMiniFireworks();

        }

    },1000);

    /* PHOTO */

    setTimeout(()=>{

        revealPhoto();

    },2200);

    /* AUDIO */

    setTimeout(()=>{

        revealAudio();

        voiceMessage
        .play()
        .catch(()=>{});

    },3600);

    /* LETTER */

    setTimeout(()=>{

        revealLetter();

    },5000);

}

/* =========================================
   PHOTO GLOW
========================================= */

giftPhoto.addEventListener(
"mouseenter",
()=>{

    giftPhoto.style.filter =

    "drop-shadow(0 0 25px rgba(255,232,163,.45))";

});

giftPhoto.addEventListener(
"mouseleave",
()=>{

    giftPhoto.style.filter =
    "none";

});

/* =========================================
   LETTER FADE ON SCROLL
========================================= */

window.addEventListener(
"scroll",
()=>{

    const scrollY =
    window.scrollY;

    const opacity =
    Math.max(
    .6,
    1 - scrollY/3000
    );

    if(letterPaper){

        letterPaper.style.opacity =
        opacity;

    }

});

/* =========================================
   FLOATING MAGIC PARTICLES
========================================= */

function createMagicParticle(){

    const particle =
    document.createElement("div");

    particle.innerHTML =
    "✨";

    particle.style.position =
    "fixed";

    particle.style.left =
    Math.random()*100 +
    "vw";

    particle.style.bottom =
    "-30px";

    particle.style.fontSize =
    (12 + Math.random()*10)
    + "px";

    particle.style.pointerEvents =
    "none";

    particle.style.zIndex =
    "-1";

    document.body.appendChild(
    particle
    );

    particle.animate(

    [

        {
            transform:
            "translateY(0)",
            opacity:.8
        },

        {
            transform:
            "translateY(-120vh)",
            opacity:0
        }

    ],

    {
        duration:
        10000 +
        Math.random()*4000,

        easing:"linear"
    }

    );

    setTimeout(()=>{

        particle.remove();

    },14000);

}

setInterval(
createMagicParticle,
3000
);

/* =========================================
   FIREWORKS ENGINE
========================================= */

const fireworksCanvas =
document.getElementById(
"fireworksCanvas"
);

const fireCtx =
fireworksCanvas.getContext("2d");

function resizeFireworks(){

    fireworksCanvas.width =
    window.innerWidth;

    fireworksCanvas.height =
    window.innerHeight;
}

resizeFireworks();

window.addEventListener(
"resize",
resizeFireworks
);

let particles = [];

function createFirework(
x = Math.random() * fireworksCanvas.width,
y = Math.random() * fireworksCanvas.height * 0.5
){

    const colors = [

        "#FFE8A3",
        "#FFD700",
        "#FFB347",
        "#87CEFA",
        "#FFFFFF",
        "#B19CD9"

    ];

    const color =
    colors[
        Math.floor(
        Math.random() *
        colors.length
        )
    ];

    for(let i=0;i<320;i++){

        const angle =
        Math.random() *
        Math.PI * 2;

        const speed =
        Math.random() * 10 + 4;

        particles.push({

            x,
            y,

            dx:
            Math.cos(angle)
            * speed,

            dy:
            Math.sin(angle)
            * speed,

            life:120,

            color

        });

    }

}

function animateFireworks(){

    fireCtx.clearRect(
    0,
    0,
    fireworksCanvas.width,
    fireworksCanvas.height
    );

    particles.forEach(p=>{

        p.x += p.dx;

        p.y += p.dy;

        p.dy += 0.04;

        p.life--;

        fireCtx.beginPath();

        fireCtx.arc(
        p.x,
        p.y,
        2.2,
        0,
        Math.PI*2
        );

        fireCtx.fillStyle =
        p.color;

        fireCtx.fill();

    });

    particles =
    particles.filter(
    p=>p.life > 0
    );

    requestAnimationFrame(
    animateFireworks
    );

}

animateFireworks();

/* =========================================
   MINI FIREWORKS FOR GIFT
========================================= */

function launchMiniFireworks(){

    createFirework(
    window.innerWidth/2,
    window.innerHeight/2
    );

    setTimeout(()=>{

        createFirework(
        window.innerWidth/2 - 150,
        window.innerHeight/2 - 80
        );

    },250);

    setTimeout(()=>{

        createFirework(
        window.innerWidth/2 + 150,
        window.innerHeight/2 - 80
        );

    },500);

}

/* =========================================
   PROPOSAL ELEMENTS
========================================= */

const finalBtn =
document.getElementById(
"finalBtn"
);

const finaleScreen =
document.getElementById(
"finaleScreen"
);

const stage1 =
document.getElementById(
"proposalStage1"
);

const stage2 =
document.getElementById(
"proposalStage2"
);

const stage3 =
document.getElementById(
"proposalStage3"
);

const stage4 =
document.getElementById(
"proposalStage4"
);

const yesBtn =
document.getElementById(
"yesBtn"
);

const noBtn =
document.getElementById(
"noBtn"
);

/* =========================================
   FINALE
========================================= */

let finaleStarted =
false;

finalBtn.addEventListener(
"click",
startFinale
);

function startFinale(){

    if(finaleStarted)
    return;

    finaleStarted = true;

    finaleScreen.style.display =
    "flex";

    document.body.style.overflow =
    "hidden";

    stage1.style.display =
    "block";

    function fireworkBurst(){

        createFirework();

        setTimeout(
        ()=>createFirework(),
        200
        );

        setTimeout(
        ()=>createFirework(),
        400
        );

        setTimeout(
        ()=>createFirework(),
        600
        );

    }

    fireworkBurst();

    const showInterval =
    setInterval(
    fireworkBurst,
    1800
    );

    /* THANK YOU → QUESTION */

    setTimeout(()=>{

        stage1.style.display =
        "none";

        stage2.style.display =
        "block";

    },4000);

    setTimeout(()=>{

        stage2.style.display =
        "none";

        stage3.style.display =
        "block";

    },7000);

    setTimeout(()=>{

        clearInterval(
        showInterval
        );

    },20000);

}

/* =========================================
   YES BUTTON
========================================= */

yesBtn.addEventListener(
"click",
()=>{

    stage3.style.display =
    "none";

    stage4.style.display =
    "block";

    for(let i=0;i<12;i++){

        setTimeout(()=>{

            createFirework();

        },i*250);

    }

});

/* =========================================
   NO BUTTON ESCAPE
========================================= */

noBtn.addEventListener(
"mouseenter",
()=>{

    const maxX =
    window.innerWidth - 250;

    const maxY =
    window.innerHeight - 120;

    noBtn.style.position =
    "absolute";

    noBtn.style.left =
    Math.random()*maxX
    + "px";

    noBtn.style.top =
    Math.random()*maxY
    + "px";

});

/* =========================================
   TOUCH DEVICES
========================================= */

noBtn.addEventListener(
"click",
(e)=>{

    e.preventDefault();

    const maxX =
    window.innerWidth - 250;

    const maxY =
    window.innerHeight - 120;

    noBtn.style.position =
    "absolute";

    noBtn.style.left =
    Math.random()*maxX
    + "px";

    noBtn.style.top =
    Math.random()*maxY
    + "px";

});

/* =========================================
   EXTRA FIREWORKS DURING PROPOSAL
========================================= */

setInterval(()=>{

    if(!finaleStarted)
    return;

    if(Math.random() > .7){

        createFirework();

    }

},2500);