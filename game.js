const ROWS = 6;
const COLS = 7;
const board = document.getElementById('board');
let currentPlayer = 'red';
let gameGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);
const currentPlayerText = document.getElementById('currentPlayerText');
currentPlayerText.textContent = `Current Turn: Player 1`;
let winningArray = [];

// This function is to render the board on the web page as per the rows and columns
function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = createCell(row, col);
            if (gameGrid[row][col]) {
                cell.classList.add(gameGrid[row][col]);
            }
            board.appendChild(cell);
        }
    }
}

// This function created each cell on the board
function createCell(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', () => playerHandler(col));
    cell.addEventListener('mouseover', () => HoverHandler(col, true));
    cell.addEventListener('mouseout', () => HoverHandler(col, false));
    return cell;
}


// This function is to handle the mouseover and mouseout over the board
function HoverHandler(col, checkHover) {
    const columnCells = document.querySelectorAll(`[data-col='${col}']`);
    if (checkHover) {
        const lowestEmptyRow = cellEntry(col);
        if (lowestEmptyRow !== -1) {
            columnCells[lowestEmptyRow].classList.add('hover');
        }
        columnCells.forEach(cell => {
            cell.classList.add('hover-column');
        });
    } else {
        columnCells.forEach(cell => {
            cell.classList.remove('hover', 'hover-column');
        });
    }
}

// Whenever the player turn changes, this updated the turn of the player dynamically on the webpage
function updateCurrentPlayerText() {
    currentPlayerText.textContent = `Current Turn: ${currentPlayer === 'red' ? 'Player 1' : 'Player 2'}`;
}

// This funtion handles each player's move and updates the board
function playerHandler(col) {
    const row = cellEntry(col);
    if (row !== -1) {
        gameGrid[row][col] = currentPlayer;
        renderBoard();
        if (checkForDraw()) {
            setTimeout(() => {
                alert("It's a draw!");
                resetGame();
            }, 100);
        } else {
            checkWinner(row, col, currentPlayer);
        }
        currentPlayer = currentPlayer === 'red' ? 'green' : 'red';
        updateCurrentPlayerText();
        
        
    }
}

// Here I am checking if the entire board is full, when the players can not make a move
function checkForDraw() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!gameGrid[row][col]) {
                return false;
            }
        }
    }
    return true;
}

// This is to check where we can the enter each player's move
function cellEntry(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!gameGrid[row][col]) {
            return row;
        }
    }
    return -1;
}


// This is to check for winner afer every move is made
function checkWinner(row, col, currentPlayer) {
    if (
        checkEachSide(row, col, 0, 1) || 
        checkEachSide(row, col, 1, 0) ||
        checkEachSide(row, col, 1, 1) || 
        checkEachSide(row, col, 1, -1)  
    ) {
        animateCells();
        setTimeout(() => {
            alert(`Congrats, Player ${currentPlayer === 'red' ? '1' : '2'} wins!`);
            resetGame();
        }, 100);
    }
}


// This function will add glowing effect to the 4 cells contributed to the win
function animateCells() {
    for (let cell of winningArray) {
        const { row, col } = cell;
        const cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cellElement.classList.add('winning-animation');
    }
}

//This function checks for count of 4 on all sides(Horizontal, Vertical and two diagonals and updates the count)
function checkEachSide(row, col, dr, dc) {
    const player = gameGrid[row][col];
    let count = 1;
    let tempWinningArray = [{ row, col }];
    count += totalCount(row, col, player, dr, dc, tempWinningArray);
    count += totalCount(row, col, player, -dr, -dc, tempWinningArray);
    if (count >= 4) {
        winningArray = tempWinningArray;
        return true;
    } else {
        winningArray = [];
        return false;
    }
}

// This function checks the count of consecutive cells
function totalCount(row, col, player, dr, dc, tempWinningArray) {
    let r = row + dr;
    let c = col + dc;
    let count = 0;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameGrid[r][c] === player) {
        count++;
        tempWinningArray.push({ row: r, col: c });
        r += dr;
        c += dc;
    }
    return count;
}
function resetGame() {
    currentPlayer = 'red';
    gameGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    renderBoard();
    currentPlayerText.textContent = `Current Turn: Player 1`;
}

function initializeGame() {
    renderBoard();
}

