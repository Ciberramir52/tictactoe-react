import { useState } from 'react'
import './App.css'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [winner, setWinner] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const handleClick = index => {
    if (board[index] || winner || !isGameActive) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    checkWinner(newBoard);
  }

  const checkWinner = currentBoard => {
    for (const row in winningLines) {
      const [a, b, c] = row;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        setWinner(isXNext ? playerX : playerO);
        setIsGameActive(false);
        return;
      }
    }

    if (!currentBoard.includes(null)) {
      setWinner('Draw')
      setIsGameActive(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsGameActive(true);
  }

  const startGame = () => {
    resetGame();
    setIsGameActive(true);
  }

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="players">
        <div>
          <label htmlFor="playerx">Player X:</label>
          <input
            id='playerx'
            type="text"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            disabled={isGameActive}
          />
        </div>
        <div>
          <label htmlFor="playero">Player O:</label>
          <input
            id='playero'
            type="text"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            disabled={isGameActive}
          />
        </div>
      </div>
      <div className="board">
        {
          board.map((cell, index) => (
            <div key={index} className='cell' onClick={() => handleClick(index)}>
              {cell}
            </div>
          ))
        }
      </div>
      <div className="status">
        {
          winner ? (
            winner === 'Draw' ? (
              <h2>It's a Draw!</h2>
            ) : (
              <h2>{winner} Wins!</h2>
            )
          ) : isGameActive ? (
            <h2>Next Player: {isXNext ? playerX : playerO}</h2>
          ) : (
            <h2>Press "Start Game" to Begin</h2>
          )
        }
      </div>
      <div className="controls">
        {
          !isGameActive ? (
            <button onClick={startGame}>Start Game</button>
          ) : (
            <button onClick={resetGame}>Restart Game</button>
          )
        }
      </div>
    </div>
  )
}

export default App
