"use strict";

// State
let p1Score = 0;
let p2Score = 0;
let isPlaying = false;

// DOM Elements
const playerScoreEl = document.querySelector("#p1-score");
const computerScoreEl = document.querySelector("#p2-score");
const playerChosenEl = document.querySelector(".player-chosen");
const computerChosenEl = document.querySelector(".computer-chosen");
const playerPlaceholder = document.querySelector(".placeholder.glow-player");
const computerPlaceholder = document.querySelector(".placeholder.glow-comp");
const statusMessage = document.getElementById("status");
const choiceBtns = document.querySelectorAll(".choice-btn");

const playerScoreBox = document.querySelector(".player-score-box");
const computerScoreBox = document.querySelector(".computer-score-box");

// Images Mapping
const images = {
  rock: "rock.jpeg",
  paper: "papeer.png",
  scissor: "scissor.jpeg"
};

const choices = ["rock", "paper", "scissor"];

// Determine winner logic: returns 1 if player wins, 0 if computer wins, -1 for draw
const determineWinner = (player, computer) => {
  if (player === computer) return -1;
  if (
    (player === "rock" && computer === "scissor") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissor" && computer === "paper")
  ) {
    return 1;
  }
  return 0;
};

// Play Game
const playGame = (playerChoice) => {
  if (isPlaying) return;
  isPlaying = true;

  // Reset ui classes for animation
  statusMessage.textContent = "Wait for it...";
  statusMessage.className = "status-message";
  
  // Show rock initially for the shake animation
  playerChosenEl.src = images.rock;
  computerChosenEl.src = images.rock;
  playerChosenEl.classList.remove("hidden");
  computerChosenEl.classList.remove("hidden");
  playerPlaceholder.classList.add("hidden");
  computerPlaceholder.classList.add("hidden");

  // Add shaking class
  playerChosenEl.classList.add("shake-player");
  computerChosenEl.classList.add("shake-computer");
  
  // Computer chooses
  const randomChoice = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomChoice];

  // Wait for animation to finish (3 loops of 0.5s = 1.5s total)
  setTimeout(() => {
    // Stop shaking
    playerChosenEl.classList.remove("shake-player");
    computerChosenEl.classList.remove("shake-computer");

    // Reveal choices
    playerChosenEl.src = images[playerChoice];
    computerChosenEl.src = images[computerChoice];

    // Determine result
    const result = determineWinner(playerChoice, computerChoice);
    if (result === 1) {
      statusMessage.textContent = "You Win!";
      statusMessage.classList.add("status-win");
      p1Score++;
      playerScoreEl.textContent = p1Score;
      // Pulse animation
      playerScoreBox.classList.remove("pulse-win");
      void playerScoreBox.offsetWidth; // trigger reflow
      playerScoreBox.classList.add("pulse-win");
    } else if (result === 0) {
      statusMessage.textContent = "Computer Wins!";
      statusMessage.classList.add("status-lose");
      p2Score++;
      computerScoreEl.textContent = p2Score;
      // Pulse animation
      computerScoreBox.classList.remove("pulse-win");
      void computerScoreBox.offsetWidth;
      computerScoreBox.classList.add("pulse-win");
    } else {
      statusMessage.textContent = "It's a Draw!";
      statusMessage.classList.add("status-draw");
    }

    // Allow next play after brief pause to review result
    setTimeout(() => {
      isPlaying = false;
    }, 500);
    
  }, 1500);
};

// Event Listeners
choiceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.choice;
    playGame(choice);
  });
});
