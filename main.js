let isCardOnTable = false
let currentCard
let yourCards = []
let yourState = 0
let classRemoveTimeout

// Choosing the DOM elements
const chosenCard = document.querySelector("#chosen-card")
const cardImg = document.querySelector("#card-graphic--img")
const cardTitle = document.querySelector("#card-graphic--title")
const acceptBtn = document.querySelector("#accept-btn")
const faithState = document.querySelector("#faith-state")
const showCardsBtn = document.querySelector("#show-cards-btn")
const cardTitleTwo = document.querySelector("#card-title")
const cardDescription = document.querySelector("#card-description")

const CrdPth = "./img/cards/"
const cards = [
    {   
        cardNumber: 1,
        name: "The Fool",
        path: CrdPth + "the-fool.jpg",
        impact: 0,
        desc: `Your future is blurry as your foolish mind does not care for thee outcome of your fate.`,  
    },
    {   
        cardNumber: 2,
        name: "The Magician",
        path: CrdPth + "the-magician.jpg",
        impact: 2,
        desc: `The Magician brings you shining things from the mighty farlands. Theese oriental items give you joy and prosperity.`,  
    },
    {   
        cardNumber: 3,
        name: "The High Priestess",
        path: CrdPth + "the-high-priestess.jpg",
        impact: 1,
        desc: `The Priestess comes to visit you with a message of belief and faith. She will give you directions and guidance.`,  
    },
    {   
        cardNumber: 4,
        name: "The Empress",
        path: CrdPth + "the-empress.jpg",
        impact: 0,
        desc: `The Empress comes at her largest beauty, rewards the devoted and punishes the lazy and crooked.`,  
    },
    {   
        cardNumber: 5,
        name: "Ring of Fortune",
        path: CrdPth + "ring-of-fortune.jpg",
        impact: 3,
        desc: `The luck is by your side. You face the bitter life and slay it's curses and traps`,  
    },
    {   
        cardNumber: 6,
        name: "Madness",
        path: CrdPth + "madness.jpg",
        impact: -3,
        desc: `The hands of madness are trying to get a grip of your mind. You must not let them.`,  
    },
    {   
        cardNumber: 7,
        name: "Death",
        path: CrdPth + "death.jpg",
        impact: -3,
        desc: `Nothing but nothing is what lies ahead. Your life is in great danger. The evil sprits are trying to get a hold of you.`,  
    },
    {   
        cardNumber: 8,
        name: "The Aggessor",
        path: CrdPth + "the-aggressor.jpg",
        impact: -2,
        desc: `An evil spirit is trying to ruin your mind and body. You must find help to best it.`,  
    },
    {   
        cardNumber: 9,
        name: "The Thirst",
        path: CrdPth + "the-thirst.jpg",
        impact: 1,
        desc: `You have insatiable thist for plasure. You can indulge a bit but don't get lost`,  
    },
    {   
        cardNumber: 10,
        name: "The Aplle of Sin",
        path: CrdPth + "the-apple-of-sin.jpg",
        impact: 0,
        desc: `Edden fruit seems unresistable but you must stay strong and not give yourself to the Devil.`,  
    },
    {   
        cardNumber: 11,
        name: "The Brothers",
        path: CrdPth + "the-brothers.jpg",
        impact: 3,
        desc: `Brothers are a symbol of frienship and trust. But they are not for each other forever.`,  
    },
    {   
        cardNumber: 12,
        name: "The Devil",
        path: CrdPth + "the-devil.jpg",
        impact: -3,
        desc: `The one who is leading you to the trap. Be very aware of your suggestions.`,  
    },
    {   
        cardNumber: 13,
        name: "The Emperor",
        path: CrdPth + "the-emperor.jpg",
        impact: 2,
        desc: `The Empreror rules fairly, but only if you are fair to him, or if the stars are aligned to his image.`,  
    },
    {   
        cardNumber: 14,
        name: "The Furies",
        path: CrdPth + "the-furies.jpg",
        impact: -1,
        desc: `Do not look to long. <br> They are mighty powerfull.`,  
    },
    {   
        cardNumber: 15,
        name: "The Chariot",
        path: CrdPth + "the-chariot.jpg",
        impact: 2,
        desc: `Your best foe for long travels. But you need to take care of him just as you take care of yourself.`,  
    },
    {   
        cardNumber: 16,
        name: "The Justice",
        path: CrdPth + "the-justice.jpg",
        impact: 0,
        desc: `The mighty Justice has come to serve it's power. If your conscience is clear, you have nothing to fear.`,  
    },
    {   
        cardNumber: 17,
        name: "The Monkey",
        path: CrdPth + "the-monkey.jpg",
        impact: 3,
        desc: `A funny monkey.`,  
    },
    {   
        cardNumber: 18,
        name: "The Offspring",
        path: CrdPth + "the-offspring.jpg",
        impact: 3,
        desc: `Wow, that's a lot of very similar puppies. Very cute!`,  
    },
    {   
        cardNumber: 19,
        name: "The Star",
        path: CrdPth + "the-star.jpg",
        impact: 3,
        desc: `Star lends you guidance when you need it the most – in the night`,  
    },
    {   
        cardNumber: 20,
        name: "The Sun",
        path: CrdPth + "the-sun.jpg",
        impact: 2,
        desc: `Sun is shining it's healing rays and will heal everything and everybody. You just have not stand in the shade.`,  
    },
    {   
        cardNumber: 21,
        name: "The Titties",
        path: CrdPth + "the-titties.jpg",
        impact: 3,
        desc: `Zayyyyyyyyym, she 21??`,  
    },
    {   
        cardNumber: 22,
        name: "The Tower",
        path: CrdPth + "the-tower.jpg",
        impact: 1,
        desc: `A very sturdy tower. It can hold a lot of weight, but if you remove just a single brick, it will collapse into dirt and dust`,  
    },
    {   
        cardNumber: 23,
        name: "The Wanderer",
        path: CrdPth + "the-wanderer.jpg",
        impact: 0,
        desc: `A wanderer has paid a visit. He brings exotic items for you to buy (probably for emeralds)`,  
    },
    {   
        cardNumber: 24,
        name: "Vokurka",
        path: CrdPth + "vokurka.jpg",
        impact: -3,
        desc: `Oh hey it's Vokurka... Pretend like you're happy to see him again.`,  
    },
]

// when your draw a card
draw: function drawCard() {
    if (isCardOnTable) {
        acceptCard(currentCard)
    } else {
        if (!chosenCard.classList.contains("card-accepted")) {
            isCardOnTable = true
            
            
            currentIndex = ranNum(cards.length)
            currentCard = cards[currentIndex]
            cards.splice(currentIndex, 1)
            
            cardTitle.innerHTML = `${currentCard.name}.`
            cardImg.style.backgroundImage = `url("${currentCard.path}")`
            cardTitleTwo.innerHTML = `${currentCard.name}`
            cardDescription.innerHTML = `${currentCard.desc}`

            chosenCard.classList.add("card-picked")
            acceptBtn.classList.remove("btn-unactive")

            let acceptListener = acceptBtn.addEventListener("click", e => {acceptCard(currentCard)}, {once: true})
        } else {
            chosenCard.classList.remove("card-picked", "card-accepted")
        }
    } 
}

function acceptCard(card) {
    isCardOnTable = false
    yourCards.push(card)
    chosenCard.classList.add("card-accepted")

    cardTitleTwo.innerHTML = `Draw a card to accept <br> your Faith...`
    cardDescription.innerHTML = ``
    acceptBtn.classList.add("btn-unactive")
    
    classRemoveTimeout = setTimeout( e => {chosenCard.classList.remove("card-picked", "card-accepted")}, 800)
}



// random number function
function ranNum(max) {
    return Math.floor(Math.random() * max)
}