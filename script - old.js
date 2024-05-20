let movesLeft = 9
let board

let boardElement = document.getElementById('board')
let winLose = document.getElementById('winlose')
let menu = document.getElementById('menu')
let bgBlur = document.getElementById('background-blur')
let retryBtn = document.getElementById('retry')

function input(cell) {
    if (movesLeft > 0) {
        board = document.getElementsByClassName('cell')

        if (board[cell].innerHTML == '') {
            board[cell].innerHTML = 'X';
            movesLeft--
        }
        else { return }
        if (movesLeft > 0) {
            let move = findBestMove(board)
            board[move].innerHTML = 'O';
            movesLeft--
        }

        let winner = checkWinner(board)
        if (winner == 'X') {
            let a = ([] + ! [] + "Afs3g").toLocaleLowerCase() + + ![] + ![[],[]] + "4252RAHUW"
            winLose.innerHTML = "X wins! code: " + a;
            showMenu()
            bgBlur.classList.add("blur")
            movesLeft = -1
        }
        else if (winner == 'O') {
            winLose.innerHTML = "O wins!"
            showMenu()
            bgBlur.classList.add("blur")
            movesLeft = -1
        }
    }
    if (movesLeft == 0) {
        winLose.innerHTML = "It's a draw!"
        showMenu()
        bgBlur.classList.add("blur")
    }
}

function showMenu() {
    winLose.style.zIndex = 5
    retryBtn.style.zIndex = 5
    retryBtn.disabled = false
    winLose.animate([{opacity: 1}], {fill: "forwards", easing: "ease-out", duration: 1000})
    retryBtn.animate([{opacity: 1}], {fill: "forwards", easing: "ease-out", duration: 1000})
}

function retry() {
    movesLeft = 9
    let tempBoard = document.getElementsByClassName('cell')
    for (let i = 0; i < tempBoard.length; i++) {
        tempBoard[i].innerHTML = ''
    }
    winLose.style.zIndex = -1
    retryBtn.style.zIndex = -1
    retryBtn.disabled = true
    winLose.animate([{opacity: 0}], {fill: "forwards", easing: "ease-in", duration: 500})
    retryBtn.animate([{opacity: 0}], {fill: "forwards", easing: "ease-in", duration: 500})
    bgBlur.classList.remove("blur")
}

function isMovesLeft(board) {
    for (let i = 0; i < 9; i++) {
        if (board[i].innerHTML == '') return true
    }
    return false
}

function checkWinner(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        let crntCell = i*3;
        if (board[crntCell].innerHTML != '' &&
        board[crntCell+1].innerHTML == board[crntCell].innerHTML &&
        board[crntCell+2].innerHTML == board[crntCell].innerHTML) {
            return board[crntCell].innerHTML
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[j].innerHTML != '' && 
        board[j+3].innerHTML == board[j].innerHTML &&
        board[j+6].innerHTML == board[j].innerHTML) {
            return board[j].innerHTML
        }
    }

    // Check diagonals
    if (board[0].innerHTML != '' && board[0].innerHTML == board[4].innerHTML && board[4].innerHTML == board[8].innerHTML) {
        return board[0].innerHTML
    }
    if (board[2].innerHTML != '' && board[2].innerHTML == board[4].innerHTML && board[4].innerHTML == board[6].innerHTML) {
        return board[2].innerHTML
    }

    return ''
}

function minimax(board, depth, alpha, beta, isMax) {
    let state = checkWinner(board)
    
    if (state == 'X') return -10 + depth
    if (state == 'O') return 10 - depth
    if (!isMovesLeft(board)) return 0

    if (isMax) {
        let bestScore = -Infinity
        for (let i = 0; i < 9; i++) {
            if (board[i].innerHTML == '') {
                board[i].innerHTML = 'O'
                let score = minimax(board, depth + 1, alpha, beta, false)
                board[i].innerHTML = ''
                bestScore = Math.max(bestScore, score)
                alpha = Math.max(alpha, bestScore)
                if (beta <= alpha) break
            }
        }
        return bestScore
    }
    if (!isMax) {
        let bestScore = Infinity
        for (let i = 0; i < 9; i++) {
            if (board[i].innerHTML == '') {
                board[i].innerHTML = 'X'
                let score = minimax(board, depth + 1, alpha, beta, true)
                board[i].innerHTML = ''
                bestScore = Math.min(bestScore, score)
                beta = Math.min(beta, bestScore)
                if (beta <= alpha) break
            }
        }
        return bestScore
    }
}

function findBestMove(board) {
    let bestScore = -Infinity
    let bestMove = -1

    for (let i = 0; i < 9; i++) {
        if (board[i].innerHTML == '') {
            board[i].innerHTML = 'O'
            let score = minimax(board, 0, -Infinity, Infinity, false)
            board[i].innerHTML = ''

            if (score > bestScore) {
                bestScore = score
                bestMove = i
            }
        }
    }
    return bestMove
}