"use strict";
const GRID_SIZE = 3;
const gameBoard = document.getElementById("game-board");
let scoreTab = document.getElementById("score");
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let gameResult = document.getElementById("game-result");
let playerScore = document.getElementById("playerInput");
let tieScore = document.getElementById("tieInput");
let computerScore = document.getElementById("computerInput");
let currentPlayer = "X";
function buildGame() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            let div = document.createElement("div");
            div.style.gridRowStart = (i + 1).toString();
            div.style.gridColumnStart = (j + 1).toString();
            div.classList.add("cell");
            if (i == 0)
                div.style.borderTop = "none";
            if (i == 2)
                div.style.borderBottom = "none";
            if (j == 0)
                div.style.borderLeft = "none";
            if (j == 2)
                div.style.borderRight = "none";
            gameBoard.appendChild(div);
        }
    }
    addClickListeners();
}
buildGame();
function checkRemainingEmptyCells() {
    const arrayOfEmptyCellIndexes = [];
    Array.from(document.querySelectorAll(".cell")).forEach((element, index) => {
        if (!element.innerHTML) {
            arrayOfEmptyCellIndexes.push(index);
        }
    });
    return arrayOfEmptyCellIndexes;
}
function randomEmptyCell() {
    let randomNumberFromArray = Math.floor(Math.random() * checkRemainingEmptyCells().length);
    return checkRemainingEmptyCells()[randomNumberFromArray];
}
function addClickListeners() {
    gameBoard.addEventListener("click", function update(event) {
        let target = event.target;
        if (!target.querySelector("img") && target.nodeName !== "IMG") {
            //adding the cross element
            placeElementOnBoard(target, "X");
            // if (checkWin() == "Win") {
            //     gameResult!.innerText = "You win!";
            //     playerScore.value = (Number(playerScore.value) + 1).toString();
            //     gameBoard.removeEventListener("click", update);
            //     return;
            // };
            // if (checkWin() == "Draw") {}
            switch (checkWin()) {
                case "Win":
                    gameResult.innerText = "You win!";
                    playerScore.value = (Number(playerScore.value) + 1).toString();
                    gameBoard.removeEventListener("click", update);
                    return;
                case "Draw":
                    gameResult.innerText = "Draw!";
                    tieScore.value = (Number(tieScore.value) + 1).toString();
                    gameBoard.removeEventListener("click", update);
                    console.log("draw1");
                    return;
            }
            //adding the circle element
            window.setTimeout(function () {
                placeElementOnBoard(target, "O");
                switch (checkWin()) {
                    case "Lose":
                        gameResult.innerText = "You lose!";
                        computerScore.value = (Number(computerScore.value) + 1).toString();
                        gameBoard.removeEventListener("click", update);
                        return;
                    case "Draw":
                        gameResult.innerText = "Draw!";
                        tieScore.value = (Number(tieScore.value) + 1).toString();
                        gameBoard.removeEventListener("click", update);
                        console.log("draw2");
                        return;
                }
            }, 500);
        }
        ;
    });
}
function placeElementOnBoard(target, element) {
    switch (element) {
        case "X":
            let imgCross = document.createElement("img");
            imgCross.classList.add("cross-img");
            imgCross.src = "./img/cross.png";
            target.appendChild(imgCross);
            break;
        case "O":
            let imgCircle = document.createElement("img");
            imgCircle.classList.add("circle-img");
            imgCircle.src = "./img/circle.png";
            document.querySelectorAll(".cell")[randomEmptyCell()].appendChild(imgCircle);
            break;
    }
}
function checkWin() {
    var _a, _b;
    for (let i = 0; i <= 7; i++) { //iterating through the winning patterns
        let a = winningPatterns[i][0];
        let b = winningPatterns[i][1];
        let c = winningPatterns[i][2];
        let firstWinPosition = Array.from(document.querySelectorAll(".cell"))[a];
        let secondWinPosition = Array.from(document.querySelectorAll(".cell"))[b];
        let thirdWinPosition = Array.from(document.querySelectorAll(".cell"))[c];
        if (firstWinPosition.innerHTML !== '' && secondWinPosition.innerHTML !== '' && thirdWinPosition.innerHTML !== '') {
            if (firstWinPosition.innerHTML == secondWinPosition.innerHTML && secondWinPosition.innerHTML == thirdWinPosition.innerHTML) {
                firstWinPosition.querySelector("img").style.opacity = "100%";
                secondWinPosition.querySelector("img").style.opacity = "100%";
                thirdWinPosition.querySelector("img").style.opacity = "100%";
                createButton();
                console.log(((_a = firstWinPosition.firstElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute("class")) == "cross-img");
                return ((_b = firstWinPosition.firstElementChild) === null || _b === void 0 ? void 0 : _b.getAttribute("class")) == "cross-img" ? "Win" : "Lose";
            }
        }
    }
    if (checkRemainingEmptyCells().length == 0) {
        console.log("drawWrong");
        createButton();
        return "Draw";
    }
}
function createButton() {
    let button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute("role", "button");
    button.addEventListener("click", () => {
        console.log("button");
        gameBoard.innerHTML = "";
        gameResult.innerText = "";
        document.querySelector("body").removeChild(button);
        currentPlayer = currentPlayer == "X" ? "O" : "X";
        buildGame();
    });
    button.innerText = "Restart the Game";
    document.querySelector("body").appendChild(button);
}
