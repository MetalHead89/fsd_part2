class Slider {
  constructor(slider) {
    this.slider = slider;

    this.init();
  }

  init() {
    this.leftInput = this.slider.querySelector('.range-slider__input_left');
    this.rightInput = this.slider.querySelector('.range-slider__input_right');
    this.leftThumb = this.slider.querySelector('.range-slider__thumb_left');
    this.rightThumb = this.slider.querySelector('.range-slider__thumb_right');
    this.range = this.slider.querySelector('.range-slider__range');
    this.rangeLable = this.slider.querySelector('.range-slider__range-label');

    this.setLeftValue();
    this.setRightValue();

    this.leftInput.addEventListener('input', this.setLeftValue.bind(this));
    this.rightInput.addEventListener('input', this.setRightValue.bind(this));
    this.leftInput.onmouseover = () => {
      this.leftThumb.classList.add('range-slider__thumb_left_hover');
    };
    this.rightInput.onmouseover = () => {
      this.rightThumb.classList.add('range-slider__thumb_right_hover');
    };
    this.leftInput.onmouseout = () => {
      this.leftThumb.classList.remove('range-slider__thumb_left_hover');
    };
    this.rightInput.onmouseout = () => {
      this.rightThumb.classList.remove('range-slider__thumb_right_hover');
    };
  }

  setLeftValue() {
    const that = this.leftInput;
    const min = parseInt(that.min, 10);
    const max = parseInt(that.max, 10);

    that.value = Math.min(
      parseInt(that.value, 10),
      parseInt(this.rightInput.value, 10)
    );
    const percent = ((that.value - min) / (max - min)) * 100;
    this.leftThumb.style.left = `${percent}%`;
    this.range.style.left = `${percent}%`;

    const rangeNumbers = this.rangeLable.innerText.split('-');
    this.rangeLable.innerText = `${parseInt(that.value, 10).toLocaleString(
      'ru-RU'
    )}${String.fromCharCode(8381)} - ${rangeNumbers[1]}`;
  }

  setRightValue() {
    const that = this.rightInput;
    const min = parseInt(that.min, 10);
    const max = parseInt(that.max, 10);

    that.value = Math.max(
      parseInt(that.value, 10),
      parseInt(this.leftInput.value, 10) + 1
    );
    const percent = ((that.value - min) / (max - min)) * 100;
    this.rightThumb.style.right = `${100 - percent}%`;
    this.range.style.right = `${100 - percent}%`;

    const rangeNumbers = this.rangeLable.innerText.split('-');
    this.rangeLable.innerText = `${rangeNumbers[0]} - ${parseInt(
      that.value,
      10
    ).toLocaleString('ru-RU')}${String.fromCharCode(8381)}`;
  }
}

const sliders = document.querySelectorAll('.range-slider');
for (let slider = 0; slider < sliders.length; slider += 1) {
  const newSlider = new Slider(sliders[slider]);
}
