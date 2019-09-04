const readlineSync = require('readline-sync');

    const playerCards = []
    const dealerCards = []
    const usedCards = []

const mainMenu = () => {
    const input = readlineSync.question("Welcome to Jack Black's Black Jack Extreme!\nWhat would you like to do?\n1: Deal the Cards!\n2: Quit")

    switch(input) {
        case "1":
            dealCards()
            break;
        case "2":
            return;
            break;
        default:
            console.log("please enter a valid input")
            mainMenu()
    };
};

