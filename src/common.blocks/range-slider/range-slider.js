class Slider {
  constructor(slider) {
    this._slider = slider;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._leftInput = this._slider.querySelector(
      '.js-range-slider__input_type_left'
    );
    this._rightInput = this._slider.querySelector(
      '.js-range-slider__input_type_right'
    );
    this._leftThumb = this._slider.querySelector(
      '.js-range-slider__thumb_type_left'
    );
    this._rightThumb = this._slider.querySelector(
      '.js-range-slider__thumb_type_right'
    );
    this._range = this._slider.querySelector('.js-range-slider__range');
    this._rangeLabel = this._slider.querySelector(
      '.js-range-slider__range-label'
    );

    this._handleInputLeftInput = this._handleInputLeftInput.bind(this);
    this._handleInputRightInput = this._handleInputRightInput.bind(this);
    this._handleInputLeftMouseover = this._handleInputLeftMouseover.bind(this);
    this._handleInputRightMouseover = this._handleInputRightMouseover.bind(
      this
    );
    this._handleInputLeftMouseout = this._handleInputLeftMouseout.bind(this);
    this._handleInputRightMouseout = this._handleInputRightMouseout.bind(this);

    this._setLeftValue();
    this._setRightValue();
  }

  _addEventListeners() {
    this._leftInput.addEventListener('input', this._handleInputLeftInput);
    this._rightInput.addEventListener('input', this._handleInputRightInput);
    this._leftInput.addEventListener(
      'mouseover',
      this._handleInputLeftMouseover
    );
    this._rightInput.addEventListener(
      'mouseover',
      this._handleInputRightMouseover
    );
    this._leftInput.addEventListener('mouseout', this._handleInputLeftMouseout);
    this._rightInput.addEventListener(
      'mouseout',
      this._handleInputRightMouseout
    );
  }

  _handleInputLeftInput() {
    this._setLeftValue();
  }

  _handleInputLeftMouseover() {
    this._leftThumb.classList.add('range-slider__thumb_type_left_hover');
  }

  _handleInputLeftMouseout() {
    this._leftThumb.classList.remove('range-slider__thumb_type_left_hover');
  }

  _handleInputRightInput() {
    this._setRightValue();
  }

  _handleInputRightMouseover() {
    this._rightThumb.classList.add('range-slider__thumb_type_right_hover');
  }

  _handleInputRightMouseout() {
    this._rightThumb.classList.remove('range-slider__thumb_type_right_hover');
  }

  _setLeftValue() {
    const that = this._leftInput;
    const min = parseInt(that.min, 10);
    const max = parseInt(that.max, 10);

    that.value = Math.min(
      parseInt(that.value, 10),
      parseInt(this._rightInput.value, 10)
    );
    const percent = ((that.value - min) / (max - min)) * 100;
    this._leftThumb.style.left = `${percent}%`;
    this._range.style.left = `${percent}%`;

    const rangeNumbers = this._rangeLabel.innerText.split('-');
    this._rangeLabel.innerText = `${parseInt(that.value, 10).toLocaleString(
      'ru-RU'
    )}${String.fromCharCode(8381)} - ${rangeNumbers[1]}`;
  }

  _setRightValue() {
    const that = this._rightInput;
    const min = parseInt(that.min, 10);
    const max = parseInt(that.max, 10);

    that.value = Math.max(
      parseInt(that.value, 10),
      parseInt(this._leftInput.value, 10) + 1
    );
    const percent = ((that.value - min) / (max - min)) * 100;
    this._rightThumb.style.right = `${100 - percent}%`;
    this._range.style.right = `${100 - percent}%`;

    const rangeNumbers = this._rangeLabel.innerText.split('-');
    this._rangeLabel.innerText = `${rangeNumbers[0]} - ${parseInt(
      that.value,
      10
    ).toLocaleString('ru-RU')}${String.fromCharCode(8381)}`;
  }
}

export default Slider;
