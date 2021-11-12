let deck = {};

async function getCards() {
    // En asynkron funktion osm vi anropar fråt root för att hämta vårat sdeck så fort vår kod laddas och exkveras 
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await res.json(); // Vi löser ut body från vårat response och gör om det till ett javascriptobjekt 

   
    console.log(data);
    deck = data; // VI assignar dataa till vårat deck så vi kan använda variablen senare. 
    console.log(deck); 
}

getCards(); // Anropar funktionen 
drawFirstCard();


const drawCardButton = document.getElementById("drawCard"); // Link our HTMLbutton 
drawCardButton.addEventListener("click", async () => {
    // Call the api and get an array of cards + response data
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const data = await res.json();
    console.log(data.cards[0]); // Logging the first card
    printCard(data.cards[0]);
})

const cardPlaceholder = document.getElementById("cardPlaceholder")

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
})