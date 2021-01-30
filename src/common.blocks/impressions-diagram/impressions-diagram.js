class Diagram {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    this.canvasContext = this.canvas.getContext('2d');
    this.canvasCenterX = this.canvas.width / 2;
    this.canvasCenterY = this.canvas.height / 2;
    this.roomImpressions = {};
    this.separatorSize = 3;
    this.votesCounterNumber = document.querySelector(
      '.impressions-diagram__votes-number'
    );
    this.votesCounterText = document.querySelector(
      '.impressions-diagram__votes-text'
    );
    this.votesSum = 0;
    this.startAngle = 0;
    this.endAngle = 0 - Diagram.degToRad(90 + this.separatorSize / 2);

    // Установка градиентов
    const magnificentlyGradient = this.canvasContext.createLinearGradient(
      0,
      0,
      0,
      120
    );
    const goodGradient = this.canvasContext.createLinearGradient(0, 0, 0, 120);
    const satisfactorilyGradient = this.canvasContext.createLinearGradient(
      0,
      0,
      0,
      120
    );
    const disappointedGradient = this.canvasContext.createLinearGradient(
      0,
      0,
      0,
      120
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
        this.roomImpressions[cookie[0].trim()] = parseInt(cookie[1], 10);
        this.votesSum += parseInt(cookie[1], 10);
      }
    }

    this.votesCounterNumber.innerText = this.votesSum;
    this.votesCounterText.innerText = Diagram.wordGenerator(this.votesSum);

    this.setDiagramSegment(
      magnificentlyGradient,
      this.roomImpressions.magnificently
    );
    this.setDiagramSegment(goodGradient, this.roomImpressions.good);
    this.setDiagramSegment(
      satisfactorilyGradient,
      this.roomImpressions.satisfactorily
    );
    this.setDiagramSegment(
      disappointedGradient,
      this.roomImpressions.disappointed
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

  setDiagramSegment(color, votes) {
    if (votes === 0) {
      return;
    }

    const impressionPercent = (votes / this.votesSum) * 100;
    this.startAngle = this.endAngle;
    const degAngle = (360 * impressionPercent) / 100 - this.separatorSize;
    this.endAngle -= Diagram.degToRad(degAngle);

    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.canvasCenterX,
      this.canvasCenterY,
      58,
      this.startAngle,
      this.endAngle,
      true
    );
    this.canvasContext.lineWidth = 4;
    this.canvasContext.strokeStyle = color;
    this.canvasContext.stroke();
    this.endAngle -= Diagram.degToRad(this.separatorSize);
  }
}

const canvas = document.querySelector('.impressions-diagram__diagram');
if (canvas !== null) {
  const diagram = new Diagram(canvas);
}
