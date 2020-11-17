import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'
import Colors from './components/Colors';
import Controls from './components/Controls';
import { gridRows, gridCols, directions, clearGrid } from './components/Grid';

import { wholeGrid, gridColors } from './styles/styles'

import './styles/sheet.scss'

const App = () => {
  const [grid, setGrid] = useState(clearGrid)
  const [running, setRunning] = useState(false)
  const [color, setColor] = useState('black')
  const [speed, setSpeed] = useState()


  const runningRef = useRef(running)
  runningRef.current = running

  const randomGrid = () => {
    const rows = []
    for (let i = 0;i < gridRows;i++) {
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
        for (let i = 0;i < gridRows;i++) {
          for (let j = 0;j < gridCols;j++) {
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
      <h1>Conway's Game of Life</h1>
      <Controls
        randomGrid={randomGrid}
        startGrid={startGrid}
        clearGrid={clearGrid}
        setSpeed={setSpeed}
        running={running}
        setGrid={setGrid}
      />
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
      <Colors setColor={setColor} />
    </div>
  )
}

export default App
