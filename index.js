let deck = {};
let points = 0;

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
    const data = await res.json();
    console.log(data.cards[0]); // Logging the first card
    printCard(data.cards[0]);
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
    // Call the api and get an array of cards + response data
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();
    console.log(data.cards[0]); // Logging the first card
    printCard(data.cards[0]);
})

higherButton.addEventListener("click", async () => {
    // Call the api and get an array of cards + response data
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();
    console.log(data.cards[0]); // Logging the first card
    printCard(data.cards[0]);
    checkValue(1, data.cards[0].value)
})

function checkValue(numb, card) {
    console.log(card)
    if (numb === 1){

        switch(card) {
            case "2": 
            parseInt(card);
            if (numb >= card) {
                points++;
            }
            break;

            case "3": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "4": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "5": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "6": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "7": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "8": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "9": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;

            case "10": 
            parseInt(card);
            if (numb > card) {
                points++;
            }
            break;
            
            case "KNIGHT": 
            card = 11;
            if (numb > card) {
                points++;
            }
            break;

            case "QUEEN":
            card = 12; 
            if (numb > card) {
                points++;
            }
            break;

            case "KING":
            card = 13; 
            if (numb > card) {
                points++;
            }
            break;

            case "ACE":
            card = 14; 
            if (numb > card) {
                points++;
            }
            break;

            case "JACK":  
            card = 15;
            if (numb > card) {
                points++;
            }
            break;


            default:
                console.log("Fuck...something went wrong! ");
                break;
    
        } 

    }
    
        else if(numb === 2) {
    
        switch(card) {
            case "2": 
            parseInt(card);
            if (numb <= card) {
                points++;
            }
            break;

            case "3": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "4": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "5": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "6": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "7": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "8": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "9": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;

            case "10": 
            parseInt(card);
            if (numb < card) {
                points++;
            }
            break;
            
            case "KNIGHT": 
            card = 11;
            if (numb < card) {
                points++;
            }
            break;

            case "QUEEN":
            card = 12; 
            if (numb < card) {
                points++;
            }
            break;

            case "KING":
            card = 13; 
            if (numb < card) {
                points++;
            }
            break;

            case "ACE":
            card = 14; 
            if (numb < card) {
                points++;
            }
            break;

            case "JACK":  
            card = 15;
            if (numb < card) {
                points++;
            }
            break;

            default:
                console.log("Fuck...something went wrong! ");
                break;
        
         


        }
    }
}
    
