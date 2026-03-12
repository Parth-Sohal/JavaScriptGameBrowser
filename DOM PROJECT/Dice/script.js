"use strict";

// const { act } = require("react");

//selecting classes and id i need
const newGame = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");
dice.classList.add("hidden");

// top- score
const scoreTop1 = document.getElementById("score--0");
const scoreTop2 = document.getElementById("score--1");

//changing-score

const currentPly1 = document.getElementById("current--0");
const currentPly2 = document.getElementById("current--1");

const scores = [0, 0];
let total = 0;
let active = 0;

const click = new Audio("mouseClick.mp3");
const win = new Audio("victory.mp3");
const sup = new Audio("sup.mp3");

click.load();
win.load();
sup.load();

const chnage = function () {
  document.querySelector(`#current--${active}`).textContent = 0;
  total = 0;
  active = active === 0 ? 1 : 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

roll.addEventListener("click", function () {
  click.play();
  let randomNum = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${randomNum}.png`;
  dice.classList.remove("hidden");

  if (randomNum === 1) {
    sup.play();
    total = 0;
    chnage();
  } else {
    total += randomNum;
    document.querySelector(`#current--${active}`).textContent = total;
  }
});

hold.addEventListener("click", function () {
  click.play();
  scores[active] += total;
  document.getElementById(`score--${active}`).textContent = scores[active];
  if (scores[active] >= 50) {
    win.play();
    document.getElementById("current--0").textContent = 0;
    document.getElementById("current--1").textContent = 0;
    dice.classList.add("hidden");
    document.querySelector("body").style.backgroundImage =
      "linear-gradient(to top left,rgb(4, 59, 20) 0%,rgb(24, 188, 234) 100%)";
    document
      .querySelector(`.player--${active}`)
      .classList.add("player--winner");

    roll.classList.add("hidden");

    hold.classList.add("hidden");
  } else {
    chnage();
  }
});

newGame.addEventListener("click", function () {
  win.pause();
  win.currentTime = 0;
  click.play();
  click.currentTime = 0;

  scores[0] = 0;
  scores[1] = 0;
  total = 0;

  document
    .querySelector(`.player--${active}`)
    .classList.remove("player--winner");
  active = 0;

  roll.classList.remove("hidden");
  hold.classList.remove("hidden");

  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");

  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;

  document.querySelector("body").style.backgroundImage =
    "linear-gradient(to top left, #753682 0%, #bf2e34 100%)";
});
