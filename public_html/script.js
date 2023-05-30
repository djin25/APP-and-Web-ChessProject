console.log('Aloha');
const statusDisplay = document.querySelector('.game--status');
var x = 0;
let curFile = -1;
let curRank = -1;
let newFile = -1;
let newRank = -1;
let gameActive = true;
let currentNum = 1;
let gameState = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
    ];
const Message = () => `Congradulations! You filled ${currentNum} squares!`;
const currentPlayerTurn = () => `Move the knight to as many squares as possible without visiting the same square twice`;
const cells = document.querySelectorAll('.cell');
statusDisplay.innerHTML = currentPlayerTurn();
for (var i = 0; i < 8; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 9; i < 16; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 16; i < 24; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 25; i < 32; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 32; i < 40; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 41; i < 48; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 48; i < 56; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
for (var i = 57; i < 64; i += 2) {
    cells[i].style.backgroundColor = "antiqueWhite";
}
/*const endConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];*/

function handleCellPlayed(clickedCell, clickedCellFile, clickedCellRank) {
    gameState[clickedCellFile][clickedCellRank] = currentNum;
    curFile = clickedCellFile;
    curRank = clickedCellRank;
    clickedCell.innerHTML = currentNum;
    clickedCell.style.backgroundColor = "DarkRed";
    currentNum++;
    newFile = currFile + 2;
    newRank = currRank + 1;
    document.querySelectorAll('.cell')[3];
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
        cells[newFile * 8 + newRank].style.backgroundColor = "Blue";
    }
    newFile = currFile + 2;
    newRank = currRank - 1;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
    newFile = currFile + 1;
    newRank = currRank + 2;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
    newFile = currFile + 1;
    newRank = currRank - 2;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
    newFile = currFile - 1;
    newRank = currRank + 2;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
    newFile = currFile - 1;
    newRank = currRank - 2;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
    newFile = currFile - 2;
    newRank = currRank + 1;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
    newFile = currFile - 2;
    newRank = currRank - 1;
    if (newFile >= 0 && newFile <= 7 && newRank >= 0 && newRank <= 7 && gameState[newFile][newRank] === "") {
    }
}

/*function handlePlayerChange() {
    currentPlayer ;
    statusDisplay.innerHTML = currentPlayerTurn();
}*/

/*function handleResultValidation() {
    let roundEnd = false;
    for(let i = 0; i <= 7; i++) {
        const endCondition = endConditions[i];
        const a = gameState[endCondition[0]];
        const b = gameState[endCondition[1]];
        const c = gameState[endCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundEnd = true;
            break
        }
    }

    if(roundEnd) {
        statusDisplay.innerHTML = Message();
        gameActive = false;
        return;
    }

    /*const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}*/

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellFile = parseInt(clickedCell.getAttribute('file'));
    const clickedCellRank = parseInt(clickedCell.getAttribute('rank'));
    if (gameState[clickedCellFile][clickedCellRank] !== "" || !gameActive)
        return;
    if (curFile === -1 || ((Math.abs(clickedCellFile - curFile) === 2 && (Math.abs(clickedCellRank - curRank) === 1)) ||
        (Math.abs(clickedCellFile - curFile) === 1 && (Math.abs(clickedCellRank - curRank) === 2))))
        handleCellPlayed(clickedCell, clickedCellFile, clickedCellRank);
    //handleResultValidation();
}

function handleRestartGame() {
    console.log('top of handleRestartGame');
    curFile = -1;
    curRank = -1;
    gameActive = true;
    currentNum = "1";
    possibleMoves = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
    gameState = [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""]];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "#003300");
    for (var i = 0; i < 8; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 9; i < 16; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 16; i < 24; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 25; i < 32; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 32; i < 40; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 41; i < 48; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 48; i < 56; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
    for (var i = 57; i < 64; i += 2) {
        cells[i].style.backgroundColor = "antiqueWhite";
    }
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
