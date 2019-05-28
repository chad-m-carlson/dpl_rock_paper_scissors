var userScore = 0;
var computerScore = 0;
var totalUserWins = 0;
var totalComputerWins = 0;
var numberOfDraws = 0;
var buttons = document.getElementsByClassName('gameButton');
var log = document.getElementById('log');
var score = document.getElementById('score');
var plays = document.getElementById('plays');
var computer = document.getElementById('computer');
var user = document.getElementById('user');
var drawGame = document.getElementById('draw');
var playButton = document.getElementById('play');

for(var i = 0; i < buttons.length; i++){
    buttons[i].disabled = true;
};

playButton.addEventListener('click', function() {
    if (document.getElementById('rounds').value == '' || document.getElementById('games').value == '') alert('Please enter number of games and rounds');
    else { 
        enableButton();
        hideBeginningInputs();
    }
});

document.getElementById('restart').addEventListener('click', restartClicked);

for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function() {
        playerClicked = this.id;
        playRound(playerClicked);
    })
}

function computerPlay() {
    computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    return computerChoice;
}

function playRound(playerSelection) {
    var computerSelection = computerPlay();
    if ((playerSelection == computerSelection)) {
        writeGameResults('draw');
    } else if (playerSelection == 'rock' && computerSelection == 'paper' || playerSelection == 'scissors' && computerSelection == 'rock' || playerSelection == 'paper' && computerSelection == 'scissors') {
        computerScore++;
        writeGameResults('computer');
    } else if (playerSelection == 'rock' && computerSelection == 'scissors' || playerSelection == 'paper' && computerSelection == 'rock' || playerSelection == 'scissors' && computerSelection == 'paper') {
        userScore++;
        writeGameResults('player');
    }
    writeComputerChoice();
    isRoundOver();
}

function writeGameResults(winner) {
    if (winner == 'draw') {
        var dd = document.createElement('dd');
        dd.innerHTML = `It's a tie, you both played ${playerClicked}.`;
        log.appendChild(dd);
    }
    if (winner == 'computer') {
        var dd = document.createElement('dd');
        dd.style.color = "red"
        dd.innerHTML = `You Lose! ${computerChoice} beats ${playerClicked}.`;
        log.appendChild(dd);
    }
    if (winner == 'player') {
        var dd = document.createElement('dd');
        dd.style.color = "green"
        dd.innerHTML = `You win! ${playerClicked} beats ${computerChoice}.`;
        log.appendChild(dd);
    }
}

function writeComputerChoice() {
    var dd = document.createElement('dd');
    var t = document.createTextNode('Computer Played ' + computerChoice + '.');
    dd.appendChild(t);
    plays.appendChild(dd);
}

function isRoundOver() {
    //IF THE NUMBER OF TOTAL WINS = THE NUMBER OF GAMES ENTERED IN THE BEGINNING, THE ROUND IS OVER AND RESULTS ARE POSTED. OTHERWISE, NOTHING HAPPENS AND GAME COUNTINUES
    var numberOfGames = document.getElementById('games').value;
    if (userScore + computerScore == numberOfGames) {
        if (userScore > computerScore) {
            var dd = document.createElement('dd');
            dd.style.color = "green"
            dd.innerHTML = 'You win! ' + userScore + ' to ' + computerScore + ' .';
            score.appendChild(dd);
            totalUserWins++;
        } else if (computerScore > userScore) {
            var dd = document.createElement('dd');
            dd.style.color = "red"
            dd.innerHTML = 'You lose! ' + computerScore + ' to ' + userScore + ' .';
            score.appendChild(dd);
            totalComputerWins++;
        } else {
            var dd = document.createElement('dd');
            dd.innerHTML = `It's a tie! Please play again!`;
            score.appendChild(dd);
            numberOfDraws++;
        }
        resetGame();
        disableGameButtons();
        writeScores();
        setTimeout(function () {
        determineRoundWinner();
        }, 2000);
    }
}


function hideBeginningInputs() {
    var tally = document.getElementById('tally');
    var start = document.getElementById('start');
    start.classList.toggle('hide');
    tally.classList.toggle('hide');
}


function writeScores() {
    computer.innerHTML = 'Computer Score: ' + totalComputerWins;
    user.innerHTML = 'Player Score: ' + totalUserWins;
    drawGame.innerHTML = 'Draw Game: ' + numberOfDraws;
}

function determineRoundWinner() {
    //CHECKS TO SEE IF THE NUMBER OF ROUNDS WON = NUMBER OF ROUNDS ENTERED. IF SO, AN ALERT IS GENERATED AND GAME IS OVER.
    var numberOfRounds = document.getElementById('rounds').value;
    if (totalComputerWins + totalUserWins == numberOfRounds) {
        if (totalComputerWins > totalUserWins) {
            alert('Game Over! Computer wins the game');
        } else if (totalComputerWins < totalUserWins) {
            alert('Congratulations! You Win the Game');
        } else if (totalComputerWins === totalUserWins) {
            alert('It\'s a tie');
        }
        resetRounds();
        hideBeginningInputs();
    }
}

function disableGameButtons() {
    for(var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    };
    setTimeout(function () {
        enableButton();
        removeRoundResults();
    }, 3000);
}

function enableButton() {
    for(var i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    };
}

function removeRoundResults() {
    while (plays.hasChildNodes()) {
        plays.removeChild(plays.firstChild);
    }
    while (log.hasChildNodes()) {
        log.removeChild(log.firstChild);
    }
    while (score.hasChildNodes()) {
        score.removeChild(score.firstChild);
    }
}


function restartClicked() {
    for(var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    };
    hideBeginningInputs();
    resetGame();
    removeRoundResults();
    resetRounds()
    user.removeChild(user.firstChild);
    computer.removeChild(computer.firstChild);
    drawGame.removeChild(draw.firstChild);
    // totalUserWins = 0;
    // totalComputerWins = 0;
    // numberOfDraws = 0;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
}

function resetRounds() {
    totalUserWins = 0;
    totalComputerWins = 0;
    numberOfDraws = 0;
    computer.innerHTML = '';
    user.innerHTML = '';
    drawGame.innerHTML = '';
}