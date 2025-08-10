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

console.log(generateTTTWinPatterns(3))

