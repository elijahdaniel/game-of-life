export const wholeGrid = ({ gridCols }) => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols}, 15px)`,
  }
}

export const gridColors = ({ grid, i, j, color }) => {
  return {
    width: 15,
    height: 15,
    // marginTop: 2,
    backgroundColor: grid[i][j] ? color : undefined,
    border: 'solid 1px #ccc',
  }
}
