const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

function createBoard() {
  message.style.background = "orange";
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
  message.textContent = `Player ${currentPlayer}'s turn`;
  gameActive = true;
}

function handleMove(index) {
  if (!gameActive || cells[index].textContent) return;

  cells[index].textContent = currentPlayer;
  if (checkWinner()) {
    gameActive = false;
    message.textContent = `Player ${currentPlayer} wins!`;
    message.style.background = "green";
    if (currentPlayer === "X") {
      scoreX++;
      scoreXDisplay.textContent = scoreX;
    } else {
      scoreO++;
      scoreODisplay.textContent = scoreO;
    }
  } else if (cells.every((cell) => cell.textContent)) {
    gameActive = false;
    message.textContent = "It's a draw!";
    message.style.background = "orange";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
    message.style.background = "pink";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent === currentPlayer &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
  }
  return false;
}

restartButton.addEventListener("click", () => {
  currentPlayer = "X";
  createBoard();
});

createBoard();
