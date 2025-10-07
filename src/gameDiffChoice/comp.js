import './style.css';
import { setDifficulty, initializeCanvas } from '../main.js';
import { getAvailableDifficulties, getDifficulty } from '../difficulties.js';

export default class gameDiffChoice {
    constructor(parent) {
        this.parent = parent;
    }

    component() {
        const comp = document.createElement('div');
        comp.classList.add('div');
        comp.className = 'gameDiffChoice';

        const compText = document.createElement('p');
        compText.classList.add('p');
        compText.className = 'gameDiffChoiceDesc';
        compText.textContent = 'Select difficulty: ' + getAvailableDifficulties();

        const compInput = document.createElement('input');
        compInput.classList.add('input');
        compInput.className = 'gameDiffChoiceInput';
        compInput.placeholder = 'Difficulty';
        compInput.oninput = () => {

            new Audio('assets/sound/form_input.mp3').play();

            if (getDifficulty(compInput.value.charAt(0).toUpperCase() + compInput.value.slice(1)) !== null) {

                setDifficulty(getDifficulty(compInput.value.charAt(0).toUpperCase() + compInput.value.slice(1)));

                comp.remove();
                
                initializeCanvas();

            }
        }


        comp.appendChild(compText);

        comp.appendChild(compInput);

        return comp;
    }

    render() {
        return this.parent.append(this.component());
    }
}