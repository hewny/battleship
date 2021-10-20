import { makeMove, player1, player2 } from "./game.js";

let eventListener = false;

function drawGrid(aiFlag) {
  let i = 0;
  let iMax = 100;
  let str = ".container";
  let container = document.getElementById("container1");

  if (aiFlag) {
    i = 100;
    str = ".container2";
    iMax = 200;
    container = document.getElementById("container2");
  }
  // delete all divs
  container.querySelectorAll(".box").forEach((box) => box.remove());

  // create new divs
  for (i; i < iMax; i++) {
    let newDiv = document.createElement("div");
    newDiv.id = i;
    newDiv.className = "box";
    newDiv.style.opacity = 1;
    container.appendChild(newDiv);
    // newDiv.addEventListener("mouseover", addBackground);
  }

  // update grid columns and rows
  let r = document.querySelector(":root");
  r.style.setProperty("--value", 10);

  //   add event listeners for hover

  if (!eventListener && aiFlag) {
    let boxes = Array.from(document.querySelectorAll(".box"));
    boxes.forEach((box) =>
      box.addEventListener("mouseover", function (event) {
        // add hover effects when placing ships???
        console.log(event.target);
      })
    );
    boxes.forEach((box) =>
      box.addEventListener("click", function (e) {
        makeMove(e.target.id);
      })
    );
    eventListener = true;
  }
}

// function addBackground(e) {
//   // e.target.style.backgroundColor = 'black';
//   e.target.style.backgroundColor =
//     "#" + ((Math.random() * 0xffffff) << 0).toString(16);
//   console.log(e.target.style.opacity);
//   e.target.style.opacity -= 0.1;
//   console.log(e.target.style.opacity);
// }

function drawShips(aiFlag) {
  let offSet = 0;
  let target = player1;

  if (aiFlag) {
    offSet = 100;
    target = player2;
  }

  // wipe all previous backgroundColors
  for (let i = 0; i < 100; i++) {
    document.getElementById(i + offSet).style.backgroundColor = "";
  }

  for (let i = 0; i < 100; i++) {
    if (target.board[i] === "hit") {
      document.getElementById(i + offSet).style.backgroundColor = "#DE3163";
    } else if (target.board[i] === "miss") {
      document.getElementById(i + offSet).style.backgroundColor = "#6495ED";
    } else if (target.board[i] !== null) {
      document.getElementById(i + offSet).style.backgroundColor = "#9FE2BF";
    }
  }
}

function updateStatusMsg(msgFlag) {
  let msg = document.getElementsByClassName("status");

  switch (msgFlag) {
    case 1:
      msg[0].innerHTML = "It is player's turn to attack";
      break;
    case 2:
      msg[0].innerHTML = "It is AI's turn to attack";
      break;
    case 3:
      msg[0].innerHTML = "Successful Hit";
      break;
    case 4:
      msg[0].innerHTML = "Missed!";
      break;
    case 5:
      msg[0].innerHTML =
        "You have already attacked this location. Please select a new location";
      break;
    case 6:
      msg[0].innerHTML = "Please select a location on your opponent's board";
      break;
    case 7:
      msg[0].innerHTML = "Player win!";
      break;
    case 8:
      msg[0].innerHTML = "AI win!";
      break;
    case 9:
      msg[0].innerHTML = "Game Over, unable to make a move.";
    default:
      msg[0].innerHTML = "unknown error";
  }
}

export { drawGrid, drawShips, updateStatusMsg };
