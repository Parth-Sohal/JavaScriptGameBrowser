const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

const trackLength = 50;
let p1Pos = 0;
let p2Pos = 0;
let gameActive = false;

function drawTrack() {
  console.clear();
  console.log("\x1b[36m=== 🏎️ CLI NEON DRIFT 🏎️ ===\x1b[0m");
  console.log("Player 1: \x1b[31m'w'\x1b[0m | Player 2: \x1b[34m'Up Arrow'\x1b[0m (or 'p')\n");
  
  if (!gameActive && p1Pos === 0 && p2Pos === 0) {
    console.log("\x1b[32m>> Press SPACE to Start! <<\x1b[0m");
  } else if (!gameActive) {
    if (p1Pos >= trackLength) console.log("\x1b[31;1m🏆 PLAYER 1 WINS! 🏆\x1b[0m");
    else if (p2Pos >= trackLength) console.log("\x1b[34;1m🏆 PLAYER 2 WINS! 🏆\x1b[0m");
    console.log("\nPress SPACE to Play Again or \x1b[33mCTRL+C\x1b[0m to Exit.");
  } else {
    console.log("\x1b[35m>>> RACING! <<<\x1b[0m");
  }
  
  console.log("\n========================================================|");
  
  // Track P1
  let p1Track = "";
  for(let i=0; i<trackLength; i++) {
    if (i === p1Pos) p1Track += "🚗";
    else p1Track += "-";
  }
  // Ensure exactly trackLength characters before finish line
  if(p1Pos >= trackLength) p1Track = "-".repeat(trackLength) + "🚗";
  
  console.log("\x1b[31mP1\x1b[0m  " + p1Track.padEnd(trackLength, '-') + "\x1b[37;1m| FINISH\x1b[0m");
  
  console.log("--------------------------------------------------------|");
  
  // Track P2
  let p2Track = "";
  for(let i=0; i<trackLength; i++) {
    if (i === p2Pos) p2Track += "🚙";
    else p2Track += "-";
  }
  if(p2Pos >= trackLength) p2Track = "-".repeat(trackLength) + "🚙";
  console.log("\x1b[34mP2\x1b[0m  " + p2Track.padEnd(trackLength, '-') + "\x1b[37;1m| FINISH\x1b[0m");
  
  console.log("========================================================|");
}

drawTrack();

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  
  if (!gameActive) {
    if (key.name === 'space') {
      p1Pos = 0;
      p2Pos = 0;
      gameActive = true;
      drawTrack();
    }
    return;
  }
  
  if (key.name === 'w') {
    p1Pos++;
    drawTrack();
    if (p1Pos >= trackLength) {
      gameActive = false;
      drawTrack();
    }
  }
  
  if (key.name === 'up' || key.name === 'p') {
    p2Pos++;
    drawTrack();
    if (p2Pos >= trackLength) {
      gameActive = false;
      drawTrack();
    }
  }
});
