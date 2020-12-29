function degToRad(deg) {
  return (Math.PI * deg) / 180;
}

function setGradient(gradientObject, startColor, endColor) {
  gradientObject.addColorStop(0, startColor);
  gradientObject.addColorStop(1, endColor);
}

function coolieIsValid(cookie) {
  return cookie.trim() === 'magnificently' || cookie.trim() === 'good'
    || cookie.trim() === 'satisfactorily' || cookie.trim() === 'disappointed';
}

function numberIsTwoThreeOrFour(number10, number100) {
  return (number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14);
}

function wordGenerator(number) {
  /**
   * Склоняет слово 'голоса'
   */
  const number10 = number % 10;
  const number100 = number % 100;
  let word = '';

  if (number10 === 1 && number100 !== 11) {
    word = 'голос';
  } else if (numberIsTwoThreeOrFour(number10, number100)) {
    word = 'голоса';
  } else {
    word = 'голосов';
  }

  return word;
}

const canvas = document.querySelector('.impressions-diagram__diagram');
const canvasContext = canvas.getContext('2d');
const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;
const roomImpressions = {};
const separatorSize = 3;
const votesCounterNumber = document.querySelector('.impressions-diagram__votes-number');
const votesCounterText = document.querySelector('.impressions-diagram__votes-text');
let votesSum = 0;
let startAngle = 0;
let endAngle = 0 - degToRad(90 + separatorSize / 2);

function setDiagramSegment(color, votes) {
  if (votes === 0) {
    return;
  }

  const impressionPercent = (votes / votesSum) * 100;
  startAngle = endAngle;
  const degAngle = ((360 * impressionPercent) / 100) - separatorSize;
  endAngle -= degToRad(degAngle);

  canvasContext.beginPath();
  canvasContext.arc(canvasCenterX, canvasCenterY, 58, startAngle, endAngle, true);
  canvasContext.lineWidth = 4;
  canvasContext.strokeStyle = color;
  canvasContext.stroke();
  endAngle -= degToRad(separatorSize);
}

// Установка градиентов
const magnificentlyGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
const goodGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
const satisfactorilyGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
const disappointedGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
setGradient(magnificentlyGradient, '#FFE39C', '#FFBA9C');
setGradient(goodGradient, '#6FCF97', '#66D2EA');
setGradient(satisfactorilyGradient, '#BC9CFF', '#8BA4F9');
setGradient(disappointedGradient, '#919191', '#3D4975');

// Формирование словаря сегментов диаграммы и подсчет общего количества голосов
const cookies = document.cookie.split(';');

for (let cookieIndex = 0; cookieIndex < cookies.length; cookieIndex += 1) {
  const cookie = cookies[cookieIndex].split('=');

  if (coolieIsValid(cookie[0])) {
    roomImpressions[cookie[0].trim()] = parseInt(cookie[1], 10);
    votesSum += parseInt(cookie[1], 10);
  }
}

votesCounterNumber.innerText = votesSum;
votesCounterText.innerText = wordGenerator(votesSum);

setDiagramSegment(magnificentlyGradient, roomImpressions.magnificently);
setDiagramSegment(goodGradient, roomImpressions.good);
setDiagramSegment(satisfactorilyGradient, roomImpressions.satisfactorily);
setDiagramSegment(disappointedGradient, roomImpressions.disappointed);
