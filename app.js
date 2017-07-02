/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(isGamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1,
        diceDOM = document.querySelector('.dice');

        document.querySelector('.dice').style.display = 'block';
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }  
    }
    
});
                                                     
                                                     
document.querySelector('.btn-hold').addEventListener('click', function () {

    if(isGamePlaying) {
        scores[activePlayer] += roundScore;
    
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            gameOver();
            isGamePlaying = false;
        } else {
            nextPlayer();
        } 
    }

});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    setTimeout(function () {
        document.querySelector('.dice').style.display = 'none';
    }, 500);
}

function gameOver() {
    document.getElementById('name-' + activePlayer).textContent = "WINNER!";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    //document.querySelector('.btn-roll').style.display = 'none';
    //document.querySelector('.btn-hold').style.display = 'none';
}

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    
    isGamePlaying = true;
    
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.dice').style.display = 'none';
    //document.querySelector('.btn-roll').style.display = 'block';
    //document.querySelector('.btn-hold').style.display = 'block';
}