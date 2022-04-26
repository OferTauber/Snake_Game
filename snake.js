import { getInpudDirection } from './input.js';

export const SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
  addSegments();

  const inputDirection = getInpudDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBorard) {
  snakeBody.forEach((segment) => {
    const snakeEl = document.createElement('div');
    snakeEl.style.gridRowStart = segment.y;
    snakeEl.style.gridColumnStart = segment.x;
    snakeEl.classList.add('snake');
    gameBorard.appendChild(snakeEl);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
}

export function getSnakHead() {
  return snakeBody[0];
}

export function snakeIntesection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPosition(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
