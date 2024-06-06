const Gameboard = (function() {
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

    function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
        let board = createBoard();

        const players = [
            {
                name: playerOneName,
                mark: 'X',
                score: 0
            },
            {
                name: playerTwoName,
                mark: 'O',
                score: 0
            }
        ];

        let activePlayer = players[0];
        let gameOver = false;

        const getActivePlayer = () => activePlayer;

        const switchPlayer = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
            console.log(`${getActivePlayer().name}'s(${getActivePlayer().mark}) turn`);
        };

        const checkWinner = (mark) => {
            // Check rows
            for (let i = 0; i < ROWS; i++) {
                if (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) {
                    return true;
                }
            }
            // Check columns
            for (let i = 0; i < COLS; i++) {
                if (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark) {
                    return true;
                }
            }
            // Check diagonals
            if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) {
                return true;
            }
            if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) {
                return true;
            }
            return false;
        };

        const playRound = (x, y) => {
            if (gameOver) {
                console.log("The game is already over.");
                return;
            }

            if (x < 0 || x > 2 || y < 0 || y > 2 || board[x][y] !== null) {
                console.log("Invalid move");
                return;
            }
            
            board[x][y] = getActivePlayer().mark;
            console.table(board);

            if (checkWinner(getActivePlayer().mark)) {
                console.log(`${getActivePlayer().name} wins!`);
                gameOver = true;
                getActivePlayer().score++;
                return;
            }

            if (board.every(row => row.every(cell => cell !== null))) {
                console.log("It's a tie!");
                gameOver = true;
                return;
            }

            switchPlayer();
        };

        function resetRound() {
            board = createBoard();
            activePlayer = players[0];
            gameOver = false;
        }

        function getScore() {
            console.log(`Scores:\n${players[0].name}: ${players[0].score}\n${players[1].name}: ${players[1].score}`);
        }

        function resetScores() {
            players.forEach(player => player.score = 0);
            gameOver = false;
        }

        function setPlayerNames(playerOneName, playerTwoName) {
            players[0].name = playerOneName;
            players[1].name = playerTwoName;
        }

        return { playRound, resetRound, getScore, resetScores, setPlayerNames };
    }

    return { GameController };
})();

const game = Gameboard.GameController();