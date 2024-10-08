let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#ms");

let turnIndex = 0; // To track the current player (0: 😁, 1: 😎, 2: 😉)
let count = 0; // To Track Draw 

const players = ["😁", "😎", "😉"]; // List of players
const winPatterns = [
  [0, 1, 2, 3],
  [0, 4, 8, 12],
  [0, 5, 10, 15],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [3, 6, 9, 12],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15]
];

const resetGame = () => {
  turnIndex = 0;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = players[turnIndex];
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 16 && !isWinner) {
      gameDraw();
    }

    // Move to the next player
    turnIndex = (turnIndex + 1) % 3;
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    let pos4Val = boxes[pattern[3]].innerText;

    if (pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos4Val) {
        showWinner(pos1Val);
        return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
