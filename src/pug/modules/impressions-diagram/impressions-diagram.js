'use strict'

const canvas = document.querySelector('.impressions-diagram__diagram');
const canvasContext = canvas.getContext('2d');
const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;
const roomImpressions = {};
const separatorSize = 3;
const votesCounterNumber = document.querySelector('.impressions-diagram__votes-number');
const votesCounterText = document.querySelector('.impressions-diagram__votes-text');
let votesSum = 0;
let diagramSegmentCount = 0;
let startAngle = 0
let endAngle = 0 - degToRad(90 + separatorSize / 2);

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
for (let cookie of document.cookie.split(';')) {
    cookie = cookie.split('=');
    
    if (cookie[0].trim() == 'magnificently' || cookie[0].trim() == 'good' || 
        cookie[0].trim() == 'satisfactorily' || cookie[0].trim() == 'disappointed') {
        
        // Подсчёт количества сегментов
        if (parseInt(cookie[1]) != 0) {
            diagramSegmentCount++;
        }

        roomImpressions[cookie[0].trim()] = parseInt(cookie[1]);
        votesSum += parseInt(cookie[1]);
    }
}

votesCounterNumber.innerText = votesSum;
votesCounterText.innerText = wordGenerator(votesSum);

setDiagramSegment(magnificentlyGradient, roomImpressions['magnificently']);
setDiagramSegment(goodGradient, roomImpressions['good']);
setDiagramSegment(satisfactorilyGradient, roomImpressions['satisfactorily']);
setDiagramSegment(disappointedGradient, roomImpressions['disappointed']);

function setGradient(gradientObject, startColor, endColor) {
    gradientObject.addColorStop(0, startColor);
    gradientObject.addColorStop(1, endColor);
}

function setDiagramSegment(color, votes) {
    if (votes == 0) {
        return;
    }
    
    let impressionPercent = votes / votesSum * 100;
    startAngle = endAngle;
    let degAngle = (360 * impressionPercent / 100) - separatorSize;
    endAngle -= degToRad(degAngle);

    canvasContext.beginPath();
    canvasContext.arc(canvasCenterX, canvasCenterY, 58, startAngle, endAngle, true);
    canvasContext.lineWidth = 4;
    canvasContext.strokeStyle = color;
    canvasContext.stroke();
    endAngle -= degToRad(separatorSize);
}

function degToRad(deg) {
    return (Math.PI * deg) / 180;
}

function wordGenerator(number) {
    /**
     * Склоняет слово 'голоса'
     */
    let number10 = number % 10;
    let number100 = number % 100;
    if (number10 == 1 && number100 != 11) {
        return 'голос';
    }
    else if ((number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14)) {
        return 'голоса';
    }
    else {
        return 'голосов';
    }
}





// 'use strict'

// const canvas = document.querySelector('.impressions-diagram__diagram');
// const canvasContext = canvas.getContext('2d');
// const canvasCenterX = canvas.width / 2;
// const canvasCenterY = canvas.height / 2;
// const roomImpressions = {};
// let votesSum = 0;
// let diagramSegmentCount = 0;
// let startAngle = 0
// let endAngle = 0 - degToRad(90);

// // Установка градиентов
// const magnificentlyGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
// const goodGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
// const satisfactorilyGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
// const disappointedGradient = canvasContext.createLinearGradient(0, 0, 0, 120);
// setGradient(magnificentlyGradient, '#FFE39C', '#FFBA9C');
// setGradient(goodGradient, '#6FCF97', '#66D2EA');
// setGradient(satisfactorilyGradient, '#BC9CFF', '#8BA4F9');
// setGradient(disappointedGradient, '#919191', '#3D4975');

// // Формирование словаря сегментов диаграммы и подсчет общего количества голосов
// for (let cookie of document.cookie.split(';')) {
//     cookie = cookie.split('=');
    
//     if (cookie[0].trim() == 'magnificently' || cookie[0].trim() == 'good' || 
//         cookie[0].trim() == 'satisfactorily' || cookie[0].trim() == 'disappointed') {
        
//         // Подсчёт количества сегментов
//         if (parseInt(cookie[1]) != 0) {
//             diagramSegmentCount++;
//         }

//         roomImpressions[cookie[0].trim()] = parseInt(cookie[1]);
//         votesSum += parseInt(cookie[1]);
//     }
// }

// setDiagramSegment(magnificentlyGradient, roomImpressions['magnificently']);
// setDiagramSegment(goodGradient, roomImpressions['good']);
// setDiagramSegment(satisfactorilyGradient, roomImpressions['satisfactorily']);
// setDiagramSegment(disappointedGradient, roomImpressions['disappointed']);





// function setGradient(gradientObject, startColor, endColor) {
//     gradientObject.addColorStop(0, startColor);
//     gradientObject.addColorStop(1, endColor);
// }

// function setDiagramSegment(color, votes) {
//     if (votes == 0) {
//         return;
//     }
    
//     let impressionPercent = votes / votesSum * 100;
//     startAngle = endAngle;
//     let degAngle = 360 * impressionPercent / 100;
//     endAngle += degToRad(degAngle)

//     canvasContext.arc(canvasCenterX, canvasCenterY, 58, startAngle, endAngle, true);
//     canvasContext.lineWidth = 4;
//     canvasContext.strokeStyle = color;
//     canvasContext.stroke();
// }

// function degToRad(deg) {
//     return (Math.PI * deg) / 180;
// }




















// canvasContext.arc(canvasCenterX, canvasCenterY, 58, 0 - (Math.PI*90/180), Math.PI*90/180, true);
// canvasContext.lineWidth = 4;
// canvasContext.strokeStyle = magnificentlyGradient;
// canvasContext.stroke();



// const diagram = document.querySelector('.impressions-diagram__diagram');
// const roomImpressions = {};
// let votesSum = 0;

// for (let cookie of document.cookie.split(';')) {
//     cookie = cookie.split('=');
    
//     if (cookie[0].trim() == 'magnificently' || cookie[0].trim() == 'good' || 
//         cookie[0].trim() == 'satisfactorily' || cookie[0].trim() == 'disappointed') {
//         roomImpressions[cookie[0].trim()] = parseInt(cookie[1]);
//         votesSum += parseInt(cookie[1]);
//     }
// }

// let diagramStyle = 'linear-gradient(white, white), conic-gradient(';
// let startAngle = 0;
// let endAngle = 0;

// diagramStyle += setDiagramStyle('#919191', roomImpressions['disappointed']);
// diagramStyle += setDiagramStyle('#BC9CFF', roomImpressions['satisfactorily']);
// diagramStyle += setDiagramStyle('#6FCF97', roomImpressions['good']);
// diagramStyle += setDiagramStyle('#FFE39C', roomImpressions['magnificently']);
// diagramStyle = `${diagramStyle.slice(0, -1)})`;

// diagram.style.backgroundImage = diagramStyle;

// function setDiagramStyle(color, votes) {
//     if (votes == 0) {
//         return '';
//     }
    
//     let impressionPercent = votes / votesSum * 100;
//     startAngle = endAngle;
//     endAngle += 360 * impressionPercent / 100;
//     return ` ${color} ${startAngle}deg ${endAngle}deg,`;
// }











// 'use strict'

// const diagram = document.querySelector('.impressions-diagram__diagram');
// const roomImpressions = {};
// let votesSum = 0;

// for (let cookie of document.cookie.split(';')) {
//     cookie = cookie.split('=');
    
//     if (cookie[0].trim() == 'magnificently' || cookie[0].trim() == 'good' || 
//         cookie[0].trim() == 'satisfactorily' || cookie[0].trim() == 'disappointed') {
//         roomImpressions[cookie[0].trim()] = parseInt(cookie[1]);
//         votesSum += parseInt(cookie[1]);
//     }
// }

// let diagramStyle = 'linear-gradient(white, white), conic-gradient(';
// let startAngle = 0;
// let endAngle = 0;

// diagramStyle += setDiagramStyle('#919191', roomImpressions['disappointed']);
// diagramStyle += setDiagramStyle('#BC9CFF', roomImpressions['satisfactorily']);
// diagramStyle += setDiagramStyle('#6FCF97', roomImpressions['good']);
// diagramStyle += setDiagramStyle('#FFE39C', roomImpressions['magnificently']);
// diagramStyle = `${diagramStyle.slice(0, -1)})`;

// diagram.style.backgroundImage = diagramStyle;

// function setDiagramStyle(color, votes) {
//     if (votes == 0) {
//         return '';
//     }
    
//     let impressionPercent = votes / votesSum * 100;
//     startAngle = endAngle;
//     endAngle += 360 * impressionPercent / 100;
//     return ` ${color} ${startAngle}deg ${endAngle}deg,`;
// }

















// 'use strict'

// const diagram = document.querySelector('.impressions-diagram__diagram');
// const roomImpressions = {};
// let votesSum = 0;

// for (let cookie of document.cookie.split(';')) {
//     cookie = cookie.split('=');
    
//     if (cookie[0].trim() == 'magnificently' || cookie[0].trim() == 'good' || 
//         cookie[0].trim() == 'satisfactorily' || cookie[0].trim() == 'disappointed') {
//         roomImpressions[cookie[0].trim()] = parseInt(cookie[1]);
//         votesSum += parseInt(cookie[1]);
//     }
// }

// let diagramStyle = 'linear-gradient(white, white), conic-gradient(';
// let endAngle = 0;

// diagramStyle += setDiagramStyle('#FFE39C', '#FFBA9C', roomImpressions['magnificently']);
// diagramStyle += setDiagramStyle('#6FCF97', '#66D2EA', roomImpressions['good']);
// diagramStyle += setDiagramStyle('#BC9CFF', '#8BA4F9', roomImpressions['satisfactorily']);
// diagramStyle += setDiagramStyle('#919191', '#3D4975', roomImpressions['disappointed']);

// diagramStyle = `${diagramStyle.slice(0, -1)})`;

// diagram.style.backgroundImage = diagramStyle;

// function setDiagramStyle(startColor, endColor, votes) {
//     if (votes == 0) {
//         return '';
//     }
    
//     let impressionPercent = votes / votesSum * 100;
//     const startAngle = endAngle;
//     endAngle += 360 * impressionPercent / 100;
//     return ` ${startColor} ${startAngle}deg, ${endColor} ${endAngle}deg,`;
// }