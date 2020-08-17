'use strict'

class NumberCard {
    constructor(numberCard) {
        this.numberCard = numberCard;

        this.buttonPrev = numberCard.querySelector('.number-card__prevButton');
        this.buttonNext = numberCard.querySelector('.number-card__nextButton');
        this.sliderDots = Array.from(numberCard.querySelectorAll('.number-card__dot'));
        this.slides = numberCard.querySelectorAll('.number-card__slider-list-item');
        // this.dotsContainer = numberCard.querySelector('.number-card__slider-dots');

        this.buttonNext.onclick = () =>  this.switchToNextSlide();
        this.buttonPrev.onclick = () =>  this.switchToPreviousSlide();
        for (let dot of this.sliderDots) {
            dot.onclick = () => this.clickToDot(dot);
        }
    }

    switchToNextSlide() {
        const activeSlide = this.numberCard.querySelector('.number-card__slider-list-item_opacity1');
        const nextSlide = activeSlide.nextElementSibling;
        const activeDot = this.numberCard.querySelector('.number-card__active-dot');
        const nextDot = activeDot.nextElementSibling;

        if (nextSlide) {
            this.switchSlide(activeSlide, nextSlide);
            this.switchSliderDot(activeDot, nextDot);
        }
    }

    switchToPreviousSlide(){
        const activeSlide = this.numberCard.querySelector('.number-card__slider-list-item_opacity1');
        const prevSlide = activeSlide.previousElementSibling;
        const activeDot = this.numberCard.querySelector('.number-card__active-dot');
        const prevDot = activeDot.previousElementSibling;

        if (prevSlide) {
            this.switchSlide(activeSlide, prevSlide);
            this.switchSliderDot(activeDot, prevDot);
        }
    }

    switchSlide(activeSlide, nextSlide) {
        activeSlide.classList.remove('number-card__slider-list-item_opacity1');
        activeSlide.classList.add('number-card__slider-list-item_opacity0');
        nextSlide.classList.remove('number-card__slider-list-item_opacity0');
        nextSlide.classList.add('number-card__slider-list-item_opacity1');
    }

    clickToDot(dot) {
        const activeDot = this.sliderDots.indexOf(this.numberCard.querySelector('.number-card__active-dot'));
        const nextDot = this.sliderDots.indexOf(dot);
        
        this.switchSlide(this.slides[activeDot], this.slides[nextDot]);
        this.switchSliderDot(this.sliderDots[activeDot], this.sliderDots[nextDot]);
    }

    switchSliderDot(activeDot, nextDot) {
        activeDot.classList.remove('number-card__active-dot');
        activeDot.classList.add('number-card__unactive-dot');
        nextDot.classList.remove('number-card__unactive-dot');
        nextDot.classList.add('number-card__active-dot');
    }
}

const numbersCards = document.querySelectorAll('.number-card');

for (let card of numbersCards) {
    let numberCard = new NumberCard(card);
}