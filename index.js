//Global
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
    // console.log("cpuChoice", cpuChoice);

    // first();
    // await second();
    // await third();

    renderPick(playerChoiceElement, playerChoice);
    await computerPick(houseChoiceElement, cpuChoice);
    await compare(playerChoice, cpuChoice);
    // console.log("you picked", playerChoice);
  }
}

const first = () => {
  console.log("player picked");
};

const second = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("cpu picked"));
    }, 1000);
  });
};

const third = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("results compared"));
    }, 1000);
  });
};

//Elements
const scoreElement = document.querySelector(".score");
const playerChoiceElement = document.querySelector(".player-choice");
const houseChoiceElement = document.querySelector(".house-choice");
const resultMessage = document.querySelector(".result-message");
const playAgainBtn = document.querySelector(".play-again-btn");

//Gamepieces
const rock = new gamePiece("rock");
const paper = new gamePiece("paper");
const scissors = new gamePiece("scissors");
const gamePieceArray = [rock, paper, scissors];

//Functions

const renderPick = (element, choice) => {
  console.log("pick rendered");
  clonedNode = choice.id.cloneNode(true);
  // console.log("choice.id", choice.id);
  // console.log("element", element);
  element.appendChild(clonedNode);
};

const computerPick = (houseChoiceElement, cpuChoice) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("computer picked", cpuChoice);
      resolve(renderPick(houseChoiceElement, cpuChoice));
    }, 1000);
  });
};

const compare = (playerChoice, cpuChoice) => {
  const playerChose = playerChoice.name;
  const cpuChose = cpuChoice.name;
  console.log(resultMessage);
  // console.log("comparefunction", playerChoice, cpuChoice);
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
      // console.log("result:", result);
      resolve(
        (resultMessage.textContent = result),
        console.log("result resolved", result)
      );
    }, 1000);
  });
};

const updateScore = () => {
  console.log("score updated");
  score += 1;
  // console.log("score =", score);
  scoreElement.textContent = score;
};

const resetElements = (playerChoiceElement, houseChoiceElement) => {
  console.log("elements reset");
  // console.log("houseEl", houseChoiceElement);
  // console.log("playerEl", playerChoiceElement);
  // console.log("clicked");
  while (
    playerChoiceElement.hasChildNodes() &&
    houseChoiceElement.hasChildNodes()
  ) {
    playerChoiceElement.removeChild(playerChoiceElement.firstChild);
    houseChoiceElement.removeChild(houseChoiceElement.firstChild);
    resultMessage.textContent = "";
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
