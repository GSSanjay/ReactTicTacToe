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
      alert(`Game finished! Winner: ${result.winner}`);
      restartGame();
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

  return (
    <>
      <div className="App">
        <h1>Tic Tac Toe</h1>
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
