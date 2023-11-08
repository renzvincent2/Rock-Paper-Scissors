const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const resetButton = document.querySelector('[data-reset-button]') // Add a button in your HTML with data-reset-button attribute
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊🏻',
        beats: 'scissors'
    },

    {
        name: 'paper',
        emoji: '✋🏼',
        beats: 'rock'
    },

    {
        name: 'scissors',
        emoji: '✌🏻',
        beats: 'paper'
    }
]

let yourWins = 0;
let computerWins = 0;

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        if (yourWins < 5 && computerWins < 5) {
            const selectionName = selectionButton.dataset.selection
            const selection = SELECTIONS.find(selection => selection.name === selectionName)
            makeSelection(selection)
        }
    })
})

resetButton.addEventListener('click', resetGame);

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) {
        incrementScore(yourScoreSpan)
        yourWins++;
    }
    if (computerWinner) {
        incrementScore(computerScoreSpan)
        computerWins++;
    }

    if (yourWins === 5 || computerWins === 5) {
        if (yourWins === 5) {
            alert("Congrats! You won the game without sweat");
        } else {
            alert("Too bad! You can't beat a computer");
        }
        resetGame();
    }
}

function resetGame() {
    yourWins = 0;
    computerWins = 0;
    yourScoreSpan.innerText = '0';
    computerScoreSpan.innerText = '0';
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}
