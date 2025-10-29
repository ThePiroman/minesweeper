import { createRow, randomizeMines } from "./funcs";

export const registeredDifficulties = [
    {name : "Easy", rows: 9, columns: 9, mines: 10},
    {name : "Medium", rows: 16, columns: 16, mines: 45},
    {name : "Hard", rows: 20, columns: 20, mines: 99},
    {name : "Custom", rows: 0, columns: 0, mines: 0, callbackFn : (rows, columns, mines) => {
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
    } }
];


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