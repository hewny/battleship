const shipFactory = require("./app");
const gameBoard = require("./app");

test("creating ship object with legnth of 5", () => {
  expect(shipFactory(5).ship).toStrictEqual([0, 0, 0, 0, 0]);
});

test("hit a ship at index 2", () => {
  let temp = shipFactory(4);
  temp.hit(2);
  expect(temp.ship[2]).toBe(1);
});

test("check if ship is sunk (1)", () => {
  let temp = shipFactory(3);
  expect(temp.isSunk()).toBe(false);
});

test("check if ship is sunk (2)", () => {
  let temp = shipFactory(2);
  temp.hit(0);
  temp.hit(1);
  expect(temp.isSunk()).toBe(true);
});

test("", () => {});
