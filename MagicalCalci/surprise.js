/* =========================================
   RELATIONSHIP DATE
========================================= */

const RELATIONSHIP_START = new Date("2024-11-12T00:00:00");

/* =========================================
   STAR FIELD
========================================= */

const starCanvas = document.getElementById("starCanvas");
const starCtx = starCanvas.getContext("2d");
let stars = [];

function resizeStars() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}

resizeStars();
window.addEventListener("resize", resizeStars);

function createStars() {
    stars = [];
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            size: Math.random() * 2.5,
            opacity: Math.random(),
            speed: Math.random() * 0.015
        });
    }
}

createStars();

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * star.speed;
        if (star.opacity < 0.2) star.opacity = 0.2;
        if (star.opacity > 1) star.opacity = 1;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        starCtx.fill();
    });
    requestAnimationFrame(animateStars);
}

animateStars();

/* =========================================
   FLOATING LANTERNS
========================================= */

const lanternContainer = document.getElementById("lanternContainer");

function createLantern() {
    const lantern = document.createElement("div");
    lantern.className = "lantern";
    lantern.style.left = Math.random() * 100 + "vw";
    lantern.style.animationDuration = (15 + Math.random() * 8) + "s";
    lanternContainer.appendChild(lantern);
    setTimeout(() => {
        lantern.remove();
    }, 25000);
}

for (let i = 0; i < 10; i++) {
    setTimeout(createLantern, i * 700);
}
setInterval(createLantern, 2200);

/* =========================================
   FIREFLIES
========================================= */

const fireflyContainer = document.getElementById("fireflyContainer");

function createFirefly() {
    const fly = document.createElement("div");
    fly.className = "firefly";
    fly.style.left = Math.random() * 100 + "vw";
    fly.style.top = Math.random() * 100 + "vh";
    fireflyContainer.appendChild(fly);
    setTimeout(() => {
        fly.remove();
    }, 6000);
}

for (let i = 0; i < 40; i++) {
    createFirefly();
}
setInterval(createFirefly, 800);

/* =========================================
   SHOOTING STARS
========================================= */

function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * 250 + "px";
    document.body.appendChild(star);
    setTimeout(() => {
        star.remove();
    }, 1500);
}

setInterval(() => {
    if (Math.random() > 0.55) {
        createShootingStar();
    }
}, 6000);

/* =========================================
   RELATIONSHIP COUNTER
========================================= */

function updateCounter() {
    const now = new Date();
    const diff = now - RELATIONSHIP_START;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

/* =========================================
   REASONS CAROUSEL
========================================= */

const wishes = document.querySelectorAll(".wish");
let wishIndex = 0;

setInterval(() => {
    wishes[wishIndex].classList.remove("active");
    wishIndex = (wishIndex + 1) % wishes.length;
    wishes[wishIndex].classList.add("active");
}, 3500);

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

const giftBox = document.getElementById("giftBox");
const giftPhoto = document.getElementById("giftPhoto");
const giftAudio = document.getElementById("giftAudio");
const voiceMessage = document.getElementById("voiceMessage");
const letterPaper = document.querySelector(".letterPaper");
const loveLetter = document.getElementById("loveLetter");

/* =========================================
   GIFT STATE
========================================= */

let giftOpened = false;

/* =========================================
   GOLDEN SPARKLES - IMPROVED
========================================= */

function createGiftSparkles() {
    const rect = giftBox.getBoundingClientRect();
    
    for (let i = 0; i < 120; i++) {
        const sparkle = document.createElement("div");
        
        sparkle.innerHTML = Math.random() > 0.5 ? "✨" : "⭐";
        sparkle.style.position = "fixed";
        sparkle.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 80 + "px";
        sparkle.style.top = rect.top + rect.height / 2 + (Math.random() - 0.5) * 60 + "px";
        sparkle.style.fontSize = (12 + Math.random() * 20) + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        
        document.body.appendChild(sparkle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 300 + Math.random() * 400;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance - 150;
        
        sparkle.animate(
            [
                { opacity: 1, transform: "translate(0,0) scale(1) rotate(0deg)" },
                { opacity: 0, transform: `translate(${x}px,${y}px) scale(0.2) rotate(360deg)` }
            ],
            { duration: 2000, easing: "cubic-bezier(0.2, 0.9, 0.4, 1.1)" }
        );
        
        setTimeout(() => sparkle.remove(), 2000);
    }
}

/* =========================================
   LETTER TYPEWRITER - FIXED
========================================= */

let typingStarted = false;

function startTypewriter() {
    if (typingStarted) return;
    typingStarted = true;
    
    loveLetter.innerHTML = "";
    let i = 0;
    
    function type() {
        if (i < LOVE_LETTER.length) {
            const char = LOVE_LETTER[i];
            loveLetter.innerHTML += char === "\n" ? "<br>" : char;
            i++;
            setTimeout(type, 35);
        } else {
            // Remove cursor when done
            loveLetter.classList.add('complete');
        }
    }
    
    type();
}

/* =========================================
   PHOTO REVEAL - IMPROVED
========================================= */

function revealPhoto() {
    giftPhoto.style.display = "block";
    // Force reflow
    void giftPhoto.offsetHeight;
    giftPhoto.classList.add("show");
}

/* =========================================
   AUDIO REVEAL - FIXED
========================================= */

function revealAudio() {
    giftAudio.style.display = "block";
    // Force reflow
    void giftAudio.offsetHeight;
    giftAudio.classList.add("show");
    
    // Auto-play audio with user interaction handling
    setTimeout(() => {
        if (voiceMessage) {
            voiceMessage.play().catch(err => {
                console.log("Auto-play prevented:", err);
                // Show play button hint
                const audioCard = giftAudio.querySelector('.audioCard');
                if (audioCard && !audioCard.querySelector('.play-hint')) {
                    const hint = document.createElement('p');
                    hint.className = 'play-hint';
                    hint.style.cssText = 'font-size:0.8rem; margin-top:10px; opacity:0.7;';
                    hint.innerHTML = '🎵 Click play to listen 🎵';
                    audioCard.appendChild(hint);
                    setTimeout(() => hint.remove(), 4000);
                }
            });
        }
    }, 500);
}

/* =========================================
   LETTER REVEAL - FIXED (No overlap)
========================================= */

function revealLetter() {
    // Wait for audio and photo to settle
    setTimeout(() => {
        letterPaper.classList.add("show");
        startTypewriter();
        
        // Scroll letter into view smoothly
        letterPaper.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 800);
}

/* =========================================
   GIFT OPENING - IMPROVED
========================================= */

giftBox.addEventListener("click", openGift);

function openGift() {
    if (giftOpened) return;
    giftOpened = true;
    
    // Open lid animation
    giftBox.classList.add("open");
    
    // Sparkles burst
    createGiftSparkles();
    
    // Mini fireworks
    setTimeout(() => {
        if (typeof launchMiniFireworks === "function") {
            launchMiniFireworks();
        }
    }, 300);
    
    // PHOTO - emerges from gift box
    setTimeout(() => {
        revealPhoto();
        
        // Add a small pop effect to photo
        const photo = document.getElementById('giftPhoto');
        if (photo) {
            photo.style.animation = 'photoPop 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)';
            setTimeout(() => {
                photo.style.animation = '';
            }, 500);
        }
    }, 600);
    
    // AUDIO - emerges after photo
    setTimeout(() => {
        revealAudio();
    }, 1400);
    
    // LETTER - appears last
    setTimeout(() => {
        revealLetter();
    }, 2800);
}

/* =========================================
   ADD PHOTO POP ANIMATION
========================================= */

// Add this to your CSS via JavaScript
const popAnimationStyle = document.createElement('style');
popAnimationStyle.textContent = `
    @keyframes photoPop {
        0% { transform: scale(0.8) translateY(50px); opacity: 0; }
        50% { transform: scale(1.05) translateY(-10px); }
        100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    
    @keyframes audioSlide {
        0% { transform: translateX(-50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    #giftAudio.show {
        animation: audioSlide 0.6s ease forwards;
    }
    
    /* Fix for letter wrapper spacing */
    #letterWrapper {
        margin-top: 80px;
        clear: both;
    }
    
    .letterPaper {
        transition: all 0.5s ease;
    }
    
    #loveLetter.complete:after {
        content: "";
        animation: none;
    }
`;
document.head.appendChild(popAnimationStyle);

/* =========================================
   PHOTO GLOW
========================================= */

if (giftPhoto) {
    giftPhoto.addEventListener("mouseenter", () => {
        giftPhoto.style.filter = "drop-shadow(0 0 25px rgba(255,232,163,.45))";
    });
    giftPhoto.addEventListener("mouseleave", () => {
        giftPhoto.style.filter = "none";
    });
}

/* =========================================
   LETTER FADE ON SCROLL
========================================= */

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const opacity = Math.max(0.6, 1 - scrollY / 3000);
    if (letterPaper) {
        letterPaper.style.opacity = opacity;
    }
});

/* =========================================
   FLOATING MAGIC PARTICLES
========================================= */

function createMagicParticle() {
    const particle = document.createElement("div");
    particle.innerHTML = "✨";
    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.bottom = "-30px";
    particle.style.fontSize = (12 + Math.random() * 10) + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "-1";
    document.body.appendChild(particle);
    
    particle.animate(
        [
            { transform: "translateY(0)", opacity: 0.8 },
            { transform: "translateY(-120vh)", opacity: 0 }
        ],
        { duration: 10000 + Math.random() * 4000, easing: "linear" }
    );
    
    setTimeout(() => {
        particle.remove();
    }, 14000);
}

setInterval(createMagicParticle, 3000);

/* =========================================
   FIREWORKS ENGINE
========================================= */

const fireworksCanvas = document.getElementById("fireworksCanvas");
const fireCtx = fireworksCanvas.getContext("2d");

function resizeFireworks() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

resizeFireworks();
window.addEventListener("resize", resizeFireworks);

let particles = [];

function createFirework(x = Math.random() * fireworksCanvas.width, y = Math.random() * fireworksCanvas.height * 0.5) {
    const colors = [
        "#FFE8A3",
        "#FFD700",
        "#FFB347",
        "#87CEFA",
        "#FFFFFF",
        "#B19CD9",
        "#FF6B6B",
        "#4ECDC4"
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 320; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 4;
        particles.push({
            x, y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: 120,
            color
        });
    }
}

function animateFireworks() {
    fireCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.04;
        p.life--;
        
        fireCtx.beginPath();
        fireCtx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        fireCtx.fillStyle = p.color;
        fireCtx.fill();
    });
    
    particles = particles.filter(p => p.life > 0);
    requestAnimationFrame(animateFireworks);
}

animateFireworks();

/* =========================================
   MINI FIREWORKS FOR GIFT
========================================= */

function launchMiniFireworks() {
    createFirework(window.innerWidth / 2, window.innerHeight / 2);
    
    setTimeout(() => {
        createFirework(window.innerWidth / 2 - 150, window.innerHeight / 2 - 80);
    }, 250);
    
    setTimeout(() => {
        createFirework(window.innerWidth / 2 + 150, window.innerHeight / 2 - 80);
    }, 500);
    
    setTimeout(() => {
        createFirework(window.innerWidth / 2, window.innerHeight / 2 - 120);
    }, 750);
}

/* =========================================
   PROPOSAL ELEMENTS
========================================= */

const finalBtn = document.getElementById("finalBtn");
const finaleScreen = document.getElementById("finaleScreen");
const stage1 = document.getElementById("proposalStage1");
const stage2 = document.getElementById("proposalStage2");
const stage3 = document.getElementById("proposalStage3");
const stage4 = document.getElementById("proposalStage4");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

/* =========================================
   FINALE FIREWORKS FUNCTION
========================================= */

let finaleFireworkInterval = null;

function startFinaleFireworks() {
    function fireworkBurst() {
        createFirework();
        setTimeout(() => createFirework(), 200);
        setTimeout(() => createFirework(), 400);
        setTimeout(() => createFirework(), 600);
    }
    
    fireworkBurst();
    finaleFireworkInterval = setInterval(fireworkBurst, 1800);
}

function stopFinaleFireworks() {
    if (finaleFireworkInterval) {
        clearInterval(finaleFireworkInterval);
        finaleFireworkInterval = null;
    }
}

/* =========================================
   FINALE SCREEN - IMPROVED
========================================= */

let finaleStarted = false;

if (finalBtn) {
    finalBtn.addEventListener("click", startFinale);
}

function startFinale() {
    if (finaleStarted) return;
    finaleStarted = true;
    
    finaleScreen.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    if (stage1) stage1.style.display = "block";
    if (stage2) stage2.style.display = "none";
    if (stage3) stage3.style.display = "none";
    if (stage4) stage4.style.display = "none";
    
    // Start fireworks
    startFinaleFireworks();
    
    // THANK YOU → QUESTION transition
    setTimeout(() => {
        if (stage1) stage1.style.display = "none";
        if (stage2) stage2.style.display = "block";
    }, 4000);
    
    setTimeout(() => {
        if (stage2) stage2.style.display = "none";
        if (stage3) stage3.style.display = "block";
    }, 7000);
    
    setTimeout(() => {
        stopFinaleFireworks();
    }, 25000);
}

/* =========================================
   YES BUTTON - CELEBRATION
========================================= */

if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        if (stage3) stage3.style.display = "none";
        if (stage4) stage4.style.display = "block";
        
        // Massive firework celebration
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.6
                );
            }, i * 200);
        }
        
        // Create heart particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createHeartParticle();
            }, i * 100);
        }
        
        // Confetti effect
        createConfetti();
        
        // Play celebration sound effect (if you want to add)
        // You can add an audio element for celebration sound
    });
}

/* =========================================
   HEART PARTICLES FOR CELEBRATION
========================================= */

function createHeartParticle() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = window.innerWidth / 2 + (Math.random() - 0.5) * 300 + "px";
    heart.style.top = window.innerHeight / 2 + (Math.random() - 0.5) * 200 + "px";
    heart.style.fontSize = (20 + Math.random() * 30) + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "10000";
    heart.style.opacity = "1";
    
    document.body.appendChild(heart);
    
    heart.animate(
        [
            { transform: "translateY(0) scale(1) rotate(0deg)", opacity: 1 },
            { transform: `translateY(-${200 + Math.random() * 300}px) scale(0.5) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ],
        { duration: 2000 + Math.random() * 1000, easing: "cubic-bezier(0.2, 0.9, 0.4, 1.1)" }
    );
    
    setTimeout(() => heart.remove(), 3000);
}

/* =========================================
   CONFETTI EFFECT
========================================= */

function createConfetti() {
    const colors = ["#FFE8A3", "#FFB347", "#87CEFA", "#FF6B6B", "#4ECDC4", "#B19CD9"];
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = window.innerWidth / 2 + (Math.random() - 0.5) * 400 + "px";
        confetti.style.top = window.innerHeight / 2 + "px";
        confetti.style.width = (8 + Math.random() * 8) + "px";
        confetti.style.height = (8 + Math.random() * 8) + "px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "10000";
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 8;
        
        let posX = parseFloat(confetti.style.left);
        let posY = parseFloat(confetti.style.top);
        let velX = vx;
        let velY = vy;
        let rotation = 0;
        let gravity = 0.2;
        
        function animateConfetti() {
            posX += velX;
            posY += velY;
            velY += gravity;
            rotation += 10;
            
            confetti.style.left = posX + "px";
            confetti.style.top = posY + "px";
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            if (posY < window.innerHeight + 100 && posX > -100 && posX < window.innerWidth + 100) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animateConfetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

/* =========================================
   NO BUTTON ESCAPE - TRICKY BUTTON
========================================= */

if (noBtn) {
    // Mouse enter - moves away
    noBtn.addEventListener("mouseenter", () => {
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        const minX = 50;
        const minY = 50;
        
        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;
        
        noBtn.style.position = "fixed";
        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
        noBtn.style.transition = "left 0.2s ease, top 0.2s ease";
    });
    
    // Touch devices - moves on click
    noBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        const minX = 50;
        const minY = 50;
        
        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;
        
        noBtn.style.position = "fixed";
        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
        
        // Shake animation on click
        noBtn.style.transform = "translateX(5px)";
        setTimeout(() => {
            noBtn.style.transform = "translateX(-5px)";
            setTimeout(() => {
                noBtn.style.transform = "translateX(0)";
            }, 50);
        }, 50);
    });
}

/* =========================================
   EXTRA FIREWORKS DURING PROPOSAL
========================================= */

let extraFireworkInterval = null;

// Start extra fireworks when finale screen opens
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === "style" && finaleScreen) {
            if (finaleScreen.style.display === "flex") {
                if (!extraFireworkInterval) {
                    extraFireworkInterval = setInterval(() => {
                        if (Math.random() > 0.7) {
                            createFirework();
                        }
                    }, 2500);
                }
            } else {
                if (extraFireworkInterval) {
                    clearInterval(extraFireworkInterval);
                    extraFireworkInterval = null;
                }
            }
        }
    });
});

if (finaleScreen) {
    observer.observe(finaleScreen, { attributes: true });
}

/* =========================================
   CLEANUP ON PAGE UNLOAD
========================================= */

window.addEventListener("beforeunload", () => {
    if (finaleFireworkInterval) {
        clearInterval(finaleFireworkInterval);
    }
    if (extraFireworkInterval) {
        clearInterval(extraFireworkInterval);
    }
});

/* =========================================
   ADDITIONAL: SCROLL REVEAL ANIMATIONS
========================================= */

// Add scroll reveal for sections
const sections = document.querySelectorAll("section");

function checkScrollReveal() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
}

// Set initial styles for sections
sections.forEach(section => {
    if (section.id !== "heroSection") {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }
});

window.addEventListener("scroll", checkScrollReveal);
setTimeout(checkScrollReveal, 500);

/* =========================================
   FIX FOR AUDIO/LETTER OVERLAPPING
   Ensure proper spacing
========================================= */

// Make sure letter wrapper has proper margin after gift reveal
function adjustLetterSpacing() {
    const revealContent = document.getElementById("revealContent");
    const letterWrapper = document.getElementById("letterWrapper");
    
    if (revealContent && letterWrapper) {
        const observer = new MutationObserver(() => {
            if (giftPhoto.classList.contains("show") || giftAudio.classList.contains("show")) {
                letterWrapper.style.marginTop = "100px";
            }
        });
        
        observer.observe(giftPhoto, { attributes: true });
        observer.observe(giftAudio, { attributes: true });
    }
}

adjustLetterSpacing();

/* =========================================
   HEART RIPPLE EFFECT ON GIFT CLICK
========================================= */

function createHeartRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.innerHTML = "❤️";
    ripple.style.position = "fixed";
    ripple.style.left = x - 15 + "px";
    ripple.style.top = y - 15 + "px";
    ripple.style.fontSize = "30px";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "10000";
    ripple.style.opacity = "0.8";
    
    document.body.appendChild(ripple);
    
    ripple.animate(
        [
            { transform: "scale(0.5)", opacity: 0.8 },
            { transform: "scale(2)", opacity: 0 }
        ],
        { duration: 1000, easing: "ease-out" }
    );
    
    setTimeout(() => ripple.remove(), 1000);
}

// Add ripple on gift click
if (giftBox) {
    giftBox.addEventListener("click", (e) => {
        const rect = giftBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createHeartRipple(centerX, centerY);
    });
}

/* =========================================
   INITIALIZATION LOG
========================================= */

console.log("✨ Surprise page loaded! ✨");
console.log("❤️ Made with love for Safiya ❤️");

/* =========================================
   MEMORY CARDS - INTERACTIVE EFFECTS
========================================= */

const memoryCards = document.querySelectorAll('.memoryCard');

function createSparklesOnCard(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = x + (Math.random() - 0.5) * 60 + 'px';
        sparkle.style.top = y + (Math.random() - 0.5) * 60 + 'px';
        sparkle.style.fontSize = (12 + Math.random() * 12) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100';
        sparkle.style.opacity = '1';
        sparkle.style.transition = 'all 0.5s ease';
        
        card.style.position = 'relative';
        card.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = `translate(${(Math.random() - 0.5) * 80}px, -${30 + Math.random() * 50}px)`;
        }, 50);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
}

memoryCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        createSparklesOnCard(card, e);
        
        // Add a subtle pulse animation
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Click effect - show heart
    card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create floating hearts
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = centerX + (Math.random() - 0.5) * 100 + 'px';
            heart.style.top = centerY + (Math.random() - 0.5) * 80 + 'px';
            heart.style.fontSize = (16 + Math.random() * 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            heart.style.opacity = '0.8';
            
            document.body.appendChild(heart);
            
            heart.animate(
                [
                    { transform: 'translateY(0) scale(1)', opacity: 0.8 },
                    { transform: `translateY(-${80 + Math.random() * 100}px) scale(0.5)`, opacity: 0 }
                ],
                { duration: 1500 + Math.random() * 500, easing: 'cubic-bezier(0.2, 0.9, 0.4, 1.1)' }
            );
            
            setTimeout(() => heart.remove(), 2000);
        }
    });
});

/* =========================================
   REVEAL MEMORY CARDS ON SCROLL
========================================= */

const memoryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

memoryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 0.1}s`;
    memoryObserver.observe(card);
});