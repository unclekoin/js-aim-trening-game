const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timer = document.getElementById('time');
const board = document.getElementById('board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.dataset.time;
    screens[1].classList.add('up');
    startGame();
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
})

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTimer(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTimer(current);
  }
}

function setTimer(value) {
  timer.textContent = `00:${value}`;
}

function finishGame() {
  timer.parentNode.classList.add('hide');
  board.innerHTML = `<h1 style="font-size: 28px">Your score: <span class="primary">${score}</span> </h1>`;
}

function createRandomCircle() {
  const {width, height} = board.getBoundingClientRect();
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = `rgb(
    ${getRandomNumber(100, 255)}, 
    ${getRandomNumber(0, 255)}, 
    ${getRandomNumber(0, 255)})`;

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;

  board.appendChild(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
