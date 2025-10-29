import './style.css'
import { getRandomInt, getSquareArray, createElement} from '../funcs.js'
import {DEBUG} from '../main.js'

export default class gameBlock {
    constructor(parent) {
        this.parent = parent;
        this.block = null; // reference to the block HTML element
    }

    checkWinCondition() {
    
        let returnValue = true;
    
        Array.from(document.getElementsByClassName("gameBlock")).forEach((block) => {
            if (!block.opened && !block.mined) {
                returnValue = false; // fail if we have any 'safe' block that haven't been revealed yet
            }
    
        });
    
        return returnValue;
    
    
    }
    
    doWin() {
        Array.from(document.getElementsByClassName("gameBlock")).filter((block) => block.mined).forEach((block) => { // reveal each mined block
    
            block.classList.add('gameBlockMineRevealed');
    
        });
    
        sessionStorage.won = true;
    
        new Audio("assets/sound/win.mp3").play();
    
        setTimeout(function() {location.reload()}, 6000)
    }

    // function for checking if there are too many blocks flagged
    flaggedLimitCheck() {
        let flaggedAmount = 0;
        let minedAmount = 0;

        Array.from(document.getElementsByClassName("gameBlock")).forEach((blockElem) => {
            if (blockElem.flagged) {
                flaggedAmount += 1;
            }

            if (blockElem.mined) {
                minedAmount += 1;
            }
        })

        return flaggedAmount > minedAmount;

    }

    // function for hiding the block in case it's not mined
    emptyBlock() {

        this.block.classList.add('gameBlockHidden'); 
        
        this.block.flagged = false;

        this.block.opened = true;
    }

    // function for replacing the block with a number of mines around it
    replaceBlockWithNumber(num = Number) {
        if (this.block.flagged) {
            this.block.flagged = false;
        }

        this.block.classList.add('gameBlockNumber');

        this.block.textContent = num;

        let numColors = {1: 'gameBlockNumberDangerVeryLight', 2: 'gameBlockNumberDangerLight', 3: 'gameBlockNumberDangerMedium', 4: 'gameBlockNumberDangerHeavy', 5: 'gameBlockNumberDangerOverkill'};

        let colorDesired = numColors[num];

        if (colorDesired === undefined) {
            colorDesired = numColors['5'];
        }

        this.block.classList.add(colorDesired);

        this.block.opened = true;

    }

    component() {
        var self = this; // allows to call functions of the class inside of it

        const comp = createElement(this.parent, 'div', 'gameBlock');

        comp.opened = false;
        comp.flagged = false;
        comp.mined = false;
        
        this.block = comp;
        comp.blockClass = this; // reference to the HTML element component; required to call a component function through an HTML element

        comp.style.height = 32 + 'px'; // very tight size adjustment

        comp.style.borderWidth = 2 + 'px'; // same

        comp.style.width = 32 - (Number.parseInt(comp.style.borderWidth, 10) * 2) + 'px'; // same

        comp.addEventListener("click", function() {
            if (comp.flagged) {
                new Audio('assets/sound/cant_click.mp3').play();
                return;
            }

            if (sessionStorage.won || sessionStorage.blownUp || comp.opened) {
                return;
            }

            if (comp.mined) {

                comp.classList.add('gameBlockMineRevealed');

                sessionStorage.blownUp = true;

                let num = getRandomInt(1, 2);

                let str = `assets/sound/boom${num}.mp3`;

                new Audio(str).play();

                setTimeout(function() {
                    location.reload();
                }, 1000)


            } else {

               self.performSquareCheck();

            }

            if (self.checkWinCondition()) {
                self.doWin()
            }

            
        });

        comp.addEventListener("contextmenu", function(event) {
            event.preventDefault();

            if (sessionStorage.won || sessionStorage.blownUp || comp.opened) {
                return;
            }


            if (self.flaggedLimitCheck() && !comp.flagged) {
                new Audio("assets/sound/flag_place_cant.mp3").play();
                return;
            }
            

            if (!comp.flagged) {

                comp.flagged = true;

                if (DEBUG && comp.mined) {
                    comp.classList.remove('gameBlockDebug');
                }

                comp.classList.add('gameBlockFlagged');

            } else {

                comp.flagged = false;

                comp.classList.remove('gameBlockFlagged');

                if (DEBUG && comp.mined) {
                    comp.classList.add('gameBlockDebug');
                }

            }

            new Audio("assets/sound/flag_place.mp3").play();

        });



        return comp;
    }

    //function for opening neighbour empty blocks and causing them to open their neighbours, causing a loop until we hit a block that has a mined neighbour 
    performSquareCheck(initiator = 'player') { // to prevent ear rape we see who started the check in the first place - if it's a player, we play a sound, if it ain't, we don't 

        let squareCheck = getSquareArray(this.block);

        let mineCounter = 0;

        squareCheck.forEach((block) => {
            if (block.mined) {
                mineCounter += 1;
            }
        })

        if (mineCounter > 0) {

            if (initiator == 'player') {
                new Audio("assets/sound/block_open.mp3").play();
            }

            this.replaceBlockWithNumber(mineCounter);
            return;

        } else {

            if (initiator == 'player') {
                new Audio("assets/sound/block_big_open.mp3").play();
            }

            this.emptyBlock();

            squareCheck.forEach((block) => {
                block.blockClass.performSquareCheck(block);
            })
        }
    }

    

    render() {
        return this.parent.append(this.component());
    }
}