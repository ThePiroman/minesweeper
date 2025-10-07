import { createRow, randomizeMines } from "./main";

let registeredDifficulties = [];

function registerDifficulty(name = 'unnamedDiff', rows, columns, mines, callbackFn) {
    let diff = new Map();

    diff.set('name', name);
    diff.set('rows', rows);
    diff.set('columns', columns);
    diff.set('mines', mines);
    diff.set('callbackFn', callbackFn);

    registeredDifficulties.push(diff);
}

export function getDifficulty(diffName) {
    for (let diff = 0; diff <= registeredDifficulties.length; diff++) {
        if (registeredDifficulties[diff] && registeredDifficulties[diff].get('name') === diffName) {
            return registeredDifficulties[diff];
        }
    }

    return null;
}

export function getAvailableDifficulties() {
    let diffsString = '';

    for (let diff = 0; diff <= registeredDifficulties.length; diff++) {
        if (registeredDifficulties[diff]) {
            diffsString += registeredDifficulties[diff].get('name');
            if (registeredDifficulties[diff] != registeredDifficulties[registeredDifficulties.length - 1]) {
                diffsString += ', ';
            }
        }
    }

    return diffsString;
}

registerDifficulty("Easy", 9, 9, 10);
registerDifficulty("Medium", 16, 16, 45);
registerDifficulty("Hard", 20, 20, 99);
registerDifficulty("Custom", 0, 0, 0, (rows, columns, mines) => {
    rows = prompt("Rows amount: ");
    columns = prompt("Columns amount: ");
    mines = prompt("Mines amount: ");

    if (rows < 0) {
        rows = -rows;
    }

    if (columns < 0) {
        columns = -columns;
    }

    if (mines < 0) {
        mines = -mines;
    }

    for (let i = 1; i <= rows; i++) {
        createRow(columns);
    }
    
    randomizeMines(mines, 25);

});