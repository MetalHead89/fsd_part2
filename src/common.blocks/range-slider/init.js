import RangeSlider from './RangeSlider';

const sliders = document.querySelectorAll('.js-range-slider');
sliders.forEach((item) => new RangeSlider(item));
