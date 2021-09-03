import './style.css';
import game, { getScores, submitScore } from './addScore.js';
import displayScores from './showScore.js';

const scoresList = document.getElementById('scoreboard');

const loadScores = () => getScores().then((scores) => {
  const html = displayScores(scores);
  if (html) {
    scoresList.innerHTML = html;
    scoresList.classList.add('borders');
  } else {
    scoresList.classList.remove('borders');
  }
});

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', loadScores);
window.onload = () => {
  const title = document.getElementById('page-title');
  title.innerHTML += ` - ${game}`;
  loadScores();
};

const newScore = document.getElementById('new-score');
const newplayer = document.getElementById('player-name');
const newplayerScore = document.getElementById('player-score');

newScore.addEventListener('submit', (event) => {
  event.preventDefault();
  const player = newplayer.value;
  const score = newplayerScore.value;
  const scoreError = document.querySelector('.error-msg');
  if (player && score && !Number.isNaN(score)) {
    scoreError.classList.add('hidden');
    submitScore(player, parseInt(score, 10)).then(() => {
      newplayerScore.value = '';
      newplayer.value = '';
    });
  } else {
    newplayerScore.value = '';
    newplayer.value = '';
    scoreError.classList.remove('hidden');
  }
});