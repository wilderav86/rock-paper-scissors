let score = 0;

//Classes
class GamePiece {
  constructor(name) {
    this.name = name;
    this.element = document.getElementById(name);
  }
}

//Gamepieces
const rock = new GamePiece("rock");
const paper = new GamePiece("paper");
const scissors = new GamePiece("scissors");
const gamePieceArray = [rock, paper, scissors];

//Elements
const scoreElement = document.querySelector(".score");
const playerChoiceElement = document.querySelector(".player-choice");
const houseChoiceElement = document.querySelector(".house-choice");
const resultMessage = document.querySelector(".result-message");
const playAgainBtn = document.querySelector(".play-again-btn");

const gameBoardContainer = document.querySelector(".game-board-container");
const resultsContainer = document.querySelector(".results-container");
const playAgainContainer = document.querySelector(".play-again-container");

//Functions

const play = async (playerChoice) => {
  const randomIndex = Math.floor(Math.random() * 3);
  const cpuChoice = gamePieceArray[randomIndex];

  playerPicks(playerChoiceElement, playerChoice);
  await computerPicks(houseChoiceElement, cpuChoice);
  await compare(playerChoice, cpuChoice);
};

const renderPick = (element, choice) => {
  console.log("pick rendered");

  clonedNode = choice.element.cloneNode(true);
  element.appendChild(clonedNode);
};

const playerPicks = (playerChoiceElement, playerChoice) => {
  console.log("player has picked ", playerChoice.name);
  toggleContainerVisibility(gameBoardContainer, resultsContainer);
  renderPick(playerChoiceElement, playerChoice);
};

const computerPicks = (houseChoiceElement, cpuChoice) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("computer picked", cpuChoice.name);
      resolve(renderPick(houseChoiceElement, cpuChoice));
    }, 1700);
  });
};

const compare = (playerChoice, cpuChoice) => {
  const playerChose = playerChoice.name;
  const cpuChose = cpuChoice.name;

  return new Promise((resolve) => {
    setTimeout(() => {
      let result = "";

      const winParameters =
        (playerChose === "rock" && cpuChose === "scissors") ||
        (playerChose === "paper" && cpuChose === "rock") ||
        (playerChose === "scissors" && cpuChose === "paper");

      if (playerChose === cpuChose) {
        result = "draw";
      } else if (winParameters) {
        updateScore();
        result = "you win";
      } else {
        result = "you lose";
      }

      console.log("compared");

      resolve(
        (resultMessage.textContent = result),
        toggleContainerVisibility(playAgainContainer),
        console.log("result resolved", result)
      );
    }, 2300);
  });
};

const updateScore = () => {
  console.log("score updated");
  score += 1;

  localStorage.setItem("score", score);
  scoreElement.textContent = localStorage.getItem("score");
};

const toggleContainerVisibility = (...containers) => {
  containers.forEach((container) => {
    container.classList.toggle("disabled");
  });
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
    toggleContainerVisibility(
      gameBoardContainer,
      resultsContainer,
      playAgainContainer
    );
  }
};

// Default Values
scoreElement.textContent = !localStorage.getItem("score")
  ? 0
  : localStorage.getItem("score");

//EventListeners
gamePieceArray.forEach((gamePiece) => {
  gamePiece.element.addEventListener("click", () => {
    play(gamePiece);
  });
});

playAgainBtn.addEventListener("click", () => {
  resetElements(playerChoiceElement, houseChoiceElement);
});
