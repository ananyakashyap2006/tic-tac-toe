
import { useState } from "react";
import "./App.css";

function checkWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    let a = lines[i][0];
    let b = lines[i][1];
    let c = lines[i][2];

    if (
      boxes[a] !== "" &&
      boxes[a] === boxes[b] &&
      boxes[b] === boxes[c]
    ) {
      return boxes[a];
    }
  }

  return "";
}

function App() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);

  function handleClick(index) {
    if (boxes[index] !== "" || winner !== "" || draw) {
      return;
    }

    const newBoxes = [...boxes];
    newBoxes[index] = player;

    setBoxes(newBoxes);

    const result = checkWinner(newBoxes);

    if (result !== "") {
      setWinner(result);
      return;
    }

    let full = true;

    for (let i = 0; i < newBoxes.length; i++) {
      if (newBoxes[i] === "") {
        full = false;
      }
    }

    if (full === true) {
      setDraw(true);
      return;
    }

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }

  function resetGame() {
    setBoxes(Array(9).fill(""));
    setPlayer("X");
    setWinner("");
    setDraw(false);
  }

  let message = "";

  if (winner !== "") {
    message = "🏆 Winner: " + winner;
  } else if (draw === true) {
    message = "🤝 Game Draw!";
  } else {
    message = "Next Player: " + player;
  }

  return (
    <div className="game">
      <div className="circle circle-one"></div>
      <div className="circle circle-two"></div>

      <div className="game-content">
        <h1 className="title">
          Tic <span>Tac</span> Toe
        </h1>

        <p className="subtitle">Think • Place • Win</p>

        <div className="turn-box">
          {message}
        </div>

        <div className="board">
          {boxes.map(function (value, index) {
            return (
              <button
                className="square"
                key={index}
                onClick={function () {
                  handleClick(index);
                }}
              >
                {value}
              </button>
            );
          })}
        </div>

        <button className="reset" onClick={resetGame}>
          ↻ Restart Game
        </button>

      </div>
    </div>
  );
}

export default App;
