let score = 0;

//SELECTORS

////Elements
const cpuPickText = document.getElementById("cpu-pick-text");
const endGradient = document.querySelector(".end-gradient");
const houseChoiceElement = document.querySelector(".house-choice");
const playerChoiceElement = document.querySelector(".player-choice");
const resultMessage = document.querySelector(".result-message");
const scoreElement = document.querySelector(".score");

////Buttons
const playAgainBtn = document.querySelector(".play-again-btn");
const rulesBtn = document.querySelector(".rules-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");

////Containers
const gameBoardContainer = document.querySelector(".game-board-container");
const playAgainContainer = document.querySelector(".play-again-container");
const resultsContainer = document.querySelector(".results-container");
const resultGrid = document.querySelector(".result-grid");
const rulesModalContainer = document.querySelector(".rules-modal-container");
const rulesModal = document.querySelector(".rules-modal");

console.log(rulesModalContainer);

//Functions
const play = async (playerChoice) => {
  const randomIndex = Math.floor(Math.random() * 3);
  const cpuChoice = gamePieceArray[randomIndex];

  toggleContainerVisibilities(gameBoardContainer, resultGrid);
  togglePendingVisibility(houseChoiceElement);
  renderPick(playerChoiceElement, playerChoice);
  await delayedRenderPick(houseChoiceElement, cpuChoice, 1500);
  await updateElementText(cpuPickText, "THE HOUSE PICKED");
  await delayedCompare(playerChoice, cpuChoice, 1500);
};

const createGamePiece = (name) => {
  const element = document.getElementById(name);
  const winner = false;
  return { name, element, winner };
};

const createGamePieces = (...names) => names.map(createGamePiece);

const renderPick = (element, choice) => {
  console.log("pick rendered", choice.name);

  clonedNode = choice.element.cloneNode(true);
  element.appendChild(clonedNode);
};

const updateElementText = (element, text) => {
  element.innerText = text;
};

const delayedRenderPick = (element, choice, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        renderPick(element, choice),
        togglePendingVisibility(houseChoiceElement)
      );
    }, time);
  });
};

const compare = ({ name: playerChoice }, { name: cpuChoice }) => {
  if (playerChoice === cpuChoice) {
    return "DRAW";
  }

  const playerWins =
    (playerChoice === "rock" && cpuChoice === "scissors") ||
    (playerChoice === "paper" && cpuChoice === "rock") ||
    (playerChoice === "scissors" && cpuChoice === "paper");

  if (playerWins) {
    updateScore();
    return "YOU WIN";
  }

  return "YOU LOSE";
};

const delayedCompare = (playerChoice, cpuChoice, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = compare(playerChoice, cpuChoice);
      resolve(
        (resultMessage.textContent = result),
        toggleContainerVisibilities(playAgainContainer, endGradient),
        console.log("result resolved", result)
      );
    }, time);
  });
};

const updateScore = () => {
  console.log("score updated");
  score += 1;

  localStorage.setItem("score", score);
  scoreElement.textContent = localStorage.getItem("score");
};

const toggleContainerVisibility = (container) =>
  container.classList.toggle("disabled");

const toggleContainerVisibilities = (...containers) => {
  containers.map(toggleContainerVisibility);
  console.log("containers", containers);
};

const togglePendingVisibility = (element) => {
  console.log("pendingtoggled");
  element.classList.toggle("pending");
};

const resetElements = (playerChoiceElement, houseChoiceElement) => {
  console.log("elements reset");
  while (
    playerChoiceElement.hasChildNodes() &&
    houseChoiceElement.hasChildNodes()
  ) {
    playerChoiceElement.removeChild(playerChoiceElement.firstChild);
    houseChoiceElement.removeChild(houseChoiceElement.firstChild);
    resultMessage.textContent = "";
    toggleContainerVisibilities(
      gameBoardContainer,
      playAgainContainer,
      resultGrid,
      endGradient
    );
  }
  updateElementText(cpuPickText, "");
};

// Default Values
scoreElement.textContent = !localStorage.getItem("score")
  ? 0
  : localStorage.getItem("score");

const gamePieceArray = createGamePieces("rock", "paper", "scissors");

//EventListeners
gamePieceArray.forEach((gamePiece) => {
  gamePiece.element.addEventListener("click", () => {
    play(gamePiece);
  });
});

playAgainBtn.addEventListener("click", () => {
  resetElements(playerChoiceElement, houseChoiceElement);
});

rulesBtn.addEventListener("click", () =>
  toggleContainerVisibilities(rulesModalContainer, rulesModal)
);

closeModalBtn.addEventListener("click", () =>
  toggleContainerVisibilities(rulesModal, rulesModalContainer)
);
