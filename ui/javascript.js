const playerTurnDiv = document.querySelector(".turn");

const Gameboard = (function () {
  const ROWS = 3;
  const COLS = 3;

  function createBoard() {
    const board = [];
    for (let i = 0; i < ROWS; i++) {
      board[i] = [];
      for (let j = 0; j < COLS; j++) {
        board[i].push(null);
      }
    }
    return board;
  }

  function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    let board = createBoard();

    const players = [
      {
        name: playerOneName,
        mark: "X",
      },
      {
        name: playerTwoName,
        mark: "O",
      },
    ];

    let activePlayer = players[0];
    let gameOver = false;

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      playerTurnDiv.textContent = `${getActivePlayer().name}'s(${getActivePlayer().mark}) turn`;
    };

    const checkWinner = (mark) => {
      for (let i = 0; i < ROWS; i++) {
        if (
          board[i][0] === mark &&
          board[i][1] === mark &&
          board[i][2] === mark
        ) {
          return true;
        }
      }
      for (let i = 0; i < COLS; i++) {
        if (
          board[0][i] === mark &&
          board[1][i] === mark &&
          board[2][i] === mark
        ) {
          return true;
        }
      }
      if (
        board[0][0] === mark &&
        board[1][1] === mark &&
        board[2][2] === mark
      ) {
        return true;
      }
      if (
        board[0][2] === mark &&
        board[1][1] === mark &&
        board[2][0] === mark
      ) {
        return true;
      }
      return false;
    };

    const playRound = (x, y) => {
      if (gameOver) return;

      if (x < 0 || x > 2 || y < 0 || y > 2 || board[x][y] !== null) return;

      board[x][y] = getActivePlayer().mark;

      if (checkWinner(getActivePlayer().mark)) {
        playerTurnDiv.textContent = `The winner is ${getActivePlayer().name}(${getActivePlayer().mark})`;
        gameOver = true;
        return;
      }

      if (board.every((row) => row.every((cell) => cell !== null))) {
        playerTurnDiv.textContent = "It's a tie!";
        gameOver = true;
        return;
      }

      switchPlayer();
    };

    return { playRound, getActivePlayer, board, gameOver };
  }

  return { GameController };
})();

const ScreenController = function () {
  const game = Gameboard.GameController();
  const wrap = document.querySelector(".wrap");
  const boardDiv = document.querySelector(".gameboard");
  const resetGame = document.querySelector(".resetGame");
  playerTurnDiv.textContent = `${game.getActivePlayer().name}'s(${game.getActivePlayer().mark}) turn`;

  const updateScreen = function () {
    boardDiv.textContent = "";
    game.board.forEach((row, idx) => {
      row.forEach((col, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = idx;
        cellButton.dataset.col = index;
        cellButton.textContent = col !== null ? col : null;
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandler(e) {
    const selectedRow = e.target.dataset.row;
    const selectedCol = e.target.dataset.col;
    if (!selectedCol || !selectedRow) return;
    game.playRound(selectedRow, selectedCol);
    updateScreen();
  }

  wrap.addEventListener("click", (e) => {
    let btn = e.target.classList.value;
    switch (btn) {
      case "cell":
        clickHandler(e);
        break;
      case "resetGame":
        ScreenController();
        game.gameOver = false;
        break;
    }
  });
  updateScreen();
};
ScreenController();