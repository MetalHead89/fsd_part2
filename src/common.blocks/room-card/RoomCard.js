import { boundMethod } from 'autobind-decorator';

class RoomCard {
  constructor(roomCard) {
    this._roomCard = roomCard;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._buttonPrev = this._roomCard.querySelector(
      '.js-room-card__arrow-button_type_prev'
    );
    this._buttonNext = this._roomCard.querySelector(
      '.js-room-card__arrow-button_type_next'
    );
    this._sliderDots = Array.from(
      this._roomCard.querySelectorAll('.js-room-card__dot')
    );
    this._slides = this._roomCard.querySelectorAll(
      '.js-room-card__slider-list-item'
    );
    this._activeSlideIndex = 0;
  }

  _addEventListeners() {
    this._buttonNext.addEventListener('click', this._handleButtonNextClick);
    this._buttonPrev.addEventListener('click', this._handleButtonPrevClick);

    this._sliderDots.forEach((item) => {
      item.addEventListener('click', this._handleDotClick);
    });
  }

  @boundMethod
  _handleButtonNextClick() {
    const newActiveSlideIndex =
      this._activeSlideIndex +
      (this._activeSlideIndex < this._slides.length - 1 ? 1 : 0);

    if (newActiveSlideIndex !== this._activeSlideIndex) {
      this._switchSlide(newActiveSlideIndex);
      this._switchSliderDot(newActiveSlideIndex);
      this._activeSlideIndex = newActiveSlideIndex;
    }
  }

  @boundMethod
  _handleButtonPrevClick() {
    const newActiveSlideIndex =
      this._activeSlideIndex - (this._activeSlideIndex > 0 ? 1 : 0);

    if (newActiveSlideIndex !== this._activeSlideIndex) {
      this._switchSlide(newActiveSlideIndex);
      this._switchSliderDot(newActiveSlideIndex);
      this._activeSlideIndex = newActiveSlideIndex;
    }
  }

  _switchSlide(newActiveSlideIndex) {
    this._slides[this._activeSlideIndex].classList.remove(
      'room-card__slider-list-item_theme_opaque',
      'js-room-card__slider-list-item_theme_opaque'
    );

    this._slides[newActiveSlideIndex].classList.add(
      'room-card__slider-list-item_theme_opaque',
      'js-room-card__slider-list-item_theme_opaque'
    );
  }

  @boundMethod
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
