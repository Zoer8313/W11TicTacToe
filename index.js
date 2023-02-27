//NEED: -winning combos list XX
//event listener for square click XX
//need access to which elements on DOM? ["game-space", "square", "game-over-section",
//"winner-announcement", "play-again-button"]
//place alternating "x"s or "o"s on selected tiles XX
//check for a winner each round XX
//be able to tell if there's a draw XX
//if theres a winner, change announcement XX
//functioning play again button that wipes board & resets new game

let gameSpace = $("#game-space");
const button = document.getElementById("button");//just cuz there's only 1
button.addEventListener("click", buttonClick);
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let wonRound = false;

let playerX = "X";
let playerO = "O";
let currentPlayer = playerX;
let turn = document.getElementById("turn");

let squares = Array.from(document.getElementsByClassName("square"));
//console.log(squares);

squares.forEach(square => square.addEventListener("click", squareClick, {once : true}));

function squareClick(squareEvent) {
    const clickedSquare = squareEvent.target;
    const clickedSquareIndex = parseInt(
        clickedSquare.getAttribute("data-index")
    );
    //console.log(clickedSquareIndex);

    squarePlayed(clickedSquare, clickedSquareIndex);
    checkWinner();
    switchPlayer();

function squarePlayed(clickedSquare, clickedSquareIndex) {
    gameBoard[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerHTML = currentPlayer;
    //console.log(gameBoard); loved seeing this one
}
}

function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;//https://www.w3schools.com/jsref/jsref_operators.asp
    if (playerX === currentPlayer) {
        turn.innerText = "Player X's turn!"
    } else {
        turn.innerText = "Player O's turn!"
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function checkWinner() {
    let wonRound = false;
    for (let i = 0; i <= 7; i++) {//loop through all 8 winning combos
        let winningCombo = winningCombos[i];
        let x = gameBoard[winningCombo[0]];
        let y = gameBoard[winningCombo[1]];
        let z = gameBoard[winningCombo[2]];

        if (x === "" || y === "" || z === "") {
            continue;//steps over 1 iteration of loop- https://www.w3schools.com/js/js_break.asp
        }

        if (x != null && x === y && x===z) {
            alert(currentPlayer + " has won the game!");
            wonRound = true;
            return;//keeps allowing me to click on board after someone's already won?
        }
        //check for draw here i reckon
        if (gameBoard.every((square) => square != "")) {
            alert("It's a draw!");
            return;
        }
        }
    }


function buttonClick() {//when i hit this button, it just alerts me that theres a draw??
    gameBoard.fill(null);
    console.log(gameBoard);
    squares.forEach((square) => square.innerText = (""));
    currentPlayer = playerX;
}

/*issues:

-i never made like a "play game" function, and when i try to screw around
    and make one, my whole game just breaks :'( 
-game recognizes when someone wins, but then allows for further game play
-button wipes board and sets array values back to null, but won't let you
    replay w/o refreshing the whole page.
        
*/