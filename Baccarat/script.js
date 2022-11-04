import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const playerCardSlot = document.querySelector('.player-card-slot')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound

document.addEventListener('click', () => {
    if(inRound){
        cleanBeforeRound()
    }else{
        flipCards()
    }
})

startGame()

function startGame(){
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0,deckMidpoint))
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numOfCards))
    
    console.log(playerDeck)
    console.log(computerDeck)
    inRound = false

    cleanBeforeRound()
}

function cleanBeforeRound(){
    inRound = false
    text.innerText = ''
    playerCardSlot.innerHTML = ''
    computerCardSlot.innerHTML = ''

    updateDeckCount()
}

function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.numOfCards
    playerDeckElement.innerText = playerDeck.numOfCards

}

function flipCards(){
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    console.log("playerDeck", playerDeck)
    console.log("computerDeck:", computerDeck)

    playerDeck.shuffle()
    computerDeck.shuffle()

    updateDeckCount()
    if(isRoundWinner(playerCard,computerCard)){
        text.innerText = 'Win'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard) 
    }else if(isRoundWinner(playerCard,computerCard) == false){
        text.innerText = 'Lose'
        computerDeck.push(playerCard)
        computerDeck.push(computerCard) 
    }else{
        text.innerText = 'Tie'
        playerDeck.push(playerCard)
        computerDeck.push(computerCard) 
    }
}

function isRoundWinner(card1, card2){
   return CARD_VALUE_MAP[card1.value] > CARD_VALUE_MAP[card2.value]
}