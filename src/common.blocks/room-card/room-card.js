class RoomCard {
  constructor(roomCard) {
    this.roomCard = roomCard;

    this.init();
  }

  init() {
    this.buttonPrev = this.roomCard.querySelector(
      '.js-room-card__arrow-button_prev'
    );
    this.buttonNext = this.roomCard.querySelector(
      '.js-room-card__arrow-button_next'
    );
    this.sliderDots = Array.from(
      this.roomCard.querySelectorAll('.js-room-card__dot')
    );
    this.slides = this.roomCard.querySelectorAll(
      '.js-room-card__slider-list-item'
    );

    this.buttonNext.onclick = () => this.switchToNextSlide();
    this.buttonPrev.onclick = () => this.switchToPreviousSlide();
    for (let dot = 0; dot < this.sliderDots.length; dot += 1) {
      this.sliderDots[dot].onclick = () => {
        this.clickToDot(this.sliderDots[dot]);
      };
    }
  }

  switchToNextSlide() {
    const activeSlide = this.roomCard.querySelector(
      '.js-room-card__slider-list-item_opaque'
    );
    const nextSlide = activeSlide.nextElementSibling;
    const activeDot = this.roomCard.querySelector('.js-room-card__dot_active');
    const nextDot = activeDot.nextElementSibling;

    if (nextSlide) {
      RoomCard.switchSlide(activeSlide, nextSlide);
      RoomCard.switchSliderDot(activeDot, nextDot);
    }
  }

  switchToPreviousSlide() {
    const activeSlide = this.roomCard.querySelector(
      '.js-room-card__slider-list-item_opaque'
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
    activeSlide.classList.remove('room-card__slider-list-item_opaque', 'js-room-card__slider-list-item_opaque');
    nextSlide.classList.add('room-card__slider-list-item_opaque', 'js-room-card__slider-list-item_opaque');
  }

  clickToDot(dot) {
    const activeDot = this.sliderDots.indexOf(
      this.roomCard.querySelector('.js-room-card__dot_active')
    );
    const nextDot = this.sliderDots.indexOf(dot);

    RoomCard.switchSlide(this.slides[activeDot], this.slides[nextDot]);
    RoomCard.switchSliderDot(
      this.sliderDots[activeDot],
      this.sliderDots[nextDot]
    );
  }

  static switchSliderDot(activeDot, nextDot) {
    activeDot.classList.remove('room-card__dot_active', 'js-room-card__dot_active');
    nextDot.classList.add('room-card__dot_active', 'js-room-card__dot_active');
  }
}

const roomCards = document.querySelectorAll('.js-room-card');
const cards = [];

for (let cardIndex = 0; cardIndex < roomCards.length; cardIndex += 1) {
  cards.push(new RoomCard(roomCards[cardIndex]));
}
