/*
    Title: Tic-Tac-Toe
    Brief description of the program: Browser Tic-Tac-Toe

    Name of the author: Kevin Pham
    Date of creation 03.04.2025
    Date of last edit: 04.04.2025
*/

// selects all playing fields (buttons) and assigns them to the type HTMLButtonElement
const cells = document.querySelectorAll<HTMLButtonElement>(".cell");

// selects the currentPlayer element, message element and the reset button
const currentPlayer = document.getElementById("currentPlayer") as HTMLDivElement;
const message = document.getElementById("message") as HTMLDivElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

// true if it is player O's turn, false if it is player X's turn
let isPlayerO: boolean = true;
currentPlayer.style.color = "blue";
currentPlayer.textContent = "O";

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

// every playing field gets a click-event-listener
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        // playing field gets O or X depending on the player
        if (isPlayerO) {
            cell.style.color = "blue";
            cell.textContent = "O";
            currentPlayer.style.color = "red";
            currentPlayer.textContent = "X";
        } else {
            cell.style.color = "red";
            cell.textContent = "X";
            currentPlayer.style.color = "blue";
            currentPlayer.textContent = "O";
        }
        // prevents repeated clicks on the same field
        cell.disabled = true;

        // checks if there's a winner
        if (checkWinner()) {
            document.querySelector<HTMLDivElement>(".currentPlayer").style.display = "none";
            message.textContent = "Winner: " + cell.textContent;
            message.style.color = isPlayerO ? "blue" : "red";
            disableCells();
        } else if (Array.from(cells).every(c => c.textContent !== "")) {
            // if all fields are occupied and no winner is found -> draw
            document.querySelector<HTMLDivElement>(".currentPlayer").style.display = "none";
            message.textContent = "Match Drawn!";
        } else {
            // switch player
            isPlayerO = !isPlayerO;
        }
    });
});

// function to check if there's a winner
function checkWinner(): boolean {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent !== "" &&
               cells[a].textContent === cells[b].textContent &&
               cells[b].textContent === cells[c].textContent;
    });
}

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
    currentPlayer.style.color = "blue";
    currentPlayer.textContent = "O";
    document.querySelector<HTMLDivElement>(".currentPlayer").style.display = "block";
    message.textContent = "";
    isPlayerO = true;
});