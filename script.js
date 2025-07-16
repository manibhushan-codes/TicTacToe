const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const resultMessage = document.getElementById('result-message');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameActive = false;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
  startScreen.classList.add('hidden');
  resetGame();
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s turn`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  statusText.textContent = `${currentPlayer}'s turn`;
  endScreen.classList.add('hidden');
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      showEndPopup(`${board[a]} wins!`);
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    showEndPopup("It's a draw!");
  }
}

function showEndPopup(message) {
  resultMessage.textContent = message;
  endScreen.classList.remove('hidden');
}

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleClick));
