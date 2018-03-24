var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
var endGameText = document.getElementById('js-gameEndText');

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

// initial values

var gameState = 'notStarted';  //started // ended
var player = {
    name: '',
    score: 0
};
var computer = {
    score: 0
};

//  display game elements

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
    
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
  }
  setGameElements();

  //  start the game

function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
    
        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

// selecting a computer

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}

// game logic and scoring

function resetResultDisplay() {
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';    
    }
    
function announceWinner(elementResultElem, winner) {
    elementResultElem.innerHTML = "Win!";
    winner.score++;
}

function checkRoundWinner(playerPick, computerPick) {
    resetResultDisplay()
    var winnerIs = 'player';
  
    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
    
         winnerIs = 'computer';
    }
    
    if (winnerIs == 'player') {
        announceWinner(playerResultElem, player);
    } else if (winnerIs == 'computer') {
         announceWinner(computerResultElem, computer);
    }      

    setGamePoints();
        if (didGameEnd()) {
        endGame();     
        }   
}


function playerPick(playerPick) {
     var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// update the result 

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// game over

function didGameEnd() {
    if (player.score === 10 || computer.score === 10) {
        return true;
    }
    return false;
}
function endGame() {
    var winnerText = player.score === 10 ? player.name + ' is the winner!' : 'Computer is the winner!';
    endGameText.innerText = winnerText;
    gameState = 'ended';
    setGameElements();
}