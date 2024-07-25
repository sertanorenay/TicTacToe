import "./App.css";
import React, { useState, useEffect } from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function TicTacToe() {
  const [gameMode, setGameMode] = useState(null);
  const [xIsNext, setXIsNext] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [aiMove, setAiMove] = useState(false);

  var winningSquares = [null, null, null];
  const [a, b, c] = calculateWinner(squares) || [null, null, null];  
  let status;

  if (a !== null) {
    status = "Winner: " + squares[a];
    winningSquares = [a, b, c];
  } else if (!squares.includes(null)) {
    status = "Draw!";
  } else {
    status = (xIsNext ? "X" : "O") + "'s Turn";
  }

  useEffect(() => {
    if (aiMove && calculateWinner() === null && squares.includes(null)) {
      handleAIMove();
      setAiMove(false);
    }
  }, [aiMove, squares]);

  if (gameMode === null) { 
    return (
      <div>
        <div className="status">Select the game mode</div>
        <div className="board">
          <Square id="OnePlayer" value="1 Player" onClick={() => setGameMode(1)}/>
          <Square id="TwoPlayers" value="2 Players" onClick={() => setGameMode(2)}/>
        </div>
      </div>
    );
  }

  if (xIsNext === null) {
    return (
      <div>
        <div className="status">Select the symbol</div>
        <div className="board">
        <Square value="X" onClick={() => setXIsNext(true)}/>
        <Square value="O" onClick={() => setXIsNext(false)}/>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="status">{status}</div>
        <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onClick={() => handleClick(0)} isWinningSquare={winningSquares.includes(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} isWinningSquare={winningSquares.includes(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} isWinningSquare={winningSquares.includes(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} isWinningSquare={winningSquares.includes(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} isWinningSquare={winningSquares.includes(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} isWinningSquare={winningSquares.includes(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} isWinningSquare={winningSquares.includes(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} isWinningSquare={winningSquares.includes(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} isWinningSquare={winningSquares.includes(8)} />
        </div>
          <button onClick={handleRematch} className="rematch-button">
            Rematch
          </button>
        </div>
      </>
    );
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner()) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    if (gameMode === 1 && calculateWinner() === null && newSquares.includes(null)) {
      setTimeout(() => setAiMove(true), 500);
    }
  }

  function handleAIMove() {
    let emptyIndexes = squares.reduce((acc, el, i) => (el === null ? acc.concat(i) : acc), []);
    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    console.log("Random Index: " + randomIndex);
    console.log("Empty Indexes: " + emptyIndexes);

    const new_squares = squares.slice();
    new_squares[randomIndex] = xIsNext ? "X" : "O";
    
    setSquares(new_squares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [a, b, c];
      }
    }
    return null;
  }

  function handleRematch() {
    setAiMove(false);
    setXIsNext(null);
    setGameMode(null);
    setSquares(Array(9).fill(null));
    winningSquares = [null, null, null];
  }
}

function Square({ value, onClick, isWinningSquare, id}) {
  return (
    <button className={`square ${isWinningSquare ? 'winning-square' : ''}`} onClick={onClick} id={id}>
      {value}
    </button>
  );
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TicTacToe />
        {/* <ClearConsole /> */}
      </header>
    </div>
  );
}

/* function ClearConsole() {
  return (
    <button onClick={() => console.clear()} className="rematch-button">
      Clear Console
    </button>
  );
} */