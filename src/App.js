import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Square from "./components/Square";
import { patterns } from "./patterns";

const App = () => {
  //initialize state for a board
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [winnerCountX, setWinnerCountX] = useState(0);
  const [winnerCountO, setWinnerCountO] = useState(0);

  // let winnerStrX = `Player 1: ${winnerCountX}`;
  // let winnerStrO = `Player 2: ${winnerCountO}`;
  useEffect(() => {
    checkWinner();
    checkIfTie();
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      // alert(`Game finished! Winner: ${result.winner}`);
      restartGame();

      resetWinnerStr();
    }
  }, [result]);

  //choose square
  const chooseSquare = (square) => {
    setBoard(
      board.map((val, index) => {
        if (index === square && val === "") {
          return player;
        }
        return val;
      })
    );
  };

  //check winner
  const checkWinner = () => {
    patterns.forEach((curPattern) => {
      const firstPlayer = board[curPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      curPattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
        if (player === "X") {
          setWinnerCountX(winnerCountX + 1);
        } else if (player === "O") {
          setWinnerCountO(winnerCountO + 1);
        }
      }
    });
  };

  //check if tie
  const checkIfTie = () => {
    let allFilled = true;

    board.forEach((square) => {
      if (square === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      setResult({ winner: "No one", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

  const resetWinnerStr = () => {
    // winnerStr = "";
  };

  return (
    <>
      <div className="App">
        <h1 className="title">Tic Tac </h1>
        {/* <h2>{result.winner !== "none" ? winnerStr : ``}</h2> */}

        <div className="heading">
          <div className="scorecard">
            <p>Player 1 (X)</p>
            <div className="score">
              <p>
                {winnerCountX} - {winnerCountO}
              </p>
            </div>
            <p>Player 2 (O)</p>
          </div>
        </div>
        <div className="board">
          <div className="row">
            <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
            <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
            <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
          </div>
          <div className="row">
            <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
            <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
            <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
          </div>
          <div className="row">
            <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
            <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
            <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
