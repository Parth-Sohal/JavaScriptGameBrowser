"use strict";

const p1ScoreEl = document.querySelector(".player-1_score");
const p2ScoreEl = document.querySelector(".player-2_score");
const statusText = document.getElementById("status-text");

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlaySubtitle = document.getElementById("overlay-subtitle");
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const track = document.querySelector(".track");
const countdownEl = document.getElementById("countdown");

const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");

// Try loading Audio elements, silently fail if missing to not crash logic
const winAudio = new Audio("victory.mp3");
const engineAudio = new Audio("lambo.mp3");

// Adjust volumes
winAudio.volume = 0.6;
engineAudio.volume = 0.4;
engineAudio.loop = true;

let gameActive = false;
let position1 = 0;
let position2 = 0;
let raceDistance = 0;

// Re-calculate based on window resize to ensure responsive finish line
function updateRaceDistance() {
  const trackWidth = track.clientWidth;
  // 150 (car width) + 50 (finish line padding right) + 50 (start line padding left)
  raceDistance = trackWidth - 150 - 50 - 50; 
}

window.addEventListener('resize', updateRaceDistance);

function initGame() {
  position1 = 50; // starts at start-line (left: 50px)
  position2 = 50;
  
  car1.style.left = position1 + 'px';
  car2.style.left = position2 + 'px';
  
  p1ScoreEl.textContent = "0";
  p2ScoreEl.textContent = "0";
  
  statusText.textContent = "WAITING...";
  statusText.style.color = "#fff";
  statusText.style.textShadow = "0 0 20px rgba(255,255,255,0.4)";
  
  track.classList.remove('moving');
  car1.classList.remove('boosting');
  car2.classList.remove('boosting');
  
  gameActive = false;
  updateRaceDistance();
}

startBtn.addEventListener('click', startSequence);
playAgainBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  initGame();
  startSequence();
});

function startSequence() {
  try { winAudio.pause(); winAudio.currentTime = 0; } catch(e){}
  
  overlay.classList.add('hidden');
  countdownEl.classList.remove('hidden');
  
  let count = 3;
  statusText.textContent = "GET READY!";
  
  const countInterval = setInterval(() => {
    countdownEl.textContent = count > 0 ? count : "GO!";
    countdownEl.classList.remove('animate');
    void countdownEl.offsetWidth; // trigger reflow
    countdownEl.classList.add('animate');
    
    if (count === 0) {
      clearInterval(countInterval);
      setTimeout(() => {
        countdownEl.classList.add('hidden');
        startGame();
      }, 500); // Wait half a second for "GO!" to show
    }
    count--;
  }, 1000);
}

function startGame() {
  gameActive = true;
  statusText.textContent = "RACING!";
  statusText.style.color = "var(--neon-blue)";
  statusText.style.textShadow = "0 0 20px var(--neon-blue)";
  track.classList.add('moving');
  
  try {
    engineAudio.currentTime = 0;
    engineAudio.play();
  } catch(e) {}
}

function endGame(winner) {
  gameActive = false;
  track.classList.remove('moving');
  
  car1.classList.remove('boosting');
  car2.classList.remove('boosting');
  
  try {
    engineAudio.pause();
    winAudio.play();
  } catch(e) {}

  setTimeout(() => {
    overlay.classList.remove('hidden');
    startBtn.classList.add('hidden');
    playAgainBtn.classList.remove('hidden');
    
    if(winner === 1) {
      statusText.textContent = "P1 WINS!";
      statusText.style.color = "var(--neon-red)";
      statusText.style.textShadow = "0 0 20px var(--neon-red)";
      
      overlayTitle.textContent = "PLAYER 1 WINS!";
      overlayTitle.style.background = "linear-gradient(90deg, #ff2a2a, #ff7b7b)";
      overlayTitle.style.webkitBackgroundClip = "text";
    } else {
      statusText.textContent = "P2 WINS!";
      statusText.style.color = "var(--neon-blue)";
      statusText.style.textShadow = "0 0 20px var(--neon-blue)";
      
      overlayTitle.textContent = "PLAYER 2 WINS!";
      overlayTitle.style.background = "linear-gradient(90deg, #00e5ff, #7bfcff)";
      overlayTitle.style.webkitBackgroundClip = "text";
    }
  }, 500);
}

// Calculate the random speed boost slightly to make it more fun, but mostly keypress dependent
document.addEventListener("keydown", function (event) {
  if(!gameActive) return;
  
  const key = event.key;
  if(key === "ArrowUp") event.preventDefault(); // prevent scroll
  
  // Base step size -> Need approx 35 clicks to win. Let's make it fixed ratio of track
  const step = raceDistance / 35; 
  
  if (key === "w" || key === "W") {
    position1 += step + (Math.random() * 2); // tiny random boost for variation
    p1ScoreEl.textContent = Math.floor(((position1 - 50) / raceDistance) * 220); // MPH display
    car1.style.left = position1 + "px";
    
    car1.classList.add('boosting');
    clearTimeout(car1.boostTimeout);
    car1.boostTimeout = setTimeout(() => car1.classList.remove('boosting'), 150);
    
    if (position1 >= 50 + raceDistance) {
      car1.style.left = (50 + raceDistance) + "px"; // snap to finish line
      endGame(1);
    }
  }
  
  if (key === "ArrowUp") {
    position2 += step + (Math.random() * 2);
    p2ScoreEl.textContent = Math.floor(((position2 - 50) / raceDistance) * 220);
    car2.style.left = position2 + "px";
    
    car2.classList.add('boosting');
    clearTimeout(car2.boostTimeout);
    car2.boostTimeout = setTimeout(() => car2.classList.remove('boosting'), 150);
    
    if (position2 >= 50 + raceDistance) {
      car2.style.left = (50 + raceDistance) + "px";
      endGame(2);
    }
  }
});

// Initialize on load
initGame();
