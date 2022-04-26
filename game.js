import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakHead,
  snakeIntesection,
} from './snake.js';

import { outsideGrid } from './grid.js';

import { update as updateFood, draw as drawFood } from './food.js';

let lastRendorTime = 0;
let gameOver = false;
const gameBoard = document.querySelector('#game-board');

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost, Press OK to restart')) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRendor = (currentTime - lastRendorTime) / 1000;
  if (secondsSinceLastRendor < 1 / SNAKE_SPEED) return;

  lastRendorTime = currentTime;
  console.log('rendor');

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakHead()) || snakeIntesection();
}
