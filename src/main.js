import './reset.css';
import './normalize.css';
import './main.css';
import './difficulties.js';
import './funcs.js';
import './consts.js'

import gameCanvas from './gameCanvas/comp';
import gameDiffChoice from './gameDiffChoice/comp.js';
import gameAudio from './gameAudio/comp.js';


addEventListener("beforeunload", () => {sessionStorage.clear()});


export let blocksArray = [];

const app = document.querySelector('#app');

new gameDiffChoice(app).render();

new gameCanvas(app).render();

export let gAudio = new gameAudio();

gAudio.initialize();

