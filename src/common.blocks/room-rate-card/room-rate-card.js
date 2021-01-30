class RoomRateCard {
  constructor(card) {
    this.roomRateCard = card;

    this.init();
  }

  init() {
    this.dailyCostCalc = this.roomRateCard.querySelector(
      '.room-rate-card__daily-calc'
    );
    this.startDate = this.roomRateCard.querySelector('.dropdown_start-date');
    this.endDate = this.roomRateCard.querySelector('.dropdown_end-date');
    this.dailyCost = parseInt(this.dailyCostCalc.innerText, 10);
    this.serviceCost = parseInt(
      this.roomRateCard.querySelector('.room-rate-card__total-services-cost')
        .innerText,
      10
    );
    this.additionalServiceCost = parseInt(
      this.roomRateCard.querySelector(
        '.room-rate-card__total-services-additional-cost'
      ).innerText,
      10
    );

    if (this.startDate) {
      this.startDate.addEventListener(
        'DOMSubtreeModified',
        this.calculateCost.bind(this)
      );
    }

    if (this.endDate) {
      this.endDate.addEventListener(
        'DOMSubtreeModified',
        this.calculateCost.bind(this)
      );
    }

    this.dailyCostCalc.innerText = `${this.dailyCost.toLocaleString(
      'ru-RU'
    )}₽ x 1 сутки`;
    this.roomRateCard.querySelector(
      '.room-rate-card__room-rate'
    ).innerText = `${this.dailyCost.toLocaleString('ru-RU')}₽`;

    if (this.serviceCost < 0) {
      this.roomRateCard.querySelector(
        '.room-rate-card__services-label'
      ).innerText = `Сбор за услуги: скидка ${Math.abs(
        this.serviceCost
      ).toLocaleString('ru-RU')}₽`;
      this.roomRateCard.querySelector(
        '.room-rate-card__total-services-cost'
      ).innerText = '0₽';
    } else {
      this.roomRateCard.querySelector(
        '.room-rate-card__total-services-cost'
      ).innerText = `${this.serviceCost.toLocaleString('ru-RU')}₽`;
    }
    this.roomRateCard.querySelector(
      '.room-rate-card__total-services-additional-cost'
    ).innerText = `${this.additionalServiceCost.toLocaleString('ru-RU')}₽`;
    this.roomRateCard.querySelector(
      '.room-rate-card__result-cost'
    ).innerText = `${(
      this.dailyCost +
      this.serviceCost +
      this.additionalServiceCost
    ).toLocaleString('ru-RU')}₽`;
  }

  getLengthOfStay() {
    const startDay = Date.parse(
      this.roomRateCard
        .querySelector('.dropdown_start-date')
        .innerText.split('.')
        .reverse()
        .join('-')
    );

    const endDay = Date.parse(
      this.roomRateCard
        .querySelector('.dropdown_end-date')
        .innerText.split('.')
        .reverse()
        .join('-')
    );

    if (startDay && endDay) {
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

    if (lengthOfStay) {
      const priceRoomForAllTime = this.dailyCost * lengthOfStay;
      this.dailyCostCalc.innerText = `${this.dailyCost.toLocaleString(
        'ru-RU'
      )}₽ x ${lengthOfStay} ${RoomRateCard.getWord(lengthOfStay)}`;
      this.roomRateCard.querySelector(
        '.room-rate-card__room-rate'
      ).innerText = `${priceRoomForAllTime.toLocaleString('ru-RU')}₽`;
      this.roomRateCard.querySelector(
        '.room-rate-card__result-cost'
      ).innerText = `${(
        priceRoomForAllTime +
        this.serviceCost +
        this.additionalServiceCost
      ).toLocaleString('ru-RU')}₽`;
    }
  }
}

const roomRateCards = document.querySelectorAll('.room-rate-card');
for (let card = 0; card < roomRateCards.length; card += 1) {
  const rateCard = new RoomRateCard(roomRateCards[card]);
}
