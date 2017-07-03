/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

EXTRAS
-Player loses entire score if they roll two 6's in a row
-Second dice added. If either/or dice is a 1 then all the ROUND score gets lost
*/

var scores, roundScore, activePlayer, isGamePlaying, previousRoll, previousRoll_2;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (isGamePlaying) {
        var currentRoll = Math.floor(Math.random() * 6) + 1,
            currentRoll_2 = Math.floor(Math.random() * 6) + 1,
            diceDOM = document.querySelector('.dice'),
            diceDOM_2 = document.querySelector('.dice-2');
        

        document.querySelector('.dice').style.display = 'block';
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + currentRoll + '.png';
        
        document.querySelector('.dice-2').style.display = 'block';
        diceDOM_2.style.display = 'block';
        diceDOM_2.src = 'dice-' + currentRoll_2 + '.png';
        
        if ((currentRoll === 6 && previousRoll === 6) ||
            (currentRoll_2 === 6 && previousRoll_2 === 6)) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (currentRoll !== 1 && currentRoll_2 !== 1) {
            roundScore = roundScore + currentRoll + currentRoll_2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        
        previousRoll = currentRoll;
        previousRoll_2 = currentRoll_2;
    }
    
});
                                                     
                                                     
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (isGamePlaying) {
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
    'use strict';
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    setTimeout(function () {
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
    }, 500);
}

function gameOver() {
    'use strict';
    
    document.getElementById('name-' + activePlayer).textContent = "WINNER!";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}

function newGame() {
    'use strict';
    
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
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}