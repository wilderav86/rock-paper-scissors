let score = 0;

//Classes
class gamePiece {
  constructor(name) {
    this.name = name;
    this.id = document.getElementById(name);
  }

  async play(playerChoice) {
    const randomIndex = Math.floor(Math.random() * 3);
    const cpuChoice = gamePieceArray[randomIndex];

    playerPicks(playerChoiceElement, playerChoice);
    await computerPicks(houseChoiceElement, cpuChoice);
    await compare(playerChoice, cpuChoice);
  }
}

//Gamepieces
const rock = new gamePiece("rock");
const paper = new gamePiece("paper");
const scissors = new gamePiece("scissors");
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
const renderPick = (element, choice) => {
  console.log("pick rendered");
  containerRenderControl(gameBoardContainer, "none");
  containerRenderControl(resultsContainer, "block");
  clonedNode = choice.id.cloneNode(true);
  element.appendChild(clonedNode);
};

const playerPicks = (playerChoiceElement, playerChoice) => {
  renderPick(playerChoiceElement, playerChoice);
};

const computerPicks = (houseChoiceElement, cpuChoice) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("computer picked", cpuChoice);
      resolve(renderPick(houseChoiceElement, cpuChoice));
    }, 1500);
  });
};

const compare = (playerChoice, cpuChoice) => {
  const playerChose = playerChoice.name;
  const cpuChose = cpuChoice.name;

  return new Promise((resolve) => {
    setTimeout(() => {
      let result = "";

      console.log("compared");
      if (playerChose === cpuChose) {
        result = "draw";
      } else if (
        (playerChose === "rock" && cpuChose === "scissors") ||
        (playerChose === "paper" && cpuChose === "rock") ||
        (playerChose === "scissors" && cpuChose === "paper")
      ) {
        updateScore();
        result = "you win";
      } else if (
        (playerChose === "rock" && cpuChose === "paper") ||
        (playerChose === "paper" && cpuChose === "scissors") ||
        (playerChose === "scissors" && cpuChose === "rock")
      ) {
        result = "you lose";
      }

      resolve(
        (resultMessage.textContent = result),
        containerRenderControl(playAgainContainer, "block"),
        console.log("result resolved", result)
      );
    }, 1500);
  });
};

const updateScore = () => {
  console.log("score updated");
  score += 1;
  scoreElement.textContent = score;
};

const containerRenderControl = (container, visibility) => {
  container.style.display = visibility;
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
    containerRenderControl(gameBoardContainer, "flex");
    containerRenderControl(resultsContainer, "none");
    containerRenderControl(playAgainContainer, "none");
  }
};

//EventListeners
gamePieceArray.forEach((gamePiece) => {
  gamePiece.id.addEventListener("click", () => {
    gamePiece.play(gamePiece);
  });
});

playAgainBtn.addEventListener("click", () => {
  resetElements(playerChoiceElement, houseChoiceElement);
});
