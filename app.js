import { updateStatusMsg } from "./dom.js";

const Ship = (length, identifier) => {
  let ship = new Array(length);
  let id = identifier;

  let hit = (index) => {
    ship[index] = 1;
  };

  let isSunk = () => {
    if (ship.includes(undefined)) {
      return false;
    } else {
      return true;
    }
  };

  return { ship, id, hit, isSunk };
};

const Gameboard = () => {
  let board = [];
  let ships = [];
  let hitCount = 0;

  for (let i = 0; i < 100; i++) {
    board.push(null);
  }

  ships.push(Ship(5, 0));
  ships.push(Ship(4, 1));
  ships.push(Ship(3, 2));
  ships.push(Ship(3, 3));
  ships.push(Ship(2, 4));

  let placeShip = (Ship, index, vertical) => {
    // return _canPlace(Ship.ship.length, index, vertical)
    if (_canPlace(Ship.ship.length, index, vertical)) {
      if (vertical === true) {
        for (let i = 0; i < Ship.ship.length; i++) {
          board[index + i * 10] = Ship.id * 10 + i;
        }
      } else {
        for (let i = 0; i < Ship.ship.length; i++) {
          board[index + i] = Ship.id * 10 + i;
        }
      }
    } else {
      return false;
    }
  };

  let _canPlace = (shipLength, index, vertical) => {
    let result = false;

    if (vertical === true) {
      for (let i = 0; i < shipLength; i++) {
        if (board[index + i * 10] !== null) {
          result = false;
          break
        } else {
          result = true;
        }
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        if (board[index + i] !== null) {
          result = false;
          break
        } else {
          result = true;
        }
      }
    }

    return result;
  };

  let attackShip = (index) => {
    if (board[index] === "hit" || board[index] === "miss") {
      updateStatusMsg(5)
      return false
    }
    
    if (board[index] !== null && board[index] !== "miss") {
      let shipIndex = _identifyShip(index);
      let shipPiece = _identifyPiece(index);
      hitCount++;
      board[index] = "hit";
      // call & update the ship obj
      ships[shipIndex].hit[shipPiece];
      updateStatusMsg(3)
      return true;
    } else {
      board[index] = "miss";
      updateStatusMsg(4)
      return false;
    }
  };
  let _identifyShip = (index) => {
    return Math.floor(board[index] / 10);
  };

  let _identifyPiece = (index) => {
    return board[index] % 10;
  };

  let allShipSunk = () => {
    if (hitCount === 17) {
      return true;
    } else {
      return false;
    }
  };

  return {
    board,
    ships,
    placeShip,
    attackShip,
    allShipSunk,
    _identifyShip,
    _identifyPiece,
  };
};

const Player = () => {
  const ship1 = Ship(5, 1);
  const ship2 = Ship(4, 2);
  const ship3 = Ship(3, 3);
  const ship4 = Ship(3, 4);
  const ship5 = Ship(2, 5);

  return { ship1, ship2, ship3, ship4, ship5 };
};

// module.exports = {
//   Ship,
//   Gameboard,
//   Player,
// };

export {Ship, Gameboard, Player}
// number of ships = 5
// ship lengths = 5,4,3,3,2

// carrier = 5 // ID = 0
// battleship = 4 // ID = 1
// destroyer = 3 // ID = 2
// submarine = 3 // ID = 3
// patrol boat = 2 // ID = 4
