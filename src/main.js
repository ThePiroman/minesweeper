import './reset.css';
import './normalize.css';
import './difficulties.js'
import { getAvailableDifficulties, getDifficulty } from './difficulties.js';
import gameCanvas from './gameCanvas/comp';
import gameBlock from './gameBlock/comp';
import gameBlockRowContainer from './gameBlockRowContainer/comp';
import gameTimer from './gameTimer/comp';
import gameDiffChoice from './gameDiffChoice/comp.js';

export var debug = true;

export var won = false;
export var blownUp = false;

export var debugMineColor = "gray";

export var blocksArray = [];

export function createRow(columns) {

    let rowElem = new gameBlockRowContainer(document.getElementsByClassName("gameCanvas")[0]);

    rowElem.render();

    for (let i = 0; i < columns; i++) {
        let block = new gameBlock(rowElem.rowDiv);

        block.render();
    }

    let childArr = Array.from(rowElem.rowDiv.children)

    blocksArray.push(childArr);

    rowElem.rowDiv.rowInd = blocksArray.indexOf(childArr);

    document.getElementsByClassName("gameCanvas")[0].style.width = rowElem.rowDiv.clientWidth + 'px';

}

export function getSquareArray(originBlock) {
    let myRowArr = blocksArray[originBlock.parent.rowInd];
    let myRowInd = blocksArray.indexOf(myRowArr);
    let myInd = myRowArr.indexOf(originBlock.block);

    let squareCheck = [];

    for (let i = -1; i <= 1; i++) {
        if (blocksArray[myRowInd - 1]) {
            squareCheck.push(blocksArray[myRowInd - 1][myInd + i]);
        }
    }

    for (let i = -1; i <= 1; i += 2) {
        if (blocksArray[myRowInd][myInd + i]) {
            squareCheck.push(blocksArray[myRowInd][myInd + i]);
        }
    }
    

    for (let i = -1; i <= 1; i++) {
        if (blocksArray[myRowInd + 1]) {
            squareCheck.push(blocksArray[myRowInd + 1][myInd + i]);
        }
        
    }

    squareCheck = squareCheck.filter((block) => block !== undefined);

    squareCheck = squareCheck.filter((block) => block.style.visibility != "hidden");

    return squareCheck;
}

export function randomizeMines(minesToPlace, chance) {
    while (minesToPlace > 0) {
       Array.prototype.forEach.call(document.getElementsByClassName("gameBlock"), block => {
        
            if (minesToPlace <= 0) {
                return;
            }

            let mineCounter = 0;

            getSquareArray(block.blockClass).forEach((blockArr) => {
                if (blockArr.mined) {
                    mineCounter += 1;
                }
            })


            if (mineCounter <= 3) {
                if (getRandomInt(1, 100) < chance) {

                    if (!block.mined) {
                        block.mined = true;

                        if (debug) {
                            block.style.backgroundColor = debugMineColor;
                        }
                    
                        minesToPlace -= 1;
                    }
                    
                }
            }
            

            
        });
    }

}

export function checkWinCondition() {
    let returnValue = true;
    Array.prototype.forEach.call(document.getElementsByClassName("gameBlock"), block => {
        if (!block.opened) {
            if (!block.mined) {
                returnValue = false;
            }
        }

    });

    return returnValue;


}

export function doWin() {
    Array.prototype.forEach.call(document.getElementsByClassName("gameBlock"), block => {

        if (block.mined) {

            block.style.backgroundColor = "red";

        }

    });

    won = true;

    new Audio("assets/sound/win.mp3").play();

    setTimeout(function() {location.reload()}, 6000)
}

export function doGameOver() {
    blownUp = true;
}

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let desiredDifficulty = '';

export function setDifficulty(diffToSet) {
    desiredDifficulty = diffToSet;
}

export function initializeCanvas() {
    let rowsAmount = desiredDifficulty.get('rows');
    let columnsAmount = desiredDifficulty.get('columns');
    let minesAmount = desiredDifficulty.get('mines');

    let callback = desiredDifficulty.get('callbackFn');

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

const app = document.querySelector('#app');

new gameDiffChoice(app).render();

new gameCanvas(app).render();

document.getElementsByTagName("html")[0].style.backgroundColor = '#1e262e';





