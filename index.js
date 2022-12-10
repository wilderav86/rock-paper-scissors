let score = 0;

//Elements
const scoreElement = document.querySelector(".score");
const playerChoiceElement = document.querySelector(".player-choice");
const houseChoiceElement = document.querySelector(".house-choice");
const resultGrid = document.querySelector(".result-grid");
const resultMessage = document.querySelector(".result-message");
const playAgainBtn = document.querySelector(".play-again-btn");
const cpuPickText = document.getElementById("cpu-pick-text");

const gameBoardContainer = document.querySelector(".game-board-container");
const resultsContainer = document.querySelector(".results-container");
const playAgainContainer = document.querySelector(".play-again-container");

//Functions

const play = async (playerChoice) => {
  const randomIndex = Math.floor(Math.random() * 3);
  const cpuChoice = gamePieceArray[randomIndex];

  toggleContainerVisibilities(gameBoardContainer, resultsContainer, resultGrid);
  renderPick(playerChoiceElement, playerChoice);
  await delayedRenderPick(houseChoiceElement, cpuChoice);
  await updateElementText(cpuPickText, "THE HOUSE PICKED");
  await delayedCompare(playerChoice, cpuChoice, 2300);
};

const createGamePiece = (name) => {
  const element = document.getElementById(name);
  return { name, element };
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

const delayedRenderPick = (element, choice, time = 1700) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(renderPick(element, choice));
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
        toggleContainerVisibilities(playAgainContainer),
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
      resultsContainer,
      playAgainContainer,
      resultGrid
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
