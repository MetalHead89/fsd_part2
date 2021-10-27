import RangeSlider from './range-slider';

const sliders = document.querySelectorAll('.js-range-slider');
sliders.forEach((item) => new RangeSlider(item));
