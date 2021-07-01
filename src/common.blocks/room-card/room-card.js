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
    const activeSlide = this._roomCard.querySelector(
      '.js-room-card__slider-list-item_opaque'
    );
    const nextSlide = activeSlide.nextElementSibling;
    const activeDot = this._roomCard.querySelector('.js-room-card__dot_active');
    const nextDot = activeDot.nextElementSibling;

    if (nextSlide) {
      RoomCard.switchSlide(activeSlide, nextSlide);
      RoomCard.switchSliderDot(activeDot, nextDot);
    }
  }

  _handleButtonPrevClick() {
    const activeSlide = this._roomCard.querySelector(
      '.js-room-card__slider-list-item_opaque'
    );
    const prevSlide = activeSlide.previousElementSibling;
    const activeDot = this._roomCard.querySelector('.js-room-card__dot_active');
    const prevDot = activeDot.previousElementSibling;

    if (prevSlide) {
      RoomCard.switchSlide(activeSlide, prevSlide);
      RoomCard.switchSliderDot(activeDot, prevDot);
    }
  }

  static switchSlide(activeSlide, nextSlide) {
    activeSlide.classList.remove(
      'room-card__slider-list-item_opaque',
      'js-room-card__slider-list-item_opaque'
    );
    nextSlide.classList.add(
      'room-card__slider-list-item_opaque',
      'js-room-card__slider-list-item_opaque'
    );
  }

  _handleDotClick(event) {
    const activeDot = this._sliderDots.indexOf(
      this._roomCard.querySelector('.js-room-card__dot_active')
    );
    const nextDot = this._sliderDots.indexOf(event.target);

    RoomCard.switchSlide(this._slides[activeDot], this._slides[nextDot]);
    RoomCard.switchSliderDot(
      this._sliderDots[activeDot],
      this._sliderDots[nextDot]
    );
  }

  static switchSliderDot(activeDot, nextDot) {
    activeDot.classList.remove(
      'room-card__dot_active',
      'js-room-card__dot_active'
    );
    nextDot.classList.add('room-card__dot_active', 'js-room-card__dot_active');
  }
}

export default RoomCard;
