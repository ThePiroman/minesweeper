import { createRow, getRandomInt, randomizeMines } from "./funcs.js";
import { registeredDifficulties } from "./consts.js";


export function getDifficulty(diffName = String) {
    for (const difficulty of registeredDifficulties) {
        if (difficulty && difficulty.name === diffName) {
            return difficulty;
        }
    }

    return null;
}

// function for getting a string of available difficulties (e.g. Easy, Medium, Hard, Very Hard)
export function getAvailableDifficulties() {
    let diffsString = '';

    for (const difficulty of registeredDifficulties) {
        if (difficulty) {
            diffsString += difficulty.name;
            if (difficulty != registeredDifficulties.at(-1)) {
                diffsString += ', ';
            }
        }
    }

    return diffsString;
}