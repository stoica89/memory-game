document.addEventListener("DOMContentLoaded", initGame);

const container = document.querySelector(".container");
const scoreEl   = document.getElementById("scor");
const resetBtn  = document.getElementById("btnReset");

let firstCard = null;
let secondCard = null;
let matches = 0;
let moves = 0;
let lockBoard = false;

const backImage = "./img/bomb.png"; // imaginea unică de spate

function initGame() {
    resetBtn.addEventListener("click", startNewRound);
    startNewRound();
}

function startNewRound() {
    container.innerHTML = "";
    scoreEl.textContent = "0";
    resetBtn.disabled = true;
    matches = moves = 0;
    lockBoard = false;
    generateCards(4, 4);
}

function generateCards(rows, cols) {
    const totalCards = rows * cols;
    const keys = Array.from({ length: totalCards }, (_, i) => (i % 8) + 1);
    shuffle(keys);

    keys.forEach(key => {
        const card = document.createElement("img");
        card.dataset.key = key;
        card.dataset.back = backImage; // toate au același spate
        card.src = backImage;
        card.addEventListener("click", onCardClick);
        container.appendChild(card);
    });
}

function onCardClick(e) {
    const card = e.target;
    if (lockBoard || card === firstCard || card.dataset.matched) return;

    revealCard(card);

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        moves++;
        scoreEl.textContent = moves;
        checkMatch();
    }
}

function revealCard(card) {
    card.src = `./img/${card.dataset.key}.png`;
}

function hideCard(card) {
    card.src = card.dataset.back; // revine la bomb.png
}

function checkMatch() {
    if (firstCard.dataset.key === secondCard.dataset.key) {
        firstCard.dataset.matched = true;
        secondCard.dataset.matched = true;
        matches++;
        resetTurn();

        if (matches === 8) {
            alert("Felicitări, ai câștigat!");
            resetBtn.disabled = false;
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            hideCard(firstCard);
            hideCard(secondCard);
            resetTurn();
        }, 700);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

