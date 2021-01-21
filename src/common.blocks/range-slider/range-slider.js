const leftInput = document.querySelector('.range-slider__input_left');
const rightInput = document.querySelector('.range-slider__input_right');
const leftThumb = document.querySelector('.range-slider__thumb_left');
const rightThumb = document.querySelector('.range-slider__thumb_right');
const range = document.querySelector('.range-slider__range');

const rangeLable = document.querySelector('.range-slider__range-label');

function setLeftValue() {
  const that = leftInput;
  const min = parseInt(that.min, 10);
  const max = parseInt(that.max, 10);

  that.value = Math.min(parseInt(that.value, 10), parseInt(rightInput.value, 10));
  const percent = ((that.value - min) / (max - min)) * 100;
  leftThumb.style.left = `${percent}%`;
  range.style.left = `${percent}%`;

  const rangeNumbers = rangeLable.innerText.split('-');
  rangeLable.innerText = `${parseInt(that.value, 10).toLocaleString('ru-RU')}${String.fromCharCode(8381)} - ${rangeNumbers[1]}`;
}

setLeftValue();

function setRightValue() {
  const that = rightInput;
  const min = parseInt(that.min, 10);
  const max = parseInt(that.max, 10);

  that.value = Math.max(parseInt(that.value, 10), parseInt(leftInput.value, 10) + 1);
  const percent = ((that.value - min) / (max - min)) * 100;
  rightThumb.style.right = `${100 - percent}%`;
  range.style.right = `${100 - percent}%`;

  const rangeNumbers = rangeLable.innerText.split('-');
  rangeLable.innerText = `${rangeNumbers[0]} - ${parseInt(that.value, 10).toLocaleString('ru-RU')}${String.fromCharCode(8381)}`;
}

setRightValue();

leftInput.addEventListener('input', setLeftValue);
rightInput.addEventListener('input', setRightValue);
leftInput.onmouseover = () => { leftThumb.classList.add('range-slider__thumb_left_hover'); };
rightInput.onmouseover = () => { rightThumb.classList.add('range-slider__thumb_right_hover'); };
leftInput.onmouseout = () => { leftThumb.classList.remove('range-slider__thumb_left_hover'); };
rightInput.onmouseout = () => { rightThumb.classList.remove('range-slider__thumb_right_hover'); };
