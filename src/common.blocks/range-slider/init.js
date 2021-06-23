import Slider from './range-slider';

const sliders = document.querySelectorAll('.range-slider');
sliders.forEach((item) => new Slider(item));
