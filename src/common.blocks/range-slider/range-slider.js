class Slider {
  constructor(slider) {
    this.slider = slider;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.leftInput = this.slider.querySelector('.js-range-slider__input_left');
    this.rightInput = this.slider.querySelector(
      '.js-range-slider__input_right'
    );
    this.leftThumb = this.slider.querySelector('.js-range-slider__thumb_left');
    this.rightThumb = this.slider.querySelector(
      '.js-range-slider__thumb_right'
    );
    this.range = this.slider.querySelector('.js-range-slider__range');
    this.rangeLabel = this.slider.querySelector(
      '.js-range-slider__range-label'
    );

    this.setLeftValue();
    this.setRightValue();
  }

  addEventListeners() {
    this.leftInput.addEventListener(
      'input',
      this.handleInputLeftInput.bind(this)
    );
    this.rightInput.addEventListener(
      'input',
      this.handleInputRightInput.bind(this)
    );
    this.leftInput.addEventListener(
      'mouseover',
      this.handleInputLeftMouseover.bind(this)
    );
    this.rightInput.addEventListener(
      'mouseover',
      this.handleInputRightMouseover.bind(this)
    );
    this.leftInput.addEventListener(
      'mouseout',
      this.handleInputLeftMouseout.bind(this)
    );
    this.rightInput.addEventListener(
      'mouseout',
      this.handleInputRightMouseout.bind(this)
    );
  }

  handleInputLeftInput() {
    this.setLeftValue();
  }

  handleInputLeftMouseover() {
    this.leftThumb.classList.add('range-slider__thumb_left_hover');
  }

  handleInputLeftMouseout() {
    this.leftThumb.classList.remove('range-slider__thumb_left_hover');
  }

  handleInputRightInput() {
    this.setRightValue();
  }

  handleInputRightMouseover() {
    this.rightThumb.classList.add('range-slider__thumb_right_hover');
  }

  handleInputRightMouseout() {
    this.rightThumb.classList.remove('range-slider__thumb_right_hover');
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

    const rangeNumbers = this.rangeLabel.innerText.split('-');
    this.rangeLabel.innerText = `${parseInt(that.value, 10).toLocaleString(
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

    const rangeNumbers = this.rangeLabel.innerText.split('-');
    this.rangeLabel.innerText = `${rangeNumbers[0]} - ${parseInt(
      that.value,
      10
    ).toLocaleString('ru-RU')}${String.fromCharCode(8381)}`;
  }
}

export default Slider;
