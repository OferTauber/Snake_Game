import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

let food = randomGridPosition();
const EXPENTIPON_RATE = 3;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPENTIPON_RATE);
    food = randomGridPosition();
  }
}

export function draw(gameBorard) {
  const foodEl = document.createElement('div');
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add('food');
  gameBorard.appendChild(foodEl);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition === null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}
