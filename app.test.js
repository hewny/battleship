// const shipFactory = require("./app");
// const gameBoard = require("./app");

// var { Ship, Gameboard } = require("./app");
import {Ship, Gameboard } from "./app.js"

test("creating ship object with legnth of 5", () => {
  expect(Ship(5).ship).toStrictEqual([, , , , ,]);
});

test("hit a ship at index 2", () => {
  let temp = Ship(4);
  temp.hit(2);
  expect(temp.ship[2]).toBe(1);
});

test("check if ship is sunk (1)", () => {
  let temp = Ship(3);
  expect(temp.isSunk()).toBe(false);
});

test("check if ship is sunk (2)", () => {
  let temp = Ship(2);
  temp.hit(0);
  temp.hit(1);
  expect(temp.isSunk()).toBe(true);
});

test("check if gameBoard has 100 elements", () => {
  expect(Gameboard().board.length).toBe(100);
});

test("place ship horizontally with length of 2 at index 0", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(2, 4), 0, false);
  expect(temp.board.slice(0, 2)).toStrictEqual([40, 41]);
});

test("place ship vertically with length of 3 at index 0", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(3, 3), 0, true);
  let tempArray = [];
  for (let i = 0; i < 100; i = i + 10) {
    if (temp.board[i] === 30 || temp.board[i] === 31 || temp.board[i] === 32) {
      tempArray.push(temp.board[i]);
    }
  }
  expect(tempArray).toStrictEqual([30, 31, 32]);
});

test("place ship in invalid space (1)", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(5, 0), 0, false);
  expect(temp.placeShip(Ship(5, 0), 0, false)).toBe(false);
});

test("place ship in invalid space (2)", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(5, 0), 10, false);
  expect(temp.placeShip(Ship(4, 1), 2, true)).toBe(false);
});

test("attack a ship at index 5 and miss", () => {
  let temp = Gameboard();
  expect(temp.attackShip(5)).toBe(false);
  expect(temp.board[5]).toBe("miss");
});

test("attack a ship at index 3 and hit", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(5, 0), 0, false);
  expect(temp.attackShip(3)).toBe(true);
});

test("identify ship id", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(5, 0), 0, false);
  expect(temp._identifyShip(1)).toBe(0);
});

test("identify ship piece", () => {
  let temp = Gameboard();
  temp.placeShip(Ship(4, 1), 0, false);
  expect(temp._identifyPiece(3)).toBe(3);
});