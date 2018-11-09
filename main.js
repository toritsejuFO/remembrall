/**************** MINI CLASS TO MODEL CARD OBJECT ******************/

function Box(id, color) {
    this.id = id;

    this.html = document.createElement('div')
    this.html.id = this.id
    this.html.style.backgroundColor = color;

    this.hide = () => {
        this.html.style.backgroundColor = 'gray';
    }

    this.show = (showColor) => {
        this.html.style.backgroundColor = showColor;
    }

    this.getColor = () => {
        return this.html.style.backgroundColor;
    }
}

function Card(id, color = 'gray') {
    return new Box(id, color);
}



/********************** VARIABLES TO MAINTAIN STATE ***********************/

let cardColorMap = new Array(12);
let cardColorCount = [0, 0, 0, 0, 0, 0];
let cardClicked = {
    cardOne: false,
    cardOneId: false,
    cardTwo: false,
    cardTwoId: false
};

let cardColors = ['black', 'red', 'darkgreen', 'purple', 'darkblue', 'yellow'];

let noOfCards = 12;
let cards = []

secs = 2000;

scoreBoard = document.getElementById("scoreBoard");

let score = 0;
let failureMessage = `Sorry, you failed. Try again.`;
let successMessage = 'Good job, play on to get higher score';

let timer


/************ HELPER FUNCTIONS TO HANDLE/MAINTAIN STATE ******************/

rand = (num) => {
    return Math.floor(Math.random() * num);
}

showCards = () => {
    cards.forEach(card => {
        do {
            x = rand(noOfCards/2);
        } while (cardColorCount[x] == 2);

        cardColorCount[x] += 1;
        cardColorMap[card.id] = cardColors[x];

        card.show(cardColors[x]);
    })
}

hideCards = () => {
    cards.forEach(card => {
        card.hide();
    })
}

clikt = (e) => {
    if (!e.target.matches('div.all')) return;
    card = cards[e.target.id];
    flip(card.id)
}

showIntructions = () => {
    alert("You have " + (secs / 1000) + " seconds to glance at the color arrangement. If u pick 2 consecutive colors that are the same u score 10 point, else if u pick two different colors, you have lost and the game resets.");
    alert("Click OK when you're ready");
}

goAgain = (msg, reset) => {
    clearInterval(timer);

    cardColorMap = new Array(12);
    cardColorCount = [0, 0, 0, 0, 0, 0];
    cardClicked = {
        cardOne: false,
        cardOneId: false,
        cardTwo: false,
        cardTwoId: false
    };

    if (msg) alert(msg);
    alert("Click OK when you're ready");
    if (reset) score = 0;

    hideCards();
    showCards();
    setTimeout(hideCards, secs);
}

var getCorrectCardId = (correctCardColor) => {
    for(var cardId = 0; cardId < noOfCards; cardId++) {
        if(cardColorMap[cardId] == correctCardColor && cardClicked.cardOneId != cardId) {
            return cardId;
        }
    }
}

toggleCard = (correctCardId, correctCardColor) => {
    if(cards[correctCardId].getColor() != correctCardColor) cards[correctCardId].show(correctCardColor)
    else cards[correctCardId].hide()
}

flip = (id) => {
    /** If card is showing, do nothing */
    if (cards[id].getColor() !== "gray") {
        return;
    }

    /** Show card */
    cards[id].show(cardColorMap[id]);

    /** Check if clicked card is the FIRST of every TWO CARD SET clicked and update */
    if (cardClicked.cardOne == false) {
        cardClicked.cardOne = true;
        cardClicked.cardOneId = id;
    }
    // Check if clicked card is the SECOND of every TWO CARD SET clicked
    else if ((cardClicked.cardOne == true) && (cardClicked.cardTwo == false)) {
        cardClicked.cardTwo = true;
        cardClicked.cardTwoId = id;
    }

    /** Check if TWO CARD SET have been clicked */
    if ((cardClicked.cardOne == true) && (cardClicked.cardTwo == true)) {

        /** Check if the clicked cards in TWO SET have identical colors */
        if (cards[cardClicked.cardOneId].getColor() == cards[cardClicked.cardTwoId].getColor()) {

            /** Update */
            score += 10;
            scoreBoard.innerHTML = `Round ${Math.floor(score / 60) + 1}. Score:  + ${score}`;
            
            /** Show success message if round is cleared, then continue game */
            if (score % 60 == 0) setTimeout(goAgain.bind(null, successMessage), 500);
        }

        /** Check if the clicked cards in TWO SET have different colors */
        else {
            /** Toggle correct card */
            let correctCardColor = cardColorMap[cardClicked.cardOneId];
            let correctCardId = getCorrectCardId(correctCardColor);
            timer = setInterval(toggleCard.bind(null, correctCardId, correctCardColor), 100);

            /** Restart game */
            setTimeout(goAgain.bind(null, failureMessage, 1), 1000)
        };

        /** 
         * RESET FOR NEXT TWO SETS OF CARDS
         * This only runs if even number of cards are showing
         */
        cardClicked = {
            cardOne: false,
            cardOneId: false,
            cardTwo: false,
            cardTwoId: false
        };
    }

}

/********************* START GAME ***********************/

window.onload = () => {

    /**
     * Instantiate cards; Hidden by default
     */
    for (let i = 0; i < noOfCards; i++) {
        cards[i] = Card(i, 'gray');
    }

    /**
     * Add cards to html page
     */
    container = document.getElementById("container");
    cards.forEach(function (card) {
        card.html.className = 'all';
        container.appendChild(card.html);
    })
    container.addEventListener('click', clikt);

    /* Show game instructions and show cards after 1 second */
    setTimeout(() => {
        showIntructions()
        showCards()
    }, secs / 2);

    /** Hide cards 2 seconds after cards are shown */
    setTimeout(hideCards, (secs / 2) + secs);

    // PLAY
}
