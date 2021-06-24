class RoomRateCard {
  constructor(card) {
    this.roomRateCard = card;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.calendarDays = this.roomRateCard.querySelectorAll(
      '.js-calendar__day_selectable',
    );
    this.dailyCostCalc = this.roomRateCard.querySelector(
      '.js-room-rate-card__daily-calc',
    );
    this.startDate = this.roomRateCard
      .querySelector('.js-dropdown__start-date-input')
      .querySelector('.js-text-field__field');
    this.endDate = this.roomRateCard
      .querySelector('.js-dropdown__end-date-input')
      .querySelector('.js-text-field__field');
    this.dailyCost = parseInt(this.dailyCostCalc.innerText, 10);
    this.serviceCost = parseInt(
      this.roomRateCard.querySelector('.js-room-rate-card__total-services-cost')
        .innerText,
      10,
    );
    this.additionalServiceCost = parseInt(
      this.roomRateCard.querySelector(
        '.js-room-rate-card__total-services-additional-cost',
      ).innerText,
      10,
    );

    this.dailyCostCalc.innerText = `${this.dailyCost.toLocaleString(
      'ru-RU',
    )}₽ x 1 сутки`;
    this.roomRateCard.querySelector(
      '.js-room-rate-card__room-rate',
    ).innerText = `${this.dailyCost.toLocaleString('ru-RU')}₽`;

    if (this.serviceCost < 0) {
      this.roomRateCard.querySelector(
        '.js-room-rate-card__services-label',
      ).innerText = `Сбор за услуги: скидка ${Math.abs(
        this.serviceCost,
      ).toLocaleString('ru-RU')}₽`;
      this.roomRateCard.querySelector(
        '.js-room-rate-card__total-services-cost',
      ).innerText = '0₽';
    } else {
      this.roomRateCard.querySelector(
        '.js-room-rate-card__total-services-cost',
      ).innerText = `${this.serviceCost.toLocaleString('ru-RU')}₽`;
    }
    this.roomRateCard.querySelector(
      '.js-room-rate-card__total-services-additional-cost',
    ).innerText = `${this.additionalServiceCost.toLocaleString('ru-RU')}₽`;
    this.roomRateCard.querySelector(
      '.js-room-rate-card__result-cost',
    ).innerText = `${(
      this.dailyCost +
      this.serviceCost +
      this.additionalServiceCost
    ).toLocaleString('ru-RU')}₽`;
  }

  addEventListeners() {
    if (this.startDate) {
      this.startDate.addEventListener(
        'input',
        this.handleStartDateInputDOMSubtreeModified.bind(this),
      );
    }

    if (this.endDate) {
      this.endDate.addEventListener(
        'input',
        this.handleEndDateInputDOMSubtreeModified.bind(this),
      );
    }

    // this.calendarDays.forEach((item) => {
    //   item.addEventListener('click', this.handleSelectableDayClick.bind(this));
    // });
  }

  handleStartDateInputDOMSubtreeModified() {
    this.calculateCost();
  }

  handleEndDateInputDOMSubtreeModified() {
    this.calculateCost();
  }

  handleSelectableDayClick() {
    this.calculateCost();
  }

  getLengthOfStay() {
    const startDay = Date.parse(
      this.startDate.value.split('.').reverse().join('-'),
    );

    const endDay = Date.parse(
      this.endDate.value.split('.').reverse().join('-'),
    );

    if (this.startDate.value !== '' && this.endDate.value !== '') {
      return new Date(endDay - startDay).getDate();
    }

    return null;
  }

  static getWord(number) {
    /**
     * Склоняет слова
     */
    let word = 'суток';
    if (number % 10 === 1 && number % 100 !== 11) {
      word = 'сутки';
    }

    return word;
  }

  calculateCost() {
    const lengthOfStay = this.getLengthOfStay();

    if (lengthOfStay !== null) {
      const priceRoomForAllTime = this.dailyCost * lengthOfStay;
      this.dailyCostCalc.innerText = `${this.dailyCost.toLocaleString(
        'ru-RU',
      )}₽ x ${lengthOfStay} ${RoomRateCard.getWord(lengthOfStay)}`;
      this.roomRateCard.querySelector(
        '.js-room-rate-card__room-rate',
      ).innerText = `${priceRoomForAllTime.toLocaleString('ru-RU')}₽`;
      this.roomRateCard.querySelector(
        '.js-room-rate-card__result-cost',
      ).innerText = `${(
        priceRoomForAllTime +
        this.serviceCost +
        this.additionalServiceCost
      ).toLocaleString('ru-RU')}₽`;
    }
  }
}

export default RoomRateCard;
