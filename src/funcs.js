import gameBlockRowContainer from "./gameBlockRowContainer/comp";
import gameBlock from "./gameBlock/comp";
import { blocksArray, DEBUG } from "./main";

// function for creating a row of blocks
export function createRow(columns = Number) {

    const rowElem = new gameBlockRowContainer(document.getElementsByClassName("gameCanvas")[0]);

    rowElem.render();

    for (let i = 0; i < columns; i++) {
        const block = new gameBlock(rowElem.rowDiv);

        block.render();
    }

    const childArr = Array.from(rowElem.rowDiv.children) // array that consists of blocks in the row

    blocksArray.push(childArr);

    rowElem.rowDiv.rowInd = blocksArray.indexOf(childArr);

    document.getElementsByClassName("gameCanvas")[0].style.width = rowElem.rowDiv.clientWidth + 'px'; // dynamically adapt the game canvas width

}

// function for getting the 'neighbours' of the block
export function getSquareArray(originBlock = Element) {
    const myRowArr = blocksArray[originBlock.parentElement.rowInd]; // get the array of the row origin is in
    const myRowInd = blocksArray.indexOf(myRowArr); // get the index of the row
    const myInd = myRowArr.indexOf(originBlock); // get origin index

    let squareCheck = [];

    for (let i = -1; i <= 1; i++) {
        if (blocksArray[myRowInd - 1]) {
            squareCheck.push(blocksArray[myRowInd - 1][myInd + i]); // top-left, top-middle, top-right
        }
    }

    for (let i = -1; i <= 1; i += 2) {
        if (blocksArray[myRowInd][myInd + i]) {
            squareCheck.push(blocksArray[myRowInd][myInd + i]); // left and right
        }
    }
    

    for (let i = -1; i <= 1; i++) {
        if (blocksArray[myRowInd + 1]) {
            squareCheck.push(blocksArray[myRowInd + 1][myInd + i]); // bottom-left, bottom-middle, bottom-right
        }
        
    }

    squareCheck = squareCheck.filter((block) => block); // filter non-valid blocks (non-valid's can happen if the function was called on the block that is on the canvas border)

    squareCheck = squareCheck.filter((block) => !block.opened); // filter opened blocks

    return squareCheck;
}

// function for mine randomization on initialization of the canvas
export function randomizeMines(minesToPlace = Number, chance = Number) {
    
    let attempts = 0;

    const failedLimit = 100; // variable to prevent infinite loops when we fail to set up the mines

    while (minesToPlace > 0) {
       Array.from(document.getElementsByClassName("gameBlock")).forEach((block) => {
        
            if (minesToPlace <= 0) {
                return;
            }

            if (getBlocksAmount() <= minesToPlace) { // infinite loop prevention
                minesToPlace = 1;
                return;
            }

            // if (attempts >= failedLimit) {
            //     minesToPlace = 0;
            //     return;
            // }

            let mineCounter = 0; // variable for storing the block's neighbours that are mines, exists to prevent a cluster of mines in one place

            if (attempts <= failedLimit) { // disable the "prevent clusters" system if we seem to have an infinite loop - this helps most of the time
                getSquareArray(block).forEach((blockArr) => {
                    if (blockArr.mined) { 
                        mineCounter += 1; // if our neighbour is a mine we add up the counter
                    }
                })
            }


            if (mineCounter <= 3) {
                if (getRandomInt(1, 100) < chance) {

                    if (!block.mined) {
                        block.mined = true;

                        if (DEBUG) {
                            block.classList.add('gameBlockDebug');
                        }
                    
                        minesToPlace -= 1;
                    }
                    
                }
            }
            
            attempts += 1;
            
        });
    }

}



export function getRandomInt(min = Number, max = Number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let desiredDifficulty = '';

export function setDifficulty(diffToSet = String) {
    desiredDifficulty = diffToSet;
}

export function initializeCanvas() {
    const rowsAmount = desiredDifficulty.rows;
    const columnsAmount = desiredDifficulty.columns;
    const minesAmount = desiredDifficulty.mines;

    const callback = desiredDifficulty.callbackFn;

    if (callback) {
        callback(rowsAmount, columnsAmount, minesAmount);
    } else {
        for (let i = 1; i <= rowsAmount; i++) {
            createRow(columnsAmount);
        }

        randomizeMines(minesAmount, 25);
    }

    new Audio('assets/sound/game_start.mp3').play();
}

// function for faster creation elements in components
export function createElement(parent = Element, elemClass = String, elemName = String, func = () => {return}) {
    const comp = document.createElement(elemClass);
    comp.classList.add(elemClass);
    comp.className = elemName;

    func(comp);

    parent.appendChild(comp);

    return comp;
}

export function getBlocksAmount() {
    let blocksAmount = 0;

    blocksArray.forEach((row) => {
        blocksAmount += row.length;
    })

    return blocksAmount;
}