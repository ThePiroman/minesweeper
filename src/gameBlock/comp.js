import './style.css'
import { checkWinCondition, doWin, won, blownUp, debug, debugMineColor, doGameOver, blocksArray, getRandomInt, audioPlayLink} from '../main.js'

export default class gameBlock {
    constructor(parent) {
        this.parent = parent;
        this.block = null;
    }

    flaggedLimitCheck() {
        let flaggedAmount = 0;
        let minedAmount = 0;

        Array.prototype.forEach.call(document.getElementsByClassName("gameBlock"), blockElem => {
            if (blockElem.flagged) {
                flaggedAmount += 1;
            }

            if (blockElem.mined) {
                minedAmount += 1;
            }
        })

        return flaggedAmount > minedAmount;

    }

    emptyBlock() {

        this.block.style.visibility = "hidden";

        this.block.flagged = false;

        this.block.opened = true;
    }

    replaceBlockWithNumber(num) {
        if (this.block.flagged) {
            this.block.flagged = false;

            this.block.style.backgroundColor = "black";
        }

        this.block.classList.add('gameBlockNumber')

        this.block.textContent = num;

        let numColors = new Map();

        numColors.set(1, 'limegreen');
        numColors.set(2, 'green');
        numColors.set(3, 'orange');
        numColors.set(4, 'red');
        numColors.set(5, 'purple');


        let colorDesired = numColors.get(num);

        if (colorDesired === undefined) {
            colorDesired = numColors.get(5);
        }

        this.block.style.color = colorDesired;

        this.block.style.backgroundColor = 'whitesmoke';

        this.block.opened = true;

    }

    component() {
        var self = this;

        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameBlock';

        comp.opened = false;
        comp.flagged = false;
        comp.mined = false;
        
        this.block = comp;
        comp.blockClass = this; // сомнительно но работает

        let compWidth = Number.parseInt(document.getElementsByClassName("gameCanvas")[0].style.width, 10)
        let compHeight = Number.parseInt(document.getElementsByClassName("gameCanvas")[0].style.height, 10)

        // comp.style.width = compWidth / 4 + 'px';

        // comp.style.height = compHeight / 4 + 'px';

        comp.style.height = 32 + 'px';

        comp.style.borderWidth = 2 + 'px';

        comp.style.width = 32 - (Number.parseInt(comp.style.borderWidth, 10) * 2) + 'px';

        comp.addEventListener("click", function(event) {
            if (won) {
                return;
            }

            if (blownUp) {
                return;
            }

            if (comp.flagged) {
                new Audio(audioPlayLink + "assets/sound/cant_click.mp3").play();
                return;
            }

            if (comp.opened) {
                return;
            }

            if (comp.mined) {

                comp.style.backgroundColor = "red";

                doGameOver()

                let num = getRandomInt(1, 2);

                let str = audioPlayLink + `assets/sound/boom${num}.mp3`;

                console.log(str);

                new Audio(str).play();

                setTimeout(function() {
                    location.reload();
                }, 1000)


            } else {

               self.performSquareCheck();

            }

            if (checkWinCondition()) {
                doWin()
            }

            
        });

        comp.addEventListener("contextmenu", function(event) {
            event.preventDefault();

            if (won) {
                return;
            }

            if (blownUp) {
                return;
            }

            if (comp.opened) {
                return;
            }


            if (self.flaggedLimitCheck() && !comp.flagged) {
                new Audio(audioPlayLink + "assets/sound/flag_place_cant.mp3").play();
                return;
            }
            

            if (!comp.flagged) {

                comp.flagged = true;

                comp.style.backgroundColor = "yellow";

            } else {

                comp.flagged = false;

                comp.style.backgroundColor = "black";

                if (debug && comp.mined) {
                    comp.style.backgroundColor = debugMineColor;
                }

            }

            new Audio(audioPlayLink + "assets/sound/flag_place.mp3").play();

        });



        return comp;
    }

    performSquareCheck(initiator = 'ply') {
        console.log(initiator)
        let myRowArr = blocksArray[this.parent.rowInd];
        let myRowInd = blocksArray.indexOf(myRowArr);
        let myInd = myRowArr.indexOf(this.block);

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

        let mineCounter = 0;

        squareCheck.forEach((block) => {
            if (block.mined) {
                mineCounter += 1;
            }
        })

        if (mineCounter > 0) {

            if (initiator == 'ply') {
                new Audio(audioPlayLink + "assets/sound/block_open.mp3").play();
            }

            this.replaceBlockWithNumber(mineCounter);
            return;

        } else {

            if (initiator == 'ply') {
                new Audio(audioPlayLink + "assets/sound/block_big_open.mp3").play();
            }

            this.emptyBlock();

            squareCheck.forEach((block) => {
                block.blockClass.performSquareCheck(this.block);
            })
        }
    }

    

    render() {
        return this.parent.append(this.component());
    }
}