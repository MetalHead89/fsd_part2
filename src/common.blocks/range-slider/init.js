import Slider from './range-slider';

const sliders = document.querySelectorAll('.js-range-slider');
sliders.forEach((item) => new Slider(item));
