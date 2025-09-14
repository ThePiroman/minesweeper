import './style.css'
import { checkWinCondition, doWin, won, blownUp, debug, debugMineColor, doGameOver, blocksArray} from '../main.js'

export default class gameBlock {
    constructor(parent) {
        this.parent = parent;
        this.block = null;
    }

    emptyBlock() {
        this.block.style.visibility = "hidden";
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
                new Audio("assets/sound/cant_click.mp3").play();
                return;
            }

            if (comp.opened) {
                return;
            }

            if (comp.mined) {

                comp.style.backgroundColor = "red";

                doGameOver()

                new Audio("assets/sound/boom.mp3").play();

                setTimeout(function() {
                    location.reload();
                }, 1000)


            } else {

                new Audio("assets/sound/block_open.mp3").play();

               self.emptyBlock();

               self.performSquareCheck();

            }

            comp.opened = true;

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

            new Audio("assets/sound/flag_place.mp3").play();

        });



        return comp;
    }

    performSquareCheck() {
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

        console.log(squareCheck);
    }

    

    render() {
        return this.parent.append(this.component());
    }
}