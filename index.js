let deck = {};
let points = 0;
let thisCard = 0;
let prevCard = Math.floor(Math.random() * 14) + 1;
let pointLimit = 1; 



async function getCards() {
    // En asynkron funktion osm vi anropar fråt root för att hämta vårat sdeck så fort vår kod laddas och exkveras 
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await res.json(); // Vi löser ut body från vårat response och gör om det till ett javascriptobjekt 
   // console.log(data);
    deck = data; // VI assignar dataa till vårat deck så vi kan använda variablen senare. 
   // console.log(deck); 
}

getCards(); // Anropar funktionen 

const pointText = document.getElementById("pointText");
pointText.style.visibility = "hidden";

async function getANewCard(numb) {
     // Call the api and get an array of cards + response data
     const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
     const data = await res.json();
     printCard(data.cards[0]);
     thisCard = data.cards[0].value;
     thisCard = valueParser(thisCard);
     console.log("Created a thisCard value: " + thisCard);
     checkValue(numb);
}

// Draw a new card from the deck
const drawCardButton = document.getElementById("drawCard"); // Link our HTMLbutton
drawCardButton.style.visibility = 'hidden'; 
drawCardButton.addEventListener("click", async () => {
    // Call the api and get an array of cards + response data
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();;
    printCard(data.cards[0]);
    prevCard = data.cards[0].value;
    prevCard = valueParser(prevCard);
    userResponse.innerHTML ="";
    lowerButton.style.visibility = 'visible';
    higherButton.style.visibility = 'visible';
    rules.innerHTML="";
})

// Getting the holder for the cards and the element that shows the score
const cardPlaceholder = document.getElementById("cardPlaceholder")
const pointsNumber = document.getElementById("point");
pointsNumber.innerText = points;
pointsNumber.style.visibility ="hidden";

// Getting the user response (where the rules are written)
const userResponse = document.getElementById("userResponse");
const rules = document.getElementById("rules");
rules.innerHTML = `Rules: Draw a card - guess if the next card will be higher or lower than the card this card. 
<br>Values are 2-10 and then Jack = 11p, Queen = 12p, King = 13p, Ace = 14p and Joker = 15p`;

// Getting the 'win screen' and setting to hidden, will be activated if win-condition is fullfilled
const win = document.getElementById("win");
win.style.visibility = "hidden";


// Gett the elements to set a point limit 
const setPointLimit = document.getElementById("setPointLimit");
const pointsTextField = document.getElementById("pointsTextField");
const pointSetter = document.getElementById("pointSetter");
pointSetter.addEventListener("click", () => {
    
        pointLimit =  pointsTextField.value; 
        pointLimit = valueParser(pointLimit);
// Points must be set from 1 to 26 (a stack of cards is 52. Since we just user every other card to guess on we can reach a maximum of 26 points (52/2 = 26) )
// If poitns are set we hide the elements we will not use 
        if(pointLimit > 0 && pointLimit < 27) {
            console.log("Gick igenom");
            console.log(pointLimit);
            setPointLimit.style.visibility = 'hidden';
            drawCardButton.style.visibility = "visible";     
            pointText.style.visibility = "visible";
            pointsNumber.style.visibility ="visible";
        } else {
            console.log("Gick inte igenom");
            console.log(pointLimit);
            userResponse.style.visibility ="visible";
            userResponse.innerText = "Choose a number between 1 - 26";
        }

});

// Printing the cards value och suit to the screen
function printCard(cards) {
    const cardTitle = document.getElementById("cardTitle");
    const cardImage = document.getElementById("cardImage");
    cardTitle.innerHTML = cards.value + " " + cards.suit;
    cardImage.setAttribute("src", cards.image);
}

// Create two button, and initaly set them tho hidden (will be shown once we draw a new card)
const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");
higherButton.style.visibility = "hidden";
lowerButton.style.visibility = "hidden";

// When we press one of the buttons we sen 1 or 2 to the getANewCard function and hide the buttons
lowerButton.addEventListener("click", async () => {
   getANewCard(2);
   lowerButton.style.visibility = 'hidden';
   higherButton.style.visibility = 'hidden';
})

higherButton.addEventListener("click", async () => {
    getANewCard(1); 
    lowerButton.style.visibility = 'hidden';
    higherButton.style.visibility = 'hidden';
})

// Check the value we get from getANewCard function. Choose switch based on wich button was pressed
function checkValue(highLow) {
 
    if (highLow === 1){
        switch(thisCard) {
            case 2: 
            case 3: 
            case 4:           
            case 5: 
            case 6: 
            case 7: 
            case 8: 
            case 9: 
            case 10: 
            case 11: 
            case 12:
            case 13:
            case 14:
            case 15:  
            if (prevCard < thisCard) {
                points++;                               // if condition is met, we increase the points and update the HTML
                pointsNumber.innerText = points;
                userResponse.innerHTML =`Nice, you guess was righ! ${thisCard} is higher than ${prevCard}`;
                gameIsWon(); // for every point gained we check the win condition with this function
            }
            break;

            default:
                console.log("Mayday mayday, we crashed and burned!");
                break;
    
        } 
    }
        else if(highLow === 2) {
        switch(thisCard) {
            case 2: 
            case 3: 
            case 4: 
            case 5: 
            case 6: 
            case 7: 
            case 8: 
            case 9: 
            case 10: 
            case 11: 
            case 12:
            case 13:
            case 14:
            case 15:  
            if (prevCard > thisCard) {
                points++;
                pointsNumber.innerText = points;
                userResponse.innerHTML =`Nice, you guess was righ! ${thisCard} is lower than ${prevCard}`;
                gameIsWon();
            }
            break;

            default:
                console.log("Mayday mayday, we crashed and burned!");
                break;
        }
    }
}
    
// Parse the card from a string to a number. Needed since we have Jack, Queen etc
function valueParser(card) {
        switch(card) {
            case "2": 
            case "3": 
            case "4": 
            case "5": 
            case "6": 
            case "7": 
            case "8": 
            case "9": 
            case "10": 
            return parseInt(card);
           
            case "JACK": 
            return 11;          

            case "QUEEN":
            return 12; 
           
            case "KING":
            return 13; 
           
            case "ACE":
            return 14;

            case "JOKER":  
            return 15;

            default:
                return parseInt(card);
                break;
    
        } 

    }

// Win condition to see we got the desired scores and if so, print a win screen. 
function gameIsWon() {
    if (points === pointLimit) {
        cardPlaceholder.remove();
        drawCardButton.remove();
        higherButton.remove();
        lowerButton.remove();
        pointsNumber.remove();
        userResponse.remove();
        rules.remove();
        const pointText = document.getElementById("pointText");
        pointText.remove();
        const playArea = document.getElementById("playArea");
        playArea.remove();


        const winText = document.getElementById("winText");
        winText.innerHTML = `Nice work, you reached ${points} points!`
        win.style.visibility = "visible";

       
    }
}