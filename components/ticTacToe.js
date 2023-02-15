import { useState } from 'react'

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]

export default function Game() {
  let [turn, setTurn] = useState('X')
  let [board, setBoard] = useState(Array(9).fill(''))
  let [previousBoard, setPreviousBoard] = useState(Array(9).fill(''))

  function reset(conditions) {
    let [condition, turn] = conditions
    if (condition === 'win') alert(`Player ${turn} Won!`)
    if (condition === 'tie') alert('No player won. Play again?')
    ;[...document.querySelectorAll('[data-index]')].map(
      (x) => (x.innerHTML = '')
    )
    setBoard(Array(9).fill(''))
    setPreviousBoard(Array(9).fill(''))
  }

  function handleMouseUp(e) {
    let { index } = e.target.dataset
    if (previousBoard[index] || board[index] !== turn) return
    let allsquares = board.filter((square) => square)
    let currentsquares = board
      .map((item, idx) => {
        if (item === turn) return idx
      })
      .filter((item) => item >= 0)
    let won = winConditions.find((winCondition) =>
      winCondition.every((square) => currentsquares.includes(square))
    )
    if (won) board = reset(['win', turn])
    if (allsquares.length === 9 && !won) board = reset(['tie'])
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  function handleMouseDown(e) {
    let { index } = e.target.dataset
    let element = document.querySelector(`[data-index="${index}"]`)
    if (element.innerHTML) return
    element.innerHTML = turn
    setPreviousBoard([...board])
    let newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
  }

  return (
    <div className='w-screen h-screen flex'>
      <div className='grid w-1/2 grid-cols-3 grid-rows-3 gap-3 p-3'>
        {board.map((square, idx) => (
          <p
            className='border-2 border-black text-9xl flex items-center justify-center'
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            data-index={idx}
            key={`square_${idx}`}
          ></p>
        ))}
      </div>
      <div className='w-1/2 h-full bg-green-500 flex items-center justify-center'>
        <h2 className=''>{`Player Move: ${turn}`}</h2>
      </div>
    </div>
  )
}
