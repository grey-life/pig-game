/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//  The game continues in a while loop which goes on until and unless the person quits
// the game is supposed to get reset once the player chooses start a new game

// Initializing game variables
var scores, roundScore, activePlayer, winnerScore, gamePlaying, prevRoll;

init();

function init() {
    // setting all the score and values to zero
    winnerScore = 20;
    prevRoll = [0, 0];
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 for player-1 and 1 for player-2
    gamePlaying = true;
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // disabling the dice on screen
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    //correcting player name on 
    document.getElementById('name-' + 0).textContent = 'Player 1';
    document.getElementById('name-' + 1).textContent = 'Player 2';
    document.querySelector('.player-' + 0 + '-panel').classList.add('active');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('active');

    // remove the winner css
    document.querySelector('.player-' + 0 + '-panel').classList.remove('winner');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('winner');

}

function randomDiceValue() {
    return Math.floor(Math.random() * 6) + 1;
}


function togglePlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}


function setWinnerScore(){
    winnerScore = document.getElementById('win-score').value;
    if(winnerScore === ''){
        winnerScore = 100;
    }
    console.log(winnerScore);
}

function winnerCheck() {
    if (scores[activePlayer] >= winnerScore) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice-0').style.display = 'none';
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying = false;
    } else {
        togglePlayer();
    }

}


// New Game implementation
document.querySelector('.btn-new').addEventListener('click', init);

// On Clicking roll by the active player
document.querySelector('.btn-roll').addEventListener('click', function () {
    // generate a random number on the dice
    if (gamePlaying) {

        winnerScore = 10;
        setWinnerScore();
        var dice = [0,0];
        dice[0] = randomDiceValue();
        dice[1] = randomDiceValue();

        var diceDOM0 = document.querySelector('.dice-0');
        var diceDOM1 = document.querySelector('.dice-1');
        diceDOM0.src = 'dice-' + dice[0] + '.png';
        diceDOM1.src = 'dice-' + dice[1] + '.png';
        diceDOM0.style.display = 'block';
        diceDOM1.style.display = 'block';

        var currentScore = document.getElementById('current-' + activePlayer);

        if (dice[0] === 1 || dice[1] === 1) {
            // reset the score to zero and start next player's turn
            roundScore = 0;
            currentScore.textContent = roundScore;
            togglePlayer();

        } else {
            roundScore += dice[0] + dice[1];
            currentScore.textContent = roundScore;
        }

    }

});

// On clicking hold by the active player
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        setWinnerScore();
        var scoreDOM = document.getElementById('score-' + activePlayer);
        var curDOM = document.getElementById('current-' + activePlayer);
        scores[activePlayer] += roundScore;
        roundScore = 0;
        scoreDOM.textContent = scores[activePlayer];

        curDOM.textContent = roundScore;
        winnerCheck();
    }

});





