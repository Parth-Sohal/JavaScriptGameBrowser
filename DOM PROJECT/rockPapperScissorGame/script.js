"use strcit";
//score board
const playerScore = document.querySelector("#p1-score");
const computer = document.getElementById("p2-score");

//
const box_1 = document.querySelector(".box-i");
const box_2 = document.querySelector(".box-ii");
//

const rockSelector = document.querySelector(".rock-1");
const papperSelector = document.querySelector(".paper-1");
const scissorSelector = document.querySelector(".scissor-1");

const Shown_1 = document.querySelector(".player-1Chose");
const shown_2 = document.querySelector(".compuetrChoose-2");

const arr = [rockSelector, papperSelector, scissorSelector];

const check = function (a, b) {
  switch (a) {
    case rockSelector:
      switch (b) {
        case papperSelector:
          return 0;
        case scissorSelector:
          return 1;
        default:
          return "draw";
      }

    case papperSelector:
      switch (b) {
        case papperSelector:
          return "draw";
        case scissorSelector:
          return 0;
        default:
          return 1;
      }

    case scissorSelector:
      switch (b) {
        case papperSelector:
          return 1;
        case scissorSelector:
          return "draw";
        default:
          return 0;
      }

    default:
      return "Invalid input";
  }
};

for (let i = 0; i < arr.length; i++) {
  arr[i].addEventListener("click", function () {
    const randomNumber = Math.trunc(Math.random() * 3);
    // console.log(randomNumber);
    // console.log(arr[i].src);
    Shown_1.src = arr[i].src;
    Shown_1.classList.remove("hidden");
    shown_2.src = arr[randomNumber].src;
    shown_2.classList.remove("hidden");
    const value = check(arr[i], arr[randomNumber]);
    console.log(value);
    if (value === 1) {
      playerScore.textContent++;
      box_1.classList.add("green-color");
      box_2.classList.remove("green-color");
    } else if (value === 0) {
      box_2.classList.add("green-color");
      box_1.classList.remove("green-color");
      computer.textContent++;
    }
  });
}
