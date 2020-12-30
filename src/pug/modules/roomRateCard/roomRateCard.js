const roomRateCard = document.querySelector('.room-rate-card');
const dailyCostCalc = roomRateCard.querySelector('.room-rate-card__daily-calc');
const startDate = roomRateCard.querySelector('.dropdown__startDate');
const endDate = roomRateCard.querySelector('.dropdown__endDate');
const dailyCost = parseInt(dailyCostCalc.innerText, 10);
const serviceCost = parseInt(roomRateCard.querySelector('.room-rate-card__total-services-cost').innerText, 10);
const additionalServiceCost = parseInt(roomRateCard.querySelector('.room-rate-card__total-services-additional-cost').innerText, 10);

function getLengthOfStay() {
  const startDay = Date.parse(roomRateCard.querySelector('.dropdown__startDate').innerText.split('.').reverse().join('-'));
  const endDay = Date.parse(roomRateCard.querySelector('.dropdown__endDate').innerText.split('.').reverse().join('-'));

  if (startDay && endDay) {
    return new Date(endDay - startDay).getDate();
  }

  return null;
}

function getWord(number) {
  /**
   * Склоняет слова
   */
  let word = 'суток';
  if (number % 10 === 1 && number % 100 !== 11) {
    word = 'сутки';
  }

  return word;
}

function calculateCost() {
  const lengthOfStay = getLengthOfStay();

  if (lengthOfStay) {
    const priceRoomForAllTime = dailyCost * lengthOfStay;
    dailyCostCalc.innerText = `${dailyCost.toLocaleString('ru-RU')}₽ x ${lengthOfStay} ${getWord(lengthOfStay)}`;
    roomRateCard.querySelector('.room-rate-card__room-rate').innerText = `${(priceRoomForAllTime).toLocaleString('ru-RU')}₽`;
    roomRateCard.querySelector('.room-rate-card__result-cost').innerText = `${(priceRoomForAllTime + serviceCost + additionalServiceCost).toLocaleString('ru-RU')}₽`;
  }
}

if (startDate) {
  startDate.addEventListener('DOMSubtreeModified', calculateCost);
}

if (endDate) {
  endDate.addEventListener('DOMSubtreeModified', calculateCost);
}

dailyCostCalc.innerText = `${dailyCost.toLocaleString('ru-RU')}₽ x 1 сутки`;
roomRateCard.querySelector('.room-rate-card__room-rate').innerText = `${dailyCost.toLocaleString('ru-RU')}₽`;

if (serviceCost < 0) {
  roomRateCard.querySelector('.room-rate-card__services-label').innerText = `Сбор за услуги: скидка ${Math.abs(serviceCost).toLocaleString('ru-RU')}₽`;
  roomRateCard.querySelector('.room-rate-card__total-services-cost').innerText = '0₽';
} else {
  roomRateCard.querySelector('.room-rate-card__total-services-cost').innerText = `${serviceCost.toLocaleString('ru-RU')}₽`;
}
roomRateCard.querySelector('.room-rate-card__total-services-additional-cost').innerText = `${additionalServiceCost.toLocaleString('ru-RU')}₽`;
roomRateCard.querySelector('.room-rate-card__result-cost').innerText = `${(dailyCost + serviceCost + additionalServiceCost).toLocaleString('ru-RU')}₽`;
