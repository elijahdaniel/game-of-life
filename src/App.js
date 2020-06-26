import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'

import { wholeGrid, gridColors } from './styles/styles'

import './styles/sheet.scss'

const gridRows = 30
const gridCols = 50

const directions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const clearGrid = () => {
  const rows = []
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0))
  }

  return rows
}

const App = () => {
  const [grid, setGrid] = useState(clearGrid)
  const [running, setRunning] = useState(false)
  const [color, setColor] = useState('black')
  const [speed, setSpeed] = useState(40)

  const runningRef = useRef(running)
  runningRef.current = running

  const randomGrid = () => {
    const rows = []
    for (let i = 0; i < gridRows; i++) {
      rows.push(
        Array.from(Array(gridCols), () => (Math.random() > 0.7 ? 1 : 0))
      )
    }

    setGrid(rows)
  }

  const startGrid = () => {
    setRunning(!running)
    if (!running) {
      runningRef.current = true
      fireUpGrid()
    }
  }

  const toggleGrid = ({ i, j }) => {
    setGrid(
      produce(grid, gridCopy => {
        gridCopy[i][j] = grid[i][j] ? 0 : 1
      })
    )
  }

  const fireUpGrid = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < gridRows; i++) {
          for (let j = 0; j < gridCols; j++) {
            let neighbors = 0
            directions.forEach(([x, y]) => {
              const newI = i + x
              const newJ = j + y
              if (
                newI >= 0 &&
                newI < gridRows &&
                newJ >= 0 &&
                newJ < gridCols
              ) {
                neighbors += g[newI][newJ]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1
            }
          }
        }
      })
    })

    setTimeout(fireUpGrid, speed)
  }, [speed])

  return (
    <div className='App'>
      <h1>Game of Life</h1>
      <button onClick={startGrid}>{running ? 'stop' : 'start'}</button>
      <button onClick={randomGrid}>random</button>
      <button onClick={() => setGrid(clearGrid)}>clear</button>|
      <button className='slow' onClick={() => setSpeed(1000)}>
        slow
      </button>
      <button className='medium' onClick={() => setSpeed(400)}>
        medium
      </button>
      <button className='fast' onClick={() => setSpeed(40)}>
        fast
      </button>
      <div className='whole-grid' style={wholeGrid({ gridCols })}>
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleGrid({ i, j })}
              style={gridColors({ grid, i, j, color })}
            />
          ))
        )}
      </div>
      <div className='colors'>
        <span>Change Color:</span>`
        <div className='green' onClick={() => setColor('green')} />
        <div className='blue' onClick={() => setColor('blue')} />
        <div className='orange' onClick={() => setColor('orange')} />
        <div className='pink' onClick={() => setColor('pink')} />
        <div className='yellow' onClick={() => setColor('yellow')} />
        <div className='red' onClick={() => setColor('red')} />
      </div>
      <div className='speed'></div>
    </div>
  )
}

export default App
