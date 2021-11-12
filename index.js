let deck = {};
let points = 0;
let thisCard = 0;
let prevCard = 1;

async function getCards() {
    // En asynkron funktion osm vi anropar fråt root för att hämta vårat sdeck så fort vår kod laddas och exkveras 
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await res.json(); // Vi löser ut body från vårat response och gör om det till ett javascriptobjekt 

   
    console.log(data);
    deck = data; // VI assignar dataa till vårat deck så vi kan använda variablen senare. 
    console.log(deck); 
}

getCards(); // Anropar funktionen 



const drawCardButton = document.getElementById("drawCard"); // Link our HTMLbutton 
drawCardButton.addEventListener("click", async () => {
    // Call the api and get an array of cards + response data
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();;
    console.log(data.cards[0]); // Logging the first card
    printCard(data.cards[0]);
    thisCard = data.cards[0].value;
})

const cardPlaceholder = document.getElementById("cardPlaceholder")
const pointsNumber = document.getElementById("point");
pointsNumber.innerText = points;

function printCard(cards) {
    const cardTitle = document.getElementById("cardTitle");
    const cardImage = document.getElementById("cardImage");
    cardTitle.innerHTML = cards.value + " " + cards.suit;
    cardImage.setAttribute("src", cards.image);
}

const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");

lowerButton.addEventListener("click", async () => {
    checkValue(2,  thisCard, prevCard)

})

higherButton.addEventListener("click", async () => {
    checkValue(1, thisCard)
})

function checkValue(highLow, thisCard) {
    console.log("number to beat: " + prevCard);
    thisCard = valueParser(thisCard);

    if (highLow === 1){
        console.log(`${thisCard} should be higher than ${prevCard}`);
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
                console.log(points);
                points++;
                pointsNumber.innerText = points;
                console.log("Should be given a point!")
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
            }
            break;

            default:
                console.log("Fuck...something went wrong! ");
                break;
        }
    }
    prevCard = thisCard;
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
           
            case "KNIGHT": 
            return 11;          

            case "QUEEN":
            return 12; 
           
            case "KING":
            return 13; 
           
            case "ACE":
            return 14;

            case "JACK":  
            return 15;

            default:
                console.log("Look into this!");
                break;
    
        } 

    }
   

