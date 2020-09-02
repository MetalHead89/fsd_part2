'use strict'

const diagram = document.querySelector('.impressions-diagram__diagram');
const roomImpressions = {};
let votesSum = 0;

for (let cookie of document.cookie.split(';')) {
    cookie = cookie.split('=');
    
    if (cookie[0].trim() == 'magnificently' || cookie[0].trim() == 'good' || 
        cookie[0].trim() == 'satisfactorily' || cookie[0].trim() == 'disappointed') {
        roomImpressions[cookie[0].trim()] = parseInt(cookie[1]);
        votesSum += parseInt(cookie[1]);
    }
}

let diagramStyle = 'linear-gradient(white, white), conic-gradient(';
let startAngle = 0;
let endAngle = 0;

diagramStyle += setDiagramStyle('#919191', roomImpressions['disappointed']);
diagramStyle += setDiagramStyle('#BC9CFF', roomImpressions['satisfactorily']);
diagramStyle += setDiagramStyle('#6FCF97', roomImpressions['good']);
diagramStyle += setDiagramStyle('#FFE39C', roomImpressions['magnificently']);
diagramStyle = `${diagramStyle.slice(0, -1)})`;

diagram.style.backgroundImage = diagramStyle;

function setDiagramStyle(color, votes) {
    if (votes == 0) {
        return '';
    }
    
    let impressionPercent = votes / votesSum * 100;
    startAngle = endAngle;
    endAngle += 360 * impressionPercent / 100;
    return ` ${color} ${startAngle}deg ${endAngle}deg,`;
}

















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