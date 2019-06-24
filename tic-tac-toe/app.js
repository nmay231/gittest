const X = 'X'
const O = 'O'

let gameState
function resetGameState() {
    gameState = {
        turn: X,
        turnCount: 0,
        GameFinished: false,
        badAttempts: 0,
    }
}
resetGameState()


let turnHeading = document.querySelector('h3.turn')

let cells = document.querySelectorAll('div.row > div')

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked)
});


function cellClicked(e) {

    if (gameState.GameFinished) {
        resetGame()
        return
    }

    if (e.target.textContent == '') {
        e.target.textContent = gameState.turn

        for (line of e.target.className.split(' ')) {
            if (checkRow(line)) {
                endGame(line)
                return
            }
        }

        gameState.turn = (gameState.turn == X) ? O : X
        gameState.turnCount += 1
        turnHeading.textContent = gameState.turn + '\'s turn'

        if (gameState.turnCount >= 9) {
            gameState.GameFinished = true
            turnHeading.textContent = 'Oops! The game ended in a draw. Click to play again!'
        }
    } else {
        gameState.badAttempts += 1
        if (gameState.badAttempts%3 == 0) {
            alert('Click on an empty cell to play!')
        }
    }
}

function resetGame() {
    resetGameState()
    turnHeading.textContent = X + '\'s turn'
    for (cell of cells) {
        cell.textContent = ''
        cell.style.fontWeight = 'normal'
        cell.style.fontStyle = 'normal'
    }
}

function checkRow(className) {
    let cells = document.querySelectorAll('div.' + className)
    for (cell of cells) {
        if (cell.textContent != gameState.turn) {
            return false
        }
    }
    return true
}

function endGame(className) {
    let winning = document.querySelectorAll('div.' + className)
    for (cell of winning) {
        cell.style.fontWeight = 'bold'
        cell.style.fontStyle = 'italic'
    }
    turnHeading.textContent = gameState.turn + ' Won the game! Click to play again!'
    gameState.GameFinished = true
}