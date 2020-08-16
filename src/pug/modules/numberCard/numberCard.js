'use strict'

class NumberCard {
    constructor(numberCard) {
        this.numberCard = numberCard;

        this.buttonPrev = numberCard.querySelector('.number-card__prevButton');
        this.buttonNext = numberCard.querySelector('.number-card__nextButton');

        this.buttonNext.onclick = () =>  this.switchToNextSlide();
        this.buttonPrev.onclick = () =>  this.switchToPreviousSlide();
    }

    switchToNextSlide() {
        const activeSlide = this.numberCard.querySelector('.number-card__slider-list-item_opacity1');
        const nextSlide = activeSlide.nextElementSibling;

        activeSlide.classList.remove('number-card__slider-list-item_opacity1');
        activeSlide.classList.add('number-card__slider-list-item_opacity0');
        nextSlide.classList.remove('number-card__slider-list-item_opacity0');
        nextSlide.classList.add('number-card__slider-list-item_opacity1');
    }

    switchToPreviousSlide(){
        const activeSlide = this.numberCard.querySelector('.number-card__slider-list-item_opacity1');
        const prevSlide = activeSlide.previousElementSibling;

        activeSlide.classList.remove('number-card__slider-list-item_opacity1');
        activeSlide.classList.add('number-card__slider-list-item_opacity0');
        prevSlide.classList.remove('number-card__slider-list-item_opacity0');
        prevSlide.classList.add('number-card__slider-list-item_opacity1');
    }
}


const numbersCards = document.querySelectorAll('.number-card');

for (let card of numbersCards) {
    let numberCard = new NumberCard(card);

}