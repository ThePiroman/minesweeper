import './reset.css';
import './normalize.css';
import gameCanvas from './gameCanvas/comp';
import gameBlock from './gameBlock/comp';

export var won = false;
export var debug = false;
export var debugMineColor = "gray";


const app = document.querySelector('#app');

new gameCanvas(app, 256).render();

function createRow() {
    for (let i = 1; i < 9; i++) {
        new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render();
    }
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



for (let i = 1; i < 8; i++) {
    createRow();
}

randomizeMines()


