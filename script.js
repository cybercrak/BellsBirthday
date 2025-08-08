const cake = document.getElementById("cake");
const message = document.getElementById("message");
const candle = document.getElementById("candle");
const knife = document.getElementById("knife");  

const applauseSound = new Audio("assets/applause2.mp3");
const hbdmusic = new Audio("assets/HBD.mp3");
let isDragging = false;
let cakeCut = false;
let soundPlayed = false;

knife.style.cursor = "grab";

knife.addEventListener("mousedown", () => {
  isDragging = true;
  knife.style.cursor = "grabbing";
  if (!soundPlayed) {
    hbdmusic.play();
    soundPlayed = true;
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    knife.style.cursor = "grab";
    applauseSound.currentTime = 0;
    soundPlayed = false;

    console.log("Mouse up, cakeCut is", cakeCut);

    if (cakeCut) {
      if (candle && candle.src.includes("candle_with_flame")) {
        alert("Start with blowing the candle.\n[PS: Blow near the mic]");
        return;
      }

      cake.src = "assets/cake-cut.png";
      startConfetti();
      applauseSound.play();

      // Directly call onCakeCut here to show gift box after delay
      onCakeCut();

      console.log("Cake was cut, gift box will show soon");
    } else {
      console.log("Knife released but cakeCut is false");
    }
  }
});



const giftBox = document.getElementById("gift-box");
const giftMessage = document.getElementById("gift-message");

giftBox.style.display = "none"; // hide initially

function showGiftBox() {
  giftBox.style.display = "block";  // show block first
  requestAnimationFrame(() => {
    console.log("Showing gift box");
    giftBox.classList.add("show");  // triggers opacity and scale animation
  });
}

function onCakeCut() {
  setTimeout(showGiftBox, 5000);  // 2 seconds delay after cake cut
}

// Example usage on cake cut event (simplified)
cake.addEventListener("cut", () => {
  onCakeCut();
});


// Show gift message on gift box click
giftBox.addEventListener("click", () => {
  giftMessage.classList.add("show");
  giftBox.classList.add("show");  // ensure gift box gets a show class or stays visible
  hbdmusic.play();
});

// Close surprise message only if gift message is currently shown and click is outside both
document.addEventListener('click', (event) => {
  const isClickInsideGiftBox = giftBox.contains(event.target);
  const isClickInsideGiftMessage = giftMessage.contains(event.target);

  // Only close if giftMessage is visible and click is outside both
  if (giftMessage.classList.contains('show') && !isClickInsideGiftBox && !isClickInsideGiftMessage) {
    giftMessage.classList.remove('show');
    giftBox.classList.remove('show');
    giftBox.style.display = 'none';
  }
});


document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const cakeRect = cake.getBoundingClientRect();
    const offsetX = e.clientX - cakeRect.left;
    const offsetY = e.clientY - cakeRect.top;

    knife.style.left = `${offsetX - 50}px`;
    knife.style.top = `${offsetY - 50}px`;

    if (
      e.clientX >= cakeRect.left &&
      e.clientX <= cakeRect.right &&
      e.clientY >= cakeRect.top &&
      e.clientY <= cakeRect.bottom
    ) {
      cake.style.transform = "scale(1.05)";
      cakeCut = true;
    } else {
      cake.style.transform = "scale(1)";
      cakeCut = false; // reset if moved outside cake
    }
  }
});

function startConfetti() {
  if (window.confetti) {
    confetti({
      particleCount: 2000,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

function setupMicBlowDetection() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      mic.connect(analyser);
      
      function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        if (volume > 60) {
          if (candle && candle.src.includes("candle_with_flame")) {
            candle.src = "assets/candle_without_flame.png";
            console.log("Candle blown out!");
          }
        }

        requestAnimationFrame(detectBlow);
      }

      detectBlow();
    })
    .catch(err => {
      console.error("Microphone access denied or error:", err);
    });
}

const balloonContainer = document.getElementById('balloon-container');
const colors = [
  // 🍬 Candy & Bubblegum
  'linear-gradient(70deg, #ffdde1, #ee9ca7)',
  'linear-gradient(70deg, #ff758c, #ff7eb3)',
  
  // 🫧 Aqua & Sky
  'linear-gradient(70deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(70deg, #89f7fe, #66a6ff)',
  
  // 🍇 Purple Dreams
  'linear-gradient(70deg, #fbc2eb, #a6c1ee)',
  'linear-gradient(70deg, #c3cfe2, #f5f7fa)',
  
  // 🍑 Sunset & Coral
  'linear-gradient(70deg, #f6d365, #fda085)',
  'linear-gradient(70deg, #f7797d, #FBD786)',
  
  // 💜 Soft Violet & Lavender
  'linear-gradient(70deg, #d4fc79, #96e6a1)',
  'linear-gradient(70deg, #e0c3fc, #8ec5fc)',
  
  // 🍭 Unicorn Vibes
  'linear-gradient(70deg, #ff9a9e, #fecfef)',
  'linear-gradient(70deg, #a18cd1, #fbc2eb)',
  
  // 🌸 Sakura & Blush
  'linear-gradient(70deg, #f8cdda, #f88f9d)',
  'linear-gradient(70deg, #ffd3a5, #fd6585)',
  
  
  
  // 🌌 Galaxy Feel
  'linear-gradient(70deg, #654ea3, #eaafc8)',
  'linear-gradient(70deg, #43cea2, #185a9d)',
  
  // 🍃 Minty Fresh
  'linear-gradient(70deg, #d9afd9, #97d9e1)',
  'linear-gradient(70deg, #c2e9fb, #a1c4fd)',
  'linear-gradient(45deg, #FF6B6B, #FF5252)',

  // Orange Glow
  'linear-gradient(45deg, #FFA94D, #FF922B)',

  // Yellow Sunshine
  'linear-gradient(45deg, #FFE066, #FFD43B)',

  // Fresh Lime
  'linear-gradient(45deg, #B9FBC0, #A3F7BF)',

  // Mint Teal
  'linear-gradient(45deg, #69DB7C, #38D9A9)',

  // Aqua Breeze
  'linear-gradient(45deg, #4DD0E1, #00BCD4)',

  // Cool Sky Blue
  'linear-gradient(45deg, #74C0FC, #4DABF7)',


  // Sweet Purple
  'linear-gradient(45deg, #D0BFFF, #B197FC)',

  // Pink Cream
  'linear-gradient(45deg, #F8C8DC, #F9D6E1)',

  // Lavender Fields
  'linear-gradient(45deg, #E0BBE4, #D3A9D2)',

  // Soft Grey
  'linear-gradient(45deg, #DEE2E6, #CED4DA)',

  // Rose Dust
  'linear-gradient(45deg, #FFB4A2, #FFA69E)',

  // Chocolate Mauve
  'linear-gradient(45deg, #B08968, #A47551)',

  // Powder Blue
  'linear-gradient(45deg, #C2E9FB, #A1C4FD)',
  
  
];
const popSound = new Audio("assets/pop.wav");

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  // Random side: left or right
  const side = Math.random() < 0.5 ? 'left' : 'right';
  const offset = Math.floor(Math.random() * 10) + 5; // 2% to 12%
  balloon.style[side] = `${offset}%`;

  // Random delay
  const delay = Math.random() * 1;
  balloon.style.animationDelay = `${delay}s`;

  // Random color
  const color = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.background = color;

  // Add string
  const string = document.createElement('div');
  string.classList.add('string');
  balloon.appendChild(string);

  // Append to container
  balloonContainer.appendChild(balloon);

  // Click to pop
 

  balloon.addEventListener('click', () => {
    // Freeze current position
    const top = balloon.getBoundingClientRect().top + window.scrollY;
    const left = balloon.getBoundingClientRect().left;
    balloon.style.top = `${top}px`;
    balloon.style.left = `${left}px`;
    balloon.style.position = 'absolute';
    balloon.style.animation = 'none';
    balloon.style.zIndex = 10;
  
    // Play pop sound
    popSound.currentTime = 0;
    popSound.play();
  
    // 🎯 Confetti burst from balloon location
    confetti({
      particleCount: 20,
      spread: 100,
      origin: {
        x: (left + 25) / window.innerWidth,
        y: (top + 25) / window.innerHeight
      },
      colors: ['#ffffff', balloon.style.background],
    });
  
    // 💥 Create shard-like burst lines
    for (let i = 0; i < 8; i++) {
      const burst = document.createElement('div');
      burst.classList.add('burst-line');
      burst.style.background = balloon.style.background;
      const angle = (360 / 8) * i;
      burst.style.transform = `rotate(${angle}deg) scaleY(1) translateY(0)`;
      balloon.appendChild(burst);
    }
  
    // 💨 Shrink balloon
    balloon.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
    balloon.style.transform = 'scale(0)';
    balloon.style.opacity = '0';
  
    // Clean up
    setTimeout(() => {
      balloon.remove();
    }, 300);
  });
  

  // Auto remove after float ends
  setTimeout(() => {
    if (balloon.parentNode) balloon.remove();
  }, 9000);
}

// Spawn new balloons repeatedly
setInterval(() => {
  createBalloon();
}, 2000); // 1 per second

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, vx, vy, size, color, life, fade) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.size = size; this.color = color;
    this.life = life; // frames left
    this.fade = fade; // fade rate per frame
    this.alpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity for explosion particles
    this.life--;
    this.alpha -= this.fade;
    if(this.alpha < 0) this.alpha = 0;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];
let rockets = [];

function launchRocket() {
  const startX = Math.random() * canvas.width;
  const startY = canvas.height;
  const rocket = {
    x: startX,
    y: startY,
    vy: -8 - Math.random() * 2,
    vx: (Math.random() - 0.5) * 1,
    size: 3,
    trail: [],
    exploded: false,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
  };
  rockets.push(rocket);
  playSound('launch');
}

// Preload sound files
const launchSound = new Audio("assets/crac_kle.mp3");
const explodeSound = new Audio("assets/crackle.mp3");

// Optional: reduce volume if needed
launchSound.volume = 0.5;
explodeSound.volume = 0.5;

function playSound(type) {
  if (type === 'launch') {
    launchSound.currentTime = 0;
    launchSound.play().catch(e => console.warn("Launch sound error:", e));
  } else if (type === 'explode') {
    explodeSound.currentTime = 0;
    explodeSound.play().catch(e => console.warn("Explode sound error:", e));
  }
}


function explode(rocket) {
  playSound('explode');
  // Create explosion particles
  for(let i=0; i<80; i++) {
    const angle = Math.random()*Math.PI*2;
    const speed = Math.random()*4 + 1;
    particles.push(new Particle(
      rocket.x, rocket.y,
      Math.cos(angle)*speed,
      Math.sin(angle)*speed,
      2 + Math.random()*2,
      `hsl(${Math.random()*360}, 100%, 60%)`,
      60,
      0.02
    ));
  }
}

// Existing animation loop function
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update rockets
  for(let i = rockets.length-1; i>=0; i--) {
    let r = rockets[i];
    r.x += r.vx;
    r.y += r.vy;
    r.vy += 0.05; // gravity slows rocket upwards
    // Add trail
    r.trail.push({x: r.x, y: r.y});
    if(r.trail.length > 10) r.trail.shift();

    // Draw rocket trail as small dots fading out
    ctx.strokeStyle = r.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for(let j=0; j<r.trail.length-1; j++) {
      const p1 = r.trail[j];
      const p2 = r.trail[j+1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    // Draw rocket head
    ctx.fillStyle = r.color;
    ctx.shadowColor = r.color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.size, 0, Math.PI*2);
    ctx.fill();

    // Check apex (vy ~ 0 or starts falling)
    if(r.vy >= 0 && !r.exploded) {
      explode(r);
      rockets.splice(i, 1);
    }
  }

  // Update explosion particles
  for(let i = particles.length-1; i>=0; i--) {
    let p = particles[i];
    p.update();
    p.draw();
    if(p.life <= 0 || p.alpha <= 0) particles.splice(i, 1);
  }

  animationFrameId = requestAnimationFrame(update);
}

let animationFrameId = null;  // save animation frame id

// Start animation loop
animationFrameId = requestAnimationFrame(update);

// STOP after 5 seconds & hide overlay
setTimeout(() => {
  if(animationFrameId) cancelAnimationFrame(animationFrameId);
  
  // Clear canvas so no leftover particles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Hide the confetti/fireworks overlay div
  const overlay = document.getElementById('confetti-overlay');
  if(overlay) overlay.style.display = 'none';
}, 10000);


const cheer = new Audio("assets/crowd-cheering-383111.mp3");


let balloonInterval = null;

function startBalloonsAndHearts() {
  balloonInterval = setInterval(() => {
    createBalloon();
  }, 2000);

  const heartContainer = document.getElementById("heart-container");
  for (let i = 0; i < 250; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 3}s`;
    heart.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
    heart.style.animationDuration = `${3.5 + Math.random() * 1.5}s`;
    heartContainer.appendChild(heart);
  cheer.play();

    setTimeout(() => heart.remove(), 10000);
  }
}

// Launch a rocket every 1.5 seconds for 10 seconds total
const crackerInterval = setInterval(() => {
  launchRocket();
}, 500);

setTimeout(() => {
  clearInterval(crackerInterval);
}, 10000);

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const text = document.getElementById('birthday-text');
    text.style.opacity = '3'; 
  }, 5000); // 1000 milliseconds = 1 second
});


// Stop fireworks after 10 seconds and then transition to hearts + balloons
setTimeout(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // Stop sounds after 10 seconds
launchSound.pause();
launchSound.currentTime = 0;

explodeSound.pause();
explodeSound.currentTime = 0;

  const overlay = document.getElementById('confetti-overlay');
  if (overlay) {
    overlay.style.transition = "opacity 3s ease";
    overlay.style.opacity = 0;

    // Wait for overlay fade-out to finish
    setTimeout(() => {
      overlay.style.display = 'none';

      // ✅ Add slight delay (~500ms) before starting hearts/balloons
      setTimeout(() => {
        startBalloonsAndHearts();
      }, ); // 0.5s after overlay disappears

    },); // Wait for fade-out transition
  }

}, 10000); // Fireworks run for 10s


setupMicBlowDetection();


