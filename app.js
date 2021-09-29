const shipFactory = (length) => {
  var ship = [];

  for (let i = 0; i < length; i++) {
    ship.push(0);
  }

  hit = (index) => {
    ship[index] = 1;
  };

  isSunk = () => {
    if (ship.includes(0)) {
      return false;
    } else {
      return true;
    }
  };

  return { ship, hit, isSunk };
};

const gameBoard = () => {

}

module.exports = shipFactory, gameBoard;

// number of ships = 5
// ship lengths = 5,4,3,3,2
