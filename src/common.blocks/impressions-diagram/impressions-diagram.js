class Diagram {
  constructor(diagram) {
    this._diagram = diagram;
    this._init();
  }

  _init() {
    this._canvasContext = this._diagram.getContext('2d');
    this._canvasCenterX = this._diagram.width / 2;
    this._canvasCenterY = this._diagram.height / 2;
    this._roomImpressions = {};
    this._separatorSize = 3;
    this._votesCounterNumber = document.querySelector(
      '.js-impressions-diagram__votes-number',
    );
    this._votesCounterText = document.querySelector(
      '.js-impressions-diagram__votes-text',
    );
    this._votesSum = 0;
    this._startAngle = 0;
    this._endAngle = 0 - Diagram.degToRad(90 + this._separatorSize / 2);

    // Установка градиентов
    const magnificentlyGradient = this._canvasContext.createLinearGradient(
      0,
      0,
      0,
      120,
    );
    const goodGradient = this._canvasContext.createLinearGradient(0, 0, 0, 120);
    const satisfactorilyGradient = this._canvasContext.createLinearGradient(
      0,
      0,
      0,
      120,
    );
    const disappointedGradient = this._canvasContext.createLinearGradient(
      0,
      0,
      0,
      120,
    );
    Diagram.setGradient(magnificentlyGradient, '#FFE39C', '#FFBA9C');
    Diagram.setGradient(goodGradient, '#6FCF97', '#66D2EA');
    Diagram.setGradient(satisfactorilyGradient, '#BC9CFF', '#8BA4F9');
    Diagram.setGradient(disappointedGradient, '#919191', '#3D4975');

    // Формирование словаря сегментов диаграммы и подсчет общего количества голосов
    const cookies = document.cookie.split(';');

    for (let cookieIndex = 0; cookieIndex < cookies.length; cookieIndex += 1) {
      const cookie = cookies[cookieIndex].split('=');

      if (Diagram.coolieIsValid(cookie[0])) {
        this._roomImpressions[cookie[0].trim()] = parseInt(cookie[1], 10);
        this._votesSum += parseInt(cookie[1], 10);
      }
    }

    this._votesCounterNumber.innerText = this._votesSum;
    this._votesCounterText.innerText = Diagram.wordGenerator(this._votesSum);

    this._setDiagramSegment(
      magnificentlyGradient,
      this._roomImpressions.magnificently,
    );
    this._setDiagramSegment(goodGradient, this._roomImpressions.good);
    this._setDiagramSegment(
      satisfactorilyGradient,
      this._roomImpressions.satisfactorily,
    );
    this._setDiagramSegment(
      disappointedGradient,
      this._roomImpressions.disappointed,
    );
  }

  static degToRad(deg) {
    return (Math.PI * deg) / 180;
  }

  static setGradient(gradientObject, startColor, endColor) {
    gradientObject.addColorStop(0, startColor);
    gradientObject.addColorStop(1, endColor);
  }

  static coolieIsValid(cookie) {
    return (
      cookie.trim() === 'magnificently' ||
      cookie.trim() === 'good' ||
      cookie.trim() === 'satisfactorily' ||
      cookie.trim() === 'disappointed'
    );
  }

  static wordGenerator(number) {
    /**
     * Склоняет слово 'голоса'
     */
    const number10 = number % 10;
    const number100 = number % 100;
    let word = '';

    if (number10 === 1 && number100 !== 11) {
      word = 'голос';
    } else if (Diagram.numberIsTwoThreeOrFour(number10, number100)) {
      word = 'голоса';
    } else {
      word = 'голосов';
    }

    return word;
  }

  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }

  _setDiagramSegment(color, votes) {
    if (votes === 0) {
      return;
    }

    const impressionPercent = (votes / this._votesSum) * 100;
    this._startAngle = this._endAngle;
    const degAngle = (360 * impressionPercent) / 100 - this._separatorSize;
    this._endAngle -= Diagram.degToRad(degAngle);

    this._canvasContext.beginPath();
    this._canvasContext.arc(
      this._canvasCenterX,
      this._canvasCenterY,
      58,
      this._startAngle,
      this._endAngle,
      true,
    );
    this._canvasContext.lineWidth = 4;
    this._canvasContext.strokeStyle = color;
    this._canvasContext.stroke();
    this._endAngle -= Diagram.degToRad(this._separatorSize);
  }
}

export default Diagram;
