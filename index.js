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

const drawCardButton = document.getElementById("drawCard"); // Link our HTMLbutton
drawCardButton.style.visibility = 'hidden'; 
drawCardButton.addEventListener("click", async () => {
    // Call the api and get an array of cards + response data
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();;
    //console.log(data.cards[0]); // Logging the first card
    printCard(data.cards[0]);
    prevCard = data.cards[0].value;
    prevCard = valueParser(prevCard);
    userResponse.innerHTML ="";
    lowerButton.style.visibility = 'visible';
    higherButton.style.visibility = 'visible';
})



const cardPlaceholder = document.getElementById("cardPlaceholder")
const pointsNumber = document.getElementById("point");
pointsNumber.innerText = points;

const userResponse = document.getElementById("userResponse");
const rules = document.getElementById("rules");
rules.innerHTML = `Rules: Draw a card - guess if the next card will be higher or lower than the card this card. 
<br>Values are 2-10 and then Jack = 11p, Queen = 12p, King = 13p, Ace = 14p and Joker = 15p`;

const setPointLimit = document.getElementById("setPointLimit");
const pointsTextField = document.getElementById("pointsTextField");
const pointSetter = document.getElementById("pointSetter");
pointSetter.addEventListener("click", () => {
    
    pointLimit =  pointsTextField.value; 
    console.log(pointLimit);
    setPointLimit.style.visibility = 'hidden';
    hideOrShowButtons();
    
});

function printCard(cards) {
    const cardTitle = document.getElementById("cardTitle");
    const cardImage = document.getElementById("cardImage");
    cardTitle.innerHTML = cards.value + " " + cards.suit;
    cardImage.setAttribute("src", cards.image);
}

const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");
higherButton.style.visibility = "hidden";
lowerButton.style.visibility = "hidden";

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
                points++;
                pointsNumber.innerText = points;
                userResponse.innerHTML =`Nice, you guess was righ! ${thisCard} is higher than ${prevCard}`;
            }
            break;

            default:
                console.log("Fuck...something went wrong! ");
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
            }
            break;

            default:
                console.log("Fuck...something went wrong! ");
                break;
        }
    }
}
    

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
                console.log("Look into this!");
                break;
    
        } 

    }

function hideOrShowButtons() {
    
    if(drawCardButton.style.visibility === 'visible'|| higherButton.style.visibility === 'visible')  {
        drawCardButton.style.visibility = 'hidden';
        higherButton.style.visibility = 'hidden';
        lowerButton.style.visibility = 'hidden';
    } else {
        drawCardButton.style.visibility = 'visible';
        higherButton.style.visibility = 'visible';
        lowerButton.style.visibility = 'visible';
    }
   
}
   

function gameIsWon() {
    if (points === pointLimit) {
        
    }
}