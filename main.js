/**************** MINI CLASS TO MODEL CARD OBJECT ******************/

function Box(id, color) {
    this.id = id;

    this.html = document.createElement('div')
    this.html.id = this.id
    this.html.style.backgroundColor = color;

    this.hide = (hideColor) => {
        this.html.style.backgroundColor = hideColor;
    }

    this.show = (showColor) => {
        this.html.style.backgroundColor = showColor;
    }
}

function Card(id, color = 'gray') {
    return new Box(id, color);
}



/********************** VARIABLES TO MAINTAIN STATE ***********************/

let cardColorMap = new Array(12);
let cardColorCount = [0, 0, 0, 0, 0, 0];
let cardClicked = [0, 0, 0, 0];

let cardColors = ["black", "red", "green", "indigo", "blue", "yellow"];

let noOfCards = 12;
let cards = []

secs = 2000;

score = document.getElementsByTagName("p");

var correct = 0;
var failure_msg = "Sorry, you failed. Try again";
var success_msg = "Think u're good, go again, see if u can make it 5 in a row, you already have 1";




/************ HELPER FUNCTIONS TO HANDLE/MAINTAIN STATE ******************/

rand = (num) => {
    return Math.floor(Math.random() * num);
}

showCards = () => {
    cards.forEach(card => {
        do {
            x = rand(6);
        } while (cardColorCount[x] == 2);

        cardColorCount[x] += 1;
        cardColorMap[card.id] = cardColors[x];

        card.show(cardColors[x]);
    })
}

hideCards = () => {
    cards.forEach(card => {
        card.hide('gray');
    })
}

clikt = (e) => {
    if (!e.target.matches('div.all')) return;
    card = cards[e.target.id];
    flip(card.id)
    console.log(card.show(cardColorMap[card.id]));
}

showIntructions = () => {
    alert("You have " + (secs / 1000) + " secs to glance at the color arrangement. If u pick 2 consecutive colors that are the same u score a point, else if u pick a two different colors, you have lost and the game resets");
    alert("Click OK when you're ready");
}

goAgain = (msg, reset) => {
    cardColorMap = new Array(12);
    cardColorCount = [0, 0, 0, 0, 0, 0];
    cardClicked = [0, 0, 0, 0];
    if (msg) {
        alert(msg);
    }
    alert("Click OK when you're ready");
    if (reset) {
        correct = 0;
    }
    hideCards();
    showCards();
    setTimeout(hideCards, secs);
}


/**************** START GAME *****************/

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
    setTimeout(hideCards, (secs / 2) * 2);

    // PLAY
}

/**************************************************************/

function flip(id) {
    if (cards[id].html.style.backgroundColor !== "gray") {
        return;
    }

    cards[id].html.style.backgroundColor = cardColorMap[id];

    if (cardClicked[0] == 0) {
        cardClicked[0] = 1;
        cardClicked[2] = id;
    }
    else if ((cardClicked[0] == 1) && (cardClicked[1] == 0)) {
        cardClicked[1] = 1;
        cardClicked[3] = id;
    }

    if ((cardClicked[0] == 1) && (cardClicked[1] == 1)) {
        if (cards[cardClicked[2]].html.style.backgroundColor == cards[cardClicked[3]].html.style.backgroundColor) {
            correct += 10;
            score[0].innerHTML = "Score: " + correct;
            if (correct % 60 == 0) {
                alert("Superb, you got all correctly");
                switch (correct) {
                    case 60: times = 5; break;
                    case 120: times = 4; break;
                    case 180: times = 3; break;
                    case 240: times = 2; break;
                    case 300: times = 1; break;
                }
                times -= 1;

                if (times == 4) {
                    goAgain(success_msg);
                }
                else if (times != 0) {
                    if (times < 0) { times = 5 }
                    goAgain("Remaining " + times + " times in a row");
                } else {
                    goAgain("You have proven yourself");
                }

            }
        }
        else {
            t = Math.floor(correct / 60);
            if (t < 5 && t >= 1) {
                t += 1;
                alert("Tough luck, you almost made it " + t + " time(s)");
            }
            else if (t >= 5) {
                alert("Wow, you did it, you really are good");
                goAgain("You could keep going", 1);
            }
            goAgain(failure_msg, 1);
        }

        for (i = 0; i < 4; i++) {
            cardClicked[i] = 0;
        }
    }

}
