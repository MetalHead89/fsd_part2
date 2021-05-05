class NumberCard {
  constructor(numberCard) {
    this.numberCard = numberCard;

    this.init();
  }

  init() {
    this.buttonPrev = this.numberCard.querySelector(
      '.number-card__arrow-button_prev'
    );
    this.buttonNext = this.numberCard.querySelector(
      '.number-card__arrow-button_next'
    );
    this.sliderDots = Array.from(
      this.numberCard.querySelectorAll('.number-card__dot')
    );
    this.slides = this.numberCard.querySelectorAll(
      '.number-card__slider-list-item'
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
    const activeSlide = this.numberCard.querySelector(
      '.number-card__slider-list-item_transparent'
    );
    const nextSlide = activeSlide.nextElementSibling;
    const activeDot = this.numberCard.querySelector('.number-card__dot_active');
    const nextDot = activeDot.nextElementSibling;

    if (nextSlide) {
      NumberCard.switchSlide(activeSlide, nextSlide);
      NumberCard.switchSliderDot(activeDot, nextDot);
    }
  }

  switchToPreviousSlide() {
    const activeSlide = this.numberCard.querySelector(
      '.number-card__slider-list-item_transparent'
    );
    const prevSlide = activeSlide.previousElementSibling;
    const activeDot = this.numberCard.querySelector('.number-card__dot_active');
    const prevDot = activeDot.previousElementSibling;

    if (prevSlide) {
      NumberCard.switchSlide(activeSlide, prevSlide);
      NumberCard.switchSliderDot(activeDot, prevDot);
    }
  }

  static switchSlide(activeSlide, nextSlide) {
    activeSlide.classList.remove('number-card__slider-list-item_transparent');
    activeSlide.classList.add('number-card__slider-list-item_not-transparent');
    nextSlide.classList.remove('number-card__slider-list-item_not-transparent');
    nextSlide.classList.add('number-card__slider-list-item_transparent');
  }

  clickToDot(dot) {
    const activeDot = this.sliderDots.indexOf(
      this.numberCard.querySelector('.number-card__dot_active')
    );
    const nextDot = this.sliderDots.indexOf(dot);

    NumberCard.switchSlide(this.slides[activeDot], this.slides[nextDot]);
    NumberCard.switchSliderDot(
      this.sliderDots[activeDot],
      this.sliderDots[nextDot]
    );
  }

  static switchSliderDot(activeDot, nextDot) {
    activeDot.classList.remove('number-card__dot_active');
    activeDot.classList.add('number-card__dot_inactive');
    nextDot.classList.remove('number-card__dot_inactive');
    nextDot.classList.add('number-card__dot_active');
  }
}

const numbersCards = document.querySelectorAll('.number-card');
const cards = [];

for (let cardIndex = 0; cardIndex < numbersCards.length; cardIndex += 1) {
  cards.push(new NumberCard(numbersCards[cardIndex]));
}
