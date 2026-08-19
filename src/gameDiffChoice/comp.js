import './style.css';
import { setDifficulty, initializeCanvas, createElement } from '../funcs.js';
import { getAvailableDifficulties, getDifficulty } from '../difficulties.js';
import { registeredDifficulties } from '../consts.js';

export default class gameDiffChoice {
    constructor(parent) {
        this.parent = parent;
    }

    component() {
        const comp = createElement(this.parent, 'div', 'gameDiffChoice')

        createElement(comp, 'p', 'gameDiffChoiceDesc', (desc) => {
            desc.textContent = 'Select difficulty: ' + getAvailableDifficulties();
        })

        // const compInput = document.createElement('input');
        // compInput.classList.add('input');
        // compInput.className = 'gameDiffChoiceInput';
        // compInput.placeholder = 'Difficulty';
        // compInput.oninput = () => {

        //     new Audio('assets/sound/form_input.mp3').play();

        //     if (getDifficulty(compInput.value.charAt(0).toUpperCase() + compInput.value.slice(1)) !== null) {

        //         setDifficulty(getDifficulty(compInput.value.charAt(0).toUpperCase() + compInput.value.slice(1)));

        //         comp.remove();
                
        //         initializeCanvas();

        //     }
        // }

        registeredDifficulties.forEach((diff) => {
            createElement(comp, 'button', 'gameDiffChoiceButton', (butt) => {
                butt.textContent = diff.name;

                // compButton.onmouseover = () => {
                //     new Audio('assets/sound/form_input.mp3').play();
                // }
                
                butt.onclick = () => {

                    setDifficulty(getDifficulty(butt.textContent));

                    comp.remove();

                    initializeCanvas();
                }

                butt.onmouseover = () => {
                    butt.classList.add('gameDiffChoiceButtonHovered');
                }

                butt.onmouseleave = () => {
                    butt.classList.remove('gameDiffChoiceButtonHovered');
                }
            });
            


        })

        return comp;
    }

    created() {
        
    }

    render() {
        return this.parent.append(this.component());
    }
}