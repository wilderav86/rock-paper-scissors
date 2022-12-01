class gamePiece {
  constructor(name) {
    this.name = name;
    this.id = document.getElementById(name);
  }

  shoot() {
    const ai = Math.floor(Math.random() * 3);

    console.log("computer picked", gamePieceArray[ai].name);
  }
}

const rock = new gamePiece("rock");
const paper = new gamePiece("paper");
const scissors = new gamePiece("scissors");
const gamePieceArray = [rock, paper, scissors];

gamePieceArray.forEach((piece) => {
  console.log("piece", piece);
  piece.id.addEventListener("click", (e) => {
    console.log(e.target);
    piece.shoot();
    console.log(piece.name, "has been clicked");
  });
});
