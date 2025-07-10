import { useState, useEffect } from 'react'
import './App.css'

function generateTTTWinPatterns(boardSize) {
    const topRow = Array(boardSize).fill(0).map((_, index) => index)

    let patterns = []

    for (let i = 0; i < boardSize; i++) {
        patterns.push(topRow.map(item => item + (boardSize * i))) // horizontals
        patterns.push(topRow.map(item => i + (item * boardSize))) // verticals
    }

    patterns.push(topRow.map(item => item * (boardSize + 1))) // diagonal left
    patterns.push(topRow.map(item => (item + 1) * (boardSize - 1))) // diagonal right

    return patterns
}

function App() {

  const [boardSize, setBoardSize] = useState(3)
  const [board, setBoard] = useState(Array(3 * 3).fill(''))
  const [isXTurn, setIsXTurn] = useState(true)
  const [winner, setWinner] = useState(null)
  const [boardInput, setBoardInput] = useState(boardSize)

  useEffect(() => {
    setBoard(Array(boardSize * boardSize).fill(''));
  }, [boardSize]);

  const winningPatterns = generateTTTWinPatterns(boardSize)
 
  const checkWinner = (currentBoard) => {
    for (let pattern of winningPatterns) {
      const first = currentBoard[pattern[0]]
      if (first && pattern.every(index => currentBoard[index] === first)) {
        return isXTurn ? 'X' : 'O'
      }
    }
    return null
  }

  const handleTurn = (index) => {
    if (board[index]) return

    setBoard(prev => {
      const newBoard = [...prev]
      newBoard[index] = isXTurn ? 'X' : 'O'
      const winner = checkWinner(board)
      setWinner(winner)
      return newBoard
    })
    
    setIsXTurn(prev => !prev)
  }

  const handleReset = () => {
    setBoard(Array(boardSize*boardSize).fill(''))
    setIsXTurn(true);
  }

  const handleBoardSize = (e) => {
      e.preventDefault()
      const value = Number(boardInput)
      if(!value || value < 2) {
        alert('Board size cannot be less than 2 x 2')
        return
      }
      setBoardSize(value)
  }
  
  return (
    <div>
      <h1>Tic tac toe</h1>
      <div>
        <form onSubmit={(e) => handleBoardSize(e)}>
            <p>Enter board size</p>
            <input type='number' min={2} default={boardSize} value={boardInput} onChange={(e) => setBoardInput(e.target.value)}/>
            <button>Save</button>
        </form>
        <button onClick={handleReset}>Reset game</button>
      </div>
      <p>{isXTurn ? 'X turn' : 'O turn'}</p>
      <div className='game-board' style={{ gridTemplateColumns: `repeat(${boardSize}, 50px)` }}>
        {board.map((tile, index) => <button className='board-tile' onClick={() => handleTurn(index)} key={index}>{tile}</button>)}
      </div>
    </div>
  )
}

export default App
