class RoomCard {
  constructor(roomCard) {
    this.roomCard = roomCard;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.buttonPrev = this.roomCard.querySelector(
      '.js-room-card__arrow-button_prev',
    );
    this.buttonNext = this.roomCard.querySelector(
      '.js-room-card__arrow-button_next',
    );
    this.sliderDots = Array.from(
      this.roomCard.querySelectorAll('.js-room-card__dot'),
    );
    this.slides = this.roomCard.querySelectorAll(
      '.js-room-card__slider-list-item',
    );
  }

  addEventListeners() {
    this.buttonNext.addEventListener(
      'click',
      this.handleButtonNextClick.bind(this),
    );
    this.buttonPrev.addEventListener(
      'click',
      this.handleButtonPrevClick.bind(this),
    );

    this.sliderDots.forEach((item) => {
      item.addEventListener('click', this.handleDotClick.bind(this, item));
    });
  }

  handleButtonNextClick() {
    const activeSlide = this.roomCard.querySelector(
      '.js-room-card__slider-list-item_opaque',
    );
    const nextSlide = activeSlide.nextElementSibling;
    const activeDot = this.roomCard.querySelector('.js-room-card__dot_active');
    const nextDot = activeDot.nextElementSibling;

    if (nextSlide) {
      RoomCard.switchSlide(activeSlide, nextSlide);
      RoomCard.switchSliderDot(activeDot, nextDot);
    }
  }

  handleButtonPrevClick() {
    const activeSlide = this.roomCard.querySelector(
      '.js-room-card__slider-list-item_opaque',
    );
    const prevSlide = activeSlide.previousElementSibling;
    const activeDot = this.roomCard.querySelector('.js-room-card__dot_active');
    const prevDot = activeDot.previousElementSibling;

    if (prevSlide) {
      RoomCard.switchSlide(activeSlide, prevSlide);
      RoomCard.switchSliderDot(activeDot, prevDot);
    }
  }

  static switchSlide(activeSlide, nextSlide) {
    activeSlide.classList.remove(
      'room-card__slider-list-item_opaque',
      'js-room-card__slider-list-item_opaque',
    );
    nextSlide.classList.add(
      'room-card__slider-list-item_opaque',
      'js-room-card__slider-list-item_opaque',
    );
  }

  handleDotClick(dot) {
    const activeDot = this.sliderDots.indexOf(
      this.roomCard.querySelector('.js-room-card__dot_active'),
    );
    const nextDot = this.sliderDots.indexOf(dot);

    RoomCard.switchSlide(this.slides[activeDot], this.slides[nextDot]);
    RoomCard.switchSliderDot(
      this.sliderDots[activeDot],
      this.sliderDots[nextDot],
    );
  }

  static switchSliderDot(activeDot, nextDot) {
    activeDot.classList.remove(
      'room-card__dot_active',
      'js-room-card__dot_active',
    );
    nextDot.classList.add('room-card__dot_active', 'js-room-card__dot_active');
  }
}

export default RoomCard;
