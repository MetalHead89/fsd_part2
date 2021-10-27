import ImpressionsDiagram from './impressions-diagram';

const diagrams = document.querySelectorAll('.js-impressions-diagram');
diagrams.forEach((item) => new ImpressionsDiagram(item));
