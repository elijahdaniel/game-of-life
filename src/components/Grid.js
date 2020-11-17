export const gridRows = 30
export const gridCols = 50
export const directions = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]]
export const clearGrid = () => {
    const rows = []
    for (let i = 0;i < gridRows;i++) {
        rows.push(Array.from(Array(gridCols), () => 0))
    }
    return rows
}