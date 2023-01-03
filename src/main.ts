const GRID_SIZE = 3;
const gameBoard = document.getElementById("game-board") as HTMLAreaElement;
let scoreTab = document.getElementById("score") as HTMLBodyElement;



function buildGame() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            let div = document.createElement("div");
            div.style.gridRowStart = (i + 1).toString();
            div.style.gridColumnStart = (j + 1).toString();
            div.classList.add("cell");
            if (i == 0) div.style.borderTop = "none";
            if (i == 2) div.style.borderBottom = "none";
            if (j == 0) div.style.borderLeft = "none";
            if (j == 2) div.style.borderRight = "none";
            gameBoard.appendChild(div);
        }
    }
}

buildGame();

function checkRemainingEmptyCells(){
    const arrayOfEmptyCellIndexes: number[] = [];
    Array.from(document.querySelectorAll(".cell")).forEach((element, index) => {
        if (!element.innerHTML) {
            arrayOfEmptyCellIndexes.push(index);
        }
    })
    return arrayOfEmptyCellIndexes;
}

function randomEmptyCell(): number {
    let randomNumberFromArray = Math.floor( Math.random() * checkRemainingEmptyCells().length);
    return checkRemainingEmptyCells()[randomNumberFromArray];
}

gameBoard?.addEventListener("click", event => {
    let target = event.target as HTMLDivElement;

    if (!target.querySelector("img") && target.nodeName !== "IMG") {

    let imgCross = document.createElement("img");
    imgCross.classList.add("cross-img");
    imgCross.src = "./img/cross.png";
    target.appendChild(imgCross)

    window.setTimeout(function() {
        let newCircleCell = document.querySelectorAll(".cell")[randomEmptyCell()];
        let imgCircle = document.createElement("img");
        imgCircle.classList.add("circle-img");
        imgCircle.src = "./img/circle.png";
        newCircleCell.appendChild(imgCircle)
    }, 1000)
    }
})
