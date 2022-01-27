/* eslint-disable comma-dangle */

import { boundMethod } from 'autobind-decorator';

class RoomRateCard {
  constructor(card, dateDropdown) {
    this._roomRateCard = card;
    this._dateDropdown = dateDropdown;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._dailyCostCalc = this._roomRateCard.querySelector(
      '.js-room-rate-card__daily-calc'
    );
    this._dailyCost = parseInt(this._dailyCostCalc.innerText, 10);
    this._serviceCost = parseInt(
      this._roomRateCard.querySelector(
        '.js-room-rate-card__total-services-cost'
      ).innerText,
      10
    );
    this._additionalServiceCost = parseInt(
      this._roomRateCard.querySelector(
        '.js-room-rate-card__total-services-additional-cost'
      ).innerText,
      10
    );

    this._dailyCostCalc.innerText = `${this._dailyCost.toLocaleString(
      'ru-RU'
    )}₽ x 1 сутки`;
    this._roomRateCard.querySelector(
      '.js-room-rate-card__room-rate'
    ).innerText = `${this._dailyCost.toLocaleString('ru-RU')}₽`;

    if (this._serviceCost < 0) {
      this._roomRateCard.querySelector(
        '.js-room-rate-card__services-label'
      ).innerText = `Сбор за услуги: скидка ${Math.abs(
        this._serviceCost
      ).toLocaleString('ru-RU')}₽`;
      this._roomRateCard.querySelector(
        '.js-room-rate-card__total-services-cost'
      ).innerText = '0₽';
    } else {
      this._roomRateCard.querySelector(
        '.js-room-rate-card__total-services-cost'
      ).innerText = `${this._serviceCost.toLocaleString('ru-RU')}₽`;
    }
    this._roomRateCard.querySelector(
      '.js-room-rate-card__total-services-additional-cost'
    ).innerText = `${this._additionalServiceCost.toLocaleString('ru-RU')}₽`;
    this._roomRateCard.querySelector(
      '.js-room-rate-card__result-cost'
    ).innerText = `${(
      this._dailyCost +
      this._serviceCost +
      this._additionalServiceCost
    ).toLocaleString('ru-RU')}₽`;
  }

  _addEventListeners() {
    this._dateDropdown.addClickToApplyButtonListener(this._calculateCost);
  }

  @boundMethod
  _calculateCost() {
    const { startDate, endDate } = this._dateDropdown.getDataFieldsValues();
    const lengthOfStay = RoomRateCard.getLengthOfStay(startDate, endDate);

    if (lengthOfStay !== null) {
      const priceRoomForAllTime = this._dailyCost * lengthOfStay;
      this._dailyCostCalc.innerText = `${this._dailyCost.toLocaleString(
        'ru-RU'
      )}₽ x ${lengthOfStay} ${RoomRateCard.getWord(lengthOfStay)}`;
      this._roomRateCard.querySelector(
        '.js-room-rate-card__room-rate'
      ).innerText = `${priceRoomForAllTime.toLocaleString('ru-RU')}₽`;
      this._roomRateCard.querySelector(
        '.js-room-rate-card__result-cost'
      ).innerText = `${(
        priceRoomForAllTime +
        this._serviceCost +
        this._additionalServiceCost
      ).toLocaleString('ru-RU')}₽`;
    } else {
      this._dailyCostCalc.innerText = `${this._dailyCost.toLocaleString(
        'ru-RU'
      )}₽ x 0 ${RoomRateCard.getWord(0)}`;
      this._roomRateCard.querySelector(
        '.js-room-rate-card__room-rate'
      ).innerText = `${'0'.toLocaleString('ru-RU')}₽`;
      this._roomRateCard.querySelector(
        '.js-room-rate-card__result-cost'
      ).innerText = `${'0'.toLocaleString('ru-RU')}₽`;
    }
  }

  static getLengthOfStay(startDate, endDate) {
    if (startDate.length === 10 && endDate.length === 10) {
      const startDay = Date.parse(startDate.split('.').reverse().join('-'));
      const endDay = Date.parse(endDate.split('.').reverse().join('-'));

      return (endDay - startDay) / 86400000 + 1;
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
}

export default RoomRateCard;
