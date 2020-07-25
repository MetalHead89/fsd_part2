let leftInput = document.querySelector('.range-slider__left-input');
let rightInput = document.querySelector('.range-slider__right-input');

let leftThumb = document.querySelector('.range-slider__left-thumb');
let rightThumb = document.querySelector('.range-slider__right-thumb');
let range = document.querySelector('.range-slider__range');

function setLeftValue() {
    let _this = leftInput;
    let min = parseInt(_this.min);
    let max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(rightInput.value) - 1);
    let percent = ((_this.value - min) / (max - min)) * 100;
    leftThumb.style.left = percent + '%';
    range.style.left = percent + '%';
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
}

setRightValue();

leftInput.addEventListener('input', setLeftValue);
rightInput.addEventListener('input', setRightValue);