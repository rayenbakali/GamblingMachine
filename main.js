//1.Deposit Money
//2.Determine Number Of lines
//3.Collect Bet amount
//4.Spin Slot Machine
//5.Check if the user won
//6.Give the user their winnings

const { count } = require("console");

//7.Play again
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//Customer Deposit Money
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: "); //what returned by prompt is string
    const numberDepositAmount = parseFloat(depositAmount);
    //Verify if empty or number Deposit is Nan means we entered String

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid Deposit Amount Try again");
    } else {
      return numberDepositAmount;
    }
  }
};
//Number of Lines
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter Number Of lines(1-3): ");
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Wrong Lines Input");
    } else {
      return numberOfLines;
    }
  }
};
//Collect Bet amount
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet * lines > balance) {
      console.log("Invalid bet value , Enter different Value");
    } else {
      return numberBet;
    }
  }
};

//Spin Algorithm
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

//Transpose The matrix
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

//Display to the user
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
//Check Winner or not

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

//Start Game again
const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a blaance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;

    const reels = spin();
    const rows = transpose(reels);

    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won , $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }
    const playAgain = prompt("Do you wanna play again? Y/N ");
    if (playAgain != "y") break;
  }
};
game();
