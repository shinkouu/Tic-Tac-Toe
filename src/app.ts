/*
    Title: Tic Tac Toe
    Brief description of the program: Browser Tic Tac Toe

    Name of the author: Kevin Pham
    Date of creation 03.04.2025
    Date of last edit: 03.04.2025
*/

// selects all playing fields (buttons) and assigns them to the type HTMLButtonElement
const cells = document.querySelectorAll<HTMLButtonElement>(".cell");

// selects the message element and the reset button
const message = document.getElementById("message") as HTMLDivElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

// true if it is player O's turn, false if it is player X's turn
let isPlayerO: boolean = true;

// all possible winning combinations
const winPatterns: number[][] = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top left to bottom right
    [2, 4, 6]  // diagonal from top right to bottom left
];

// deactivates all playing fields to prevent further entries
function disableCells(): void {
    cells.forEach(cell => cell.disabled = true);
}

// reset-function to reset game
resetButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });
    message.textContent = "";
    isPlayerO = true;
});

