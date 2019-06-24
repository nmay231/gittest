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

let cells = document.querySelectorAll('div.row > div > div')

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
        e.target.classList.add('placed')

        for (line of e.target.parentElement.className.split(' ')) {
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
            for (cell of cells) {
                cell.classList.remove('placed')
                cell.classList.add('draw')
            }
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
        cell.classList.remove('win')
        cell.classList.remove('draw')
        cell.classList.remove('placed')
    }
}

function checkRow(className) {
    let cells = document.querySelectorAll('div.' + className + ' > div')
    for (cell of cells) {
        if (cell.textContent != gameState.turn) {
            return false
        }
    }
    return true
}

function endGame(className) {
    let winning = document.querySelectorAll('div.' + className + ' > div')
    for (cell of winning) {
        cell.classList.remove('placed')
        cell.classList.add('win')
    }
    turnHeading.textContent = gameState.turn + ' Won the game! Click to play again!'
    gameState.GameFinished = true
}