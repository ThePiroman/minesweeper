import './style.css'
import { checkWinCondition, doWin, won, debug, debugMineColor} from '../main.js'

export default class gameBlock {
    constructor(parent) {
        this.parent = parent;
    }

    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameBlock';

        comp.opened = false;
        comp.flagged = false;
        comp.mined = false;

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

            if (comp.flagged) {
                new Audio("assets/sound/cant_click.mp3").play();
                return;
            }

            if (comp.opened) {
                return;
            }

            if (comp.mined) {

                comp.style.backgroundColor = "red";

                new Audio("assets/sound/boom.mp3").play();

                setTimeout(function() {
                    location.reload();
                }, 1000)

            } else {

                comp.style.visibility = "hidden";

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

    

    render() {
        return this.parent.append(this.component());
    }
}