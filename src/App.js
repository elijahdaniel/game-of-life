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
    <div className='container'>
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
      <div className='rules'>
        <h3>Rules of the Game</h3>
        <p>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, live or dead, (or populated and unpopulated,
          respectively). Every cell interacts with its eight neighbours, which
          are the cells that are horizontally, vertically, or diagonally
          adjacent. At each step in time, the following transitions occur:
        </p>
        <ol>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ol>
        <p>
          These rules, which compare the behavior of the automaton to real life,
          can be condensed into the following:
        </p>
        <ol>
          <li>Any live cell with two or three live neighbors survives.</li>
          <li>Any dead cell with three live neighbours becomes a live cell.</li>
          <li>
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </li>
        </ol>
        <p>
          The initial pattern constitutes the seed of the system. The first
          generation is created by applying the above rules simultaneously to
          every cell in the seed; births and deaths occur simultaneously, and
          the discrete moment at which this happens is sometimes called a tick.
          Each generation is a pure function of the preceding one. The rules
          continue to be applied repeatedly to create further generations.
        </p>
        <p>
          To get started, generate a board by clicking the Random button or
          create a custom grid!
        </p>
        <a
          href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
          target='_blank'
        >
          Source
        </a>
      </div>
    </div>
  )
}

export default App
