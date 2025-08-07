
const knife = document.getElementById("knife");
const cake = document.getElementById("cake");
const message = document.getElementById("message");
const candle = document.getElementById("candle");

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
    
    if (cakeCut) {
      if (candle && candle.src.includes("candle_with_flame")) {
        alert("Start with blowing the candle.\n[PS: Blow near the mic]");
        return;
      }
    
      cake.src = "assets/cake-cut.png";
      startConfetti();
      applauseSound.play();
    
      // Show angel and wish input
      const angel = document.getElementById("angel");
      const wishContainer = document.getElementById("wish-container");
      angel.classList.add("visible");
      angel.classList.remove("hidden");
      
      // Show wish container after angel floats down (~5s)
      setTimeout(() => {
        wishContainer.classList.remove("hidden");
      }, 5000);
    }
    
    
  }
});

// const wishInput = document.getElementById("wish");

// wishInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey && wishInput.value.trim()) {
//     e.preventDefault();
//     const wishText = wishInput.value.trim();

//     sendWishSilently(wishText); // ✅ will now work
//     wishInput.disabled = true;
//     wishInput.value = "🎉 Wish sent!";
//   }
// });

// function sendWishSilently(wish) {
//   emailjs.send("service_hlhda9a", "template_zlpca14", {
//     wish: wish
//   }).then(() => {
//     console.log("Wish sent ✅");
//   }).catch((error) => {
//     console.error("Wish failed ❌", error);
//   });
// }





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
    }
    
  }
});

function startConfetti() {
  if (window.confetti) {
    confetti({
      particleCount: 2000,
      spread: 70,
      origin: { y: 0.6 }
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
  }, 14000);
}

// Spawn new balloons repeatedly
setInterval(() => {
  createBalloon();
}, 2000); // 1 per second


window.addEventListener("load", () => {
  const heartContainer = document.getElementById("heart-container");

  for (let i = 0; i < 250; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    // Random horizontal position
    heart.style.left = `${Math.random() * 100}%`;

    // Slightly random delay and size
    heart.style.animationDelay = `${Math.random() * 3}s`;
    heart.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
    heart.style.animationDuration = `${3.5 + Math.random() * 1.5}s`;
    heartContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
      heart.remove();
    }, 10000);
  }
});


setupMicBlowDetection();

