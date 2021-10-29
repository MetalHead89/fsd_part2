import ImpressionsDiagram from './ImpressionsDiagram';

const diagrams = document.querySelectorAll('.js-impressions-diagram');
diagrams.forEach((item) => new ImpressionsDiagram(item));
