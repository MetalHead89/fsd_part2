import Diagram from './impressions-diagram';

const diagrams = document.querySelectorAll('.js-impressions-diagram');
diagrams.forEach((item) => new Diagram(item));
