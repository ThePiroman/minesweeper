import './reset.css';
import './normalize.css';
import gameCanvas from './gameCanvas/comp';
import gameBlock from './gameBlock/comp';
import gameBlockRowContainer from './gameBlockRowContainer/comp';

export var won = false;
export var blownUp = false;
export var debug = false;
export var debugMineColor = "gray";


export var blocksArray = [];

let rows = 8;


const app = document.querySelector('#app');

new gameCanvas(app, 256).render();

function createRow(columns) {

    let rowElem = new gameBlockRowContainer(document.getElementsByClassName("gameCanvas")[0]);

    rowElem.render();

    for (let i = 0; i < columns; i++) {
        let block = new gameBlock(rowElem.rowDiv);

        block.render();
    }

    let childArr = Array.from(rowElem.rowDiv.children)

    blocksArray.push(childArr);

    rowElem.rowDiv.rowInd = blocksArray.indexOf(childArr);

    console.log(rowElem.rowDiv.rowInd)

    console.log(blocksArray)

}

function randomizeMines() {
    let minesAmount = 10;

    while (minesAmount >= 0) {
       Array.prototype.forEach.call(document.getElementsByClassName("gameBlock"), block => {
            if (minesAmount < 0) {
                return;
            }
            if (Math.random() < 0.25) {
                block.mined = true;

                if (debug) {
                    block.style.backgroundColor = debugMineColor;
                }
                
                minesAmount -= 1;
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

        block.style.backgroundColor = "red";

    });

    new Audio("assets/sound/win.mp3").play();

    setTimeout(function() {location.reload()}, 6000)
}

export function doGameOver() {
    blownUp = true;
}



for (let i = 1; i <= rows; i++) {
    createRow(rows);
}

randomizeMines()


