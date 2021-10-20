import { Ship, Gameboard, Player } from "./app.js";
import { drawGrid, drawShips, updateStatusMsg } from "./dom.js";

const player1 = Gameboard();
const player2 = Gameboard();
var gameState;
var winner;
var gameTurn;
var aiMove = _shuffleMoves(Array.from(Array(100).keys()));
var aiLastMove;

function initalize() {
  // remove default after implementing click to add
  // defaultPlacement();
  drawGrid();
  drawGrid("ai");
  defaultPlacement();
  drawShips();
  drawShips("ai");

  gameTurn = "player";
  updateStatusMsg(1);
}

function gameStart() {
  initalize();
  while (gameState) {}
}

function makeMove(index) {
  if (gameState === false) {
    console.log("game is over, unable to make a move");
  } else if (gameTurn === "player") {
    if (index < 100) {
      updateStatusMsg(6);
    } else {
      player2.attackShip(index - 100);
      drawShips("ai");
      gameTurn = "ai";
      _checkWinner();
    }
    // console.log(`it is player's turn and has clicked on ${index}`);
  } else if (gameTurn === "ai") {
    console.log(`it is ai's turn and has clicked on ${index}`);
    player1.attackShip(index);
    drawShips();
    gameTurn = "player";
    _checkWinner();
  }
}

function _checkWinner() {
  if (player1.allShipSunk()) {
    gameState = false;
    winner = "ai";
    updateStatusMsg(8);
  } else if (player2.allShipSunk()) {
    gameState = false;
    winner = "player";
    updateStatusMsg(7);
  } else {
    randomMove();
  }
}

function defaultPlacement() {
  player1.placeShip(player1.ships[0], 0, false);
  player1.placeShip(player1.ships[1], 20, true);
  player1.placeShip(player1.ships[2], 70, false);
  player1.placeShip(player1.ships[3], 79, true);
  player1.placeShip(player1.ships[4], 54, true);
  // console.log(player1);
  player2.placeShip(player2.ships[0], 3, false);
  player2.placeShip(player2.ships[1], 22, true);
  player2.placeShip(player2.ships[2], 75, false);
  player2.placeShip(player2.ships[3], 59, true);
  player2.placeShip(player2.ships[4], 44, true);
}

function timeOut(length) {
  setTimeout(() => {
    console.log(`waiting for ${length} miliseconds`);
  }, length);
}

function _shuffleMoves(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function randomMove() {
  makeMove(aiMove.pop());
}

export { player1, player2, initalize, gameStart, makeMove };

// //  INITIAL SETUP
// - create 2 boards
// - place ships on both boards

// // GAME LOOP
// - at the beginning of any turn check gameboard's allShipSunk
// - if not, have player/AI choose a spot
// - check for hit or miss
