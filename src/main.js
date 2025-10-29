import './reset.css';
import './normalize.css';
import './main.css';
import './difficulties.js';
import './funcs.js';

import gameCanvas from './gameCanvas/comp';
import gameDiffChoice from './gameDiffChoice/comp.js';


addEventListener("beforeunload", () => {sessionStorage.clear()});

export const DEBUG = import.meta.env.VITE_DEBUG === 'true';

export const debugMineColor = "gray";

export let blocksArray = [];

const app = document.querySelector('#app');

new gameDiffChoice(app).render();

new gameCanvas(app).render();





