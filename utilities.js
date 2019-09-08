const readlineSync = require('readline-sync');
let cards = require('./deckofcards.json');

const bestScore = 21;

const wait = (ms) => {
    const d = new Date();
    let d2 = null;
    do {
        d2 = new Date;
    } while(d2 - d < ms);
};

class Player{
    constructor() {
        this.currentHand = 0; 
        this.cards = [];
        this.bust = false;
        this.winCount = 0;
    };

    addCard(card) {
        this.cards.push(card);
    };
};

class Dealer{
    constructor() {
        this.name = "Jack Black";
        this.currentHand = 0;
        this.cards = [];
        this.bust = false;
        this.winCount = 0;
    };

    addCard(card) {
        this.cards.push(card);
    };
};

let player = new Player();
const dealer = new Dealer();
let usedCards = [];

const mainMenu = () => {
    wait(1200);
    console.log(`${cards[9].ascii}`);
    wait(1200);
    console.log(`${cards[12].ascii}`);
    wait(1200);
    console.log(`${cards[11].ascii}`);
    wait(1200);
    const input = readlineSync.question("\nWelcome to Jack Black's Black Jack Extreme!\n\nWhat would you like to do?\n\n1: Deal the Cards!\n2: Quit\n");

    switch(input) {
        case "1":
            const intro = "\nAlright! Time to feel the thunder! Rigga goo goo! Rigga goo goo!\n";
            wait(1200);
            console.log(intro);
            wait(1000);
            dealCards();
            break;
        case "2":
            return;
        default:
            console.log("\nplease enter a valid input\n");
            mainMenu();
            break;
    };
};

const dealCards = () => {    

    for(i=0; i < 2; i++) {
        // choose random cards 
        checkDeck()
        let randomizer = Math.floor(Math.random() * cards.length);
        let randomcard = cards[randomizer];
        // deal the cards
        player.addCard(randomcard);
        valueChecker(player, randomcard);
        usedCards.push(...cards.splice(randomizer, 1));

        checkDeck()
        // choose random cards 
        randomizer = Math.floor(Math.random() * cards.length);
        randomcard = cards[randomizer];
        // deal the cards
        dealer.addCard(randomcard);
        valueChecker(dealer, randomcard);
        usedCards.push(...cards.splice(randomizer, 1));
    };
    showFirstDealerCard();
    showPlayerCards();
};

const showPlayerCards = () => {
    console.log("\nYour Cards:");
    player.cards.forEach(card => {
        wait(1000);
        console.log(card.ascii + ` The ${card.name} of ${card.suit}` );
    });
    wait(1000)
    console.log(`\nThe total of your hand is ${player.currentHand}`);
    is21();

    if(player.currentHand > bestScore) {
        console.log(`You went Bust! ${dealer.name} wins this round`);
        player.bust = true;
        dealer.winCount += 1;
        wait(1000);
        printScore();
        
    } else {
        playerOptions();
    };
};

const showFirstDealerCard = () => {
    console.log(`${dealer.name} reveals one of his cards...`);
    wait(1000);
    console.log(`${dealer.cards[0].ascii} The ${dealer.cards[0].name} of ${dealer.cards[0].suit}`)
    wait(2000);
};

const showDealerCards = () => {
    console.log(`\n ${dealer.name}'s Cards:`);
    dealer.cards.forEach(card => {
        wait(1200);
        console.log(card.ascii + ` The ${card.name} of ${card.suit}` );
    });
    wait(1200)
    console.log(`\nThe total of ${dealer.name}'s hand is ${dealer.currentHand}`);

    if(dealer.currentHand > bestScore) {
        console.log(`${dealer.name} went Bust!`);
        wait(1200);
        dealer.bust = true;
        player.winCount +=1;
        console.log("You Won this round!");
        wait(1200);
        printScore();

    } else {
        dealerPlay();
    };
};

const playerOptions = () => {
    const input = readlineSync.question("\nWhat would you like to do?\n1. Hit\n2. Stand\n");

    switch(input) {
        case "1":
            console.log("\nYou have chosen to Hit!\n")
            wait(1000)
            playerHit();
            break;
        case "2":
            console.log("\nYou have chosen to Stand\n")
            wait(1000)
            console.log(`\nIt's now ${dealer.name}'s turn\n`)
            wait(1000)
            showDealerCards();
            break;
        default:
            console.log("Please enter a relevant input");
            playerOptions();
            break;
    };
};

const playerHit = () => {
    checkDeck()
    let randomizer = Math.floor(Math.random() * cards.length);
    let randomcard = cards[randomizer];
    player.addCard(randomcard);
    valueChecker(player, randomcard);
    usedCards.push(...cards.splice(randomizer, 1));
    showPlayerCards();
};

const dealerHit = () => {
    checkDeck()
    let randomizer = Math.floor(Math.random() * cards.length);
    let randomcard = cards[randomizer];
    dealer.addCard(randomcard);
    valueChecker(dealer, randomcard);
    usedCards.push(...cards.splice(randomizer, 1));
    showDealerCards();
};

const dealerPlay = () => {
    if(dealer.currentHand <= 16) {
        console.log(`${dealer.name} chooses to hit with a thunderous rage!`)
        wait(1200);
        dealerHit();
    } else {
        console.log(`${dealer.name} chose to stand\n`);
        wait(1000);
        checkWinner();
    };
};

const valueChecker = (player, card) => {
    if(card.name != "Ace") {
        player.currentHand += card.value;
    } else {
        if((player.currentHand + card.value) > bestScore) {
            player.currentHand += 1;
        } else {
            player.currentHand += card.value;
        };
    };
};

const checkWinner = () => {
    if (player.currentHand === dealer.currentHand) {
        dealer.winCount += 1;
        console.log(`It's a stalemate!
        Your hand: ${player.currentHand}
        ${dealer.name}'s hand: ${dealer.currentHand}
        `)
        wait(2000);
        console.log(`${dealer.name} wins by default...`)
        wait(1000);
        printScore();    
    } else if (player.currentHand > dealer.currentHand) {
        player.winCount += 1;
        console.log(`You win this round!
        Your hand: ${player.currentHand}
        ${dealer.name}'s hand: ${dealer.currentHand}
        `)
        wait(2000);
        printScore();
    } else {
        dealer.winCount += 1;
        console.log(`${dealer.name} wins this round!
        Your hand: ${player.currentHand}
        ${dealer.name}'s hand: ${dealer.currentHand}
        `)
        wait(2000);
        printScore();
    };
};

const playAgain = () => {
    const input = readlineSync.question("\nWould you like to play again?\n1. Yes\n2. No\n");

    switch(input) {
        case "1":
            newRound()
            break;
        case "2":
            finalResult()
            break;
        default:
            console.log("Please enter a relevant input");
            playerAgain();
            break;
    };
};

const newRound = () => {
    player.bust = false;
    player.cards = [];
    player.currentHand = 0;
    dealer.bust = false;
    dealer.cards = [];
    dealer.currentHand = 0;
    dealCards()
};

const finalResult = () => {
    if (player.winCount > dealer.winCount) {
        console.log(`\nYou won ${player.winCount} rounds and ${dealer.name} has won ${dealer.winCount}, Congratulations on winning! You Rock!\n`)
    } else if(player.winCount == dealer.winCount) {
        console.log(`\nYou won ${player.winCount} rounds and ${dealer.name} has won ${dealer.winCount}, Even Stevens!\n`)
    } else {
        console.log(`\nYou won ${player.winCount} rounds and ${dealer.name} has won ${dealer.winCount}, Jack Black is the winner!\n`)
    };
    return;    
};

const printScore = () => {
    wait(500);
    console.log(`\nCurrent score:\n`);
    wait(1000);
    console.log(`\nYou: ${player.winCount}\n`);
    wait(1000);
    console.log(`\n${dealer.name}: ${dealer.winCount}\n`);
    wait(1000);
    // console.log(`Cards left in deck: ${cards.length}`)
    playAgain();
};

const is21 = () => {
    if (player.currentHand === 21) {
        player.winCount += 1;
        console.log(`You got Black Jack against Jack Black, Taste the Victory!
        Your hand: ${player.currentHand}
        ${dealer.name}'s hand: ${dealer.currentHand}
        `)
        wait(2000);
        printScore();
    };
};

const checkDeck = () => {
    if (cards.length <= 4 ) {
        resetCards();
    };
};

const resetCards = () => {
    cards.push(...usedCards);
    usedCards = [];
};

module.exports = { mainMenu, resetCards, dealCards, usedCards };