const { exit } = require('node:process');
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let upper;
let lower;
let secretNum;
let guesses;

function askRange() {
    rl.question("What is going to be the lower limit of the guessing game? : ", (answer) => {
        lower = Number(answer);
        rl.question("And the upper one? : ", (answer) => {
            upper = Number(answer);
            secretNum = getRandomNum(lower, upper);
            rl.question("And finally, how many guesses do you want? : ", (answer) => {
                guesses = answer;
                askGuess();
            })
        })
    })
}



function askGuess() {
    rl.question("Guess the number! ", (answer) => {
        checkGuess(Number(answer));
    });
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function checkGuess(num) {
    if (num < secretNum) {
        console.log("Too low");
        guesses--;
        if (guesses === 0) {
            console.log("You lose!");
            console.log(`The number was ${secretNum}!`)
            rl.close();
        } else {
            console.log(`You have ${guesses} lives left!`);
            askGuess();
        }
    } else if (num > secretNum) {
        console.log("Too high");
        guesses--;
        if (guesses === 0) {
            console.log("You lose!");
            console.log(`The number was ${secretNum}!`)
            rl.close();
        } else {
            console.log(`You have ${guesses} lives left!`);
            askGuess();
        }
    } else {
        console.log("You win!");
        rl.close();
    }
}

// askGuess();
askRange();
