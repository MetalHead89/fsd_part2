let leftInput = document.querySelector('.range-slider__left-input');
let rightInput = document.querySelector('.range-slider__right-input');

let leftThumb = document.querySelector('.range-slider__left-thumb');
let rightThumb = document.querySelector('.range-slider__right-thumb');
let range = document.querySelector('.range-slider__range');

leftInput.addEventListener('input', setLeftValue);
rightInput.addEventListener('input', setRightValue);
leftInput.onmouseover = function() { leftThumb.classList.add('range-slider__left-thumb_hover') };
rightInput.onmouseover = function() { rightThumb.classList.add('range-slider__right-thumb_hover') };
leftInput.onmouseout = function() { leftThumb.classList.remove('range-slider__left-thumb_hover') };
rightInput.onmouseout = function() { rightThumb.classList.remove('range-slider__right-thumb_hover') };

let rangeLable = document.querySelector('.range-slider__range-label');

function setLeftValue() {
    let _this = leftInput;
    let min = parseInt(_this.min);
    let max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(rightInput.value));
    let percent = ((_this.value - min) / (max - min)) * 100;
    leftThumb.style.left = percent + '%';
    range.style.left = percent + '%';

    let rangeNumbers = rangeLable.innerText.split('-');

    number = rangeNumbers[0].replace(' ', '').trim();
    number = parseInt(number.substring(0, number.length - 1));
    
    rangeLable.innerText = `${parseInt(_this.value).toLocaleString('ru-RU')}${String.fromCharCode(8381)} - ${rangeNumbers[1]}`;

}

setLeftValue();

function setRightValue() {
    let _this = rightInput;
    let min = parseInt(_this.min);
    let max = parseInt(_this.max);

    _this.value = Math.max(parseInt(_this.value), parseInt(leftInput.value) + 1);
    let percent = ((_this.value - min) / (max - min)) * 100;
    rightThumb.style.right = 100 - percent + '%';
    range.style.right = 100 - percent + '%';

    let rangeNumbers = rangeLable.innerText.split('-');

    number = rangeNumbers[1].replace(' ', '').trim();
    number = parseInt(number.substring(0, number.length - 1));

    rangeLable.innerText = `${rangeNumbers[0]} - ${parseInt(_this.value).toLocaleString('ru-RU')}${String.fromCharCode(8381)}`;
}

setRightValue();