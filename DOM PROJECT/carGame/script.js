"use strict";

let player1Click = document.querySelector(".player-1_score");
let player2Click = document.querySelector(".player-2_score");

const playAgain = document.querySelector(".Play-again");
const winnerKoon = document.querySelector(".race-btn");

let score1 = 0;
let score2 = 0;

let start = 20;
let start2 = 20;

const winner3 = document.getElementById("race-btn");
const carMove = document.querySelector(".car-1");
const car2Move = document.querySelector(".car-2");

const winAudio = new Audio("victory.mp3");
// const lambo = new Audio("lambo.mp3");

console.log(player1Click.textContent, player2Click.textContent);

let flag = true;

const resetFunctionn = function () {
  score1 = 0;
  score2 = 0;
  start = 20;
  start2 = 20;
  flag = true;
};

resetFunctionn();

const winner = function (a, b) {
  console.log("1");

  if (a === 45) {
    // lambo.pause();
    winner3.textContent = "Player 1 won";
    flag = false;
    document.querySelector("body").style.backgroundColor = "red";

    winAudio.play();
  }

  if (b === 45) {
    // lambo.pause();
    winner3.textContent = "Player 2 won";
    flag = false;
    document.querySelector("body").style.backgroundColor = "blue";

    winAudio.play();
  }
};

document.addEventListener("keydown", function (event) {
  console.log(event.key);
//   lambo.currentTime = 0;
  if (flag) {
    winner(score1, score2);
    if (event.key === "w") {
    //   lambo.play();
      start += 30;
      carMove.style.left = start + "px";
      score1++;
      player1Click.textContent = score1;
    }
    if (event.key === "ArrowUp") {
    //   lambo.play();
      start2 += 30;
      car2Move.style.left = start2 + "px";
      score2++;
      player2Click.textContent = score2;
    }
  }
});

playAgain.addEventListener("click", function () {
  player1Click.textContent = 0;
  player2Click.textContent = 0;
//   lambo.pause();
//   lambo.currentTime = 0;
  carMove.style.left = 20 + "px";
  car2Move.style.left = 20 + "px";

  winner3.textContent = "Lets Race";
  document.querySelector("body").style.backgroundColor = "#f0f0f0";
  winAudio.pause();
  winAudio.currentTime = 0;
  resetFunctionn();
});
