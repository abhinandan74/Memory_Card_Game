const board = document.querySelector(".game-board");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let emojis = ["🍎","🍌","🍇","🍒","🍉","🥝","🍍","🍑"]; 
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

// Start Game
function startGame() {
  board.innerHTML = "";
  score = 0;
  scoreDisplay.textContent = score;

  cards = [...emojis, ...emojis];
  cards.sort(() => 0.5 - Math.random());

  cards.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">${emoji}</div>
      <div class="back"></div>
    `;
    board.appendChild(card);

    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.querySelector(".front").textContent === 
                secondCard.querySelector(".front").textContent;

  if (isMatch) {
    disableCards();
    score++;
    scoreDisplay.textContent = score;

    // Win Check
    if (score === emojis.length) {
      setTimeout(() => alert("🎉 You Win!"), 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart Button
restartBtn.addEventListener("click", startGame);

// Load Game First Time
startGame();
