'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function() {

    diceEl.classList.add('hidden');
    
    scores = [0, 0]; // stores total scores in array
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // change player

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){  // zar at
    if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;  // 1 ile 6 arasında random sayı oluştur

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
        currentScore = currentScore + dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore; // choose activeplayer dinamically
    } else {  // zar 1 ise
       switchPlayer();
    }
}
});

btnHold.addEventListener('click',function(){ // save the score
    if (playing){

    scores[activePlayer] += currentScore; 
    // scores[0] = scores[0] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) { // finish game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        switchPlayer();
    }
}
});

btnNew.addEventListener('click', function(){
    init();
})


