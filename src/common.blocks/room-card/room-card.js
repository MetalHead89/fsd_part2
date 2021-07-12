class RoomCard {
  constructor(roomCard) {
    this._roomCard = roomCard;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._buttonPrev = this._roomCard.querySelector(
      '.js-room-card__arrow-button_prev'
    );
    this._buttonNext = this._roomCard.querySelector(
      '.js-room-card__arrow-button_next'
    );
    this._sliderDots = Array.from(
      this._roomCard.querySelectorAll('.js-room-card__dot')
    );
    this._slides = this._roomCard.querySelectorAll(
      '.js-room-card__slider-list-item'
    );
    this._activeSlideIndex = 0;

    this._handleButtonNextClick = this._handleButtonNextClick.bind(this);
    this._handleButtonPrevClick = this._handleButtonPrevClick.bind(this);
    this._handleDotClick = this._handleDotClick.bind(this);
  }

  _addEventListeners() {
    this._buttonNext.addEventListener('click', this._handleButtonNextClick);
    this._buttonPrev.addEventListener('click', this._handleButtonPrevClick);

    this._sliderDots.forEach((item) => {
      item.addEventListener('click', this._handleDotClick);
    });
  }

  _handleButtonNextClick() {
    const newActiveSlideIndex =
      this._activeSlideIndex + (this._activeSlideIndex < this._slides.length - 1 ? 1 : 0);

    if (newActiveSlideIndex !== this._activeSlideIndex) {
      this._switchSlide(newActiveSlideIndex);
      this._switchSliderDot(newActiveSlideIndex);
      this._activeSlideIndex = newActiveSlideIndex;
    }
  }

  _handleButtonPrevClick() {
    const newActiveSlideIndex = this._activeSlideIndex - (this._activeSlideIndex > 0 ? 1 : 0);

    if (newActiveSlideIndex !== this._activeSlideIndex) {
      this._switchSlide(newActiveSlideIndex);
      this._switchSliderDot(newActiveSlideIndex);
      this._activeSlideIndex = newActiveSlideIndex;
    }
  }

  _switchSlide(newActiveSlideIndex) {
    this._slides[this._activeSlideIndex].classList.remove(
      'room-card__slider-list-item_opaque',
      'js-room-card__slider-list-item_opaque'
    );

    this._slides[newActiveSlideIndex].classList.add(
      'room-card__slider-list-item_opaque',
      'js-room-card__slider-list-item_opaque'
    );
  }

  _handleDotClick(event) {
    const activeDotIndex = this._activeSlideIndex;
    const newActiveDotIndex = this._sliderDots.indexOf(event.target);

    if (activeDotIndex !== newActiveDotIndex) {
      this._switchSlide(newActiveDotIndex);
      this._switchSliderDot(newActiveDotIndex);
      this._activeSlideIndex = newActiveDotIndex;
    }
  }

  _switchSliderDot(newActiveDot) {
    this._sliderDots[this._activeSlideIndex].classList.remove(
      'room-card__dot_active',
      'js-room-card__dot_active'
    );

    this._sliderDots[newActiveDot].classList.add(
      'room-card__dot_active',
      'js-room-card__dot_active'
    );
  }
}

export default RoomCard;
