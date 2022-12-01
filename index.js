class gamePiece {
  constructor(name) {
    this.name = name;
    this.id = document.getElementById(name);
  }

  play(playerChoice) {
    const randomIndex = Math.floor(Math.random() * 3);
    const cpuChoice = gamePieceArray[randomIndex].name;
    console.log("you picked", playerChoice);
    console.log("computer picked", cpuChoice);
    compare(playerChoice, cpuChoice);
  }
}

//Global
let score = 0;

//Elements
const scoreElement = document.querySelector(".score");

//Gamepieces
const rock = new gamePiece("rock");
const paper = new gamePiece("paper");
const scissors = new gamePiece("scissors");
const gamePieceArray = [rock, paper, scissors];

//Functions
const compare = (playerChoice, cpuChoice) => {
  let result = "";
  if (playerChoice === cpuChoice) {
    result = "draw";
  } else if (
    (playerChoice === "rock" && cpuChoice === "scissors") ||
    (playerChoice === "paper" && cpuChoice === "rock") ||
    (playerChoice === "scissors" && cpuChoice === "paper")
  ) {
    updateScore();
    result = "you win";
  } else if (
    (playerChoice === "rock" && cpuChoice === "paper") ||
    (playerChoice === "paper" && cpuChoice === "scissors") ||
    (playerChoice === "scissors" && cpuChoice === "rock")
  ) {
    result = "you lose";
  }
  console.log(result);
  return result;
};

const updateScore = () => {
  score += 1;
  scoreElement.textContent = score;
  console.log("score =", score);
};

//EventListeners
gamePieceArray.forEach((gamePiece) => {
  gamePiece.id.addEventListener("click", () => {
    const { name } = gamePiece;

    gamePiece.play(name);
  });
});
