'use strict'

const landingSlider = document.querySelector('.landing-page__landing-body');
const backgrounds = ["url('../assets/images/landing_image_1.png')", "url('../assets/images/landing_image_2.png')", "url('../assets/images/landing_image_3.png')"];
let i = 0;

setTimeout(function foo() {
    landingSlider.style.background = backgrounds[++i % backgrounds.length];
    setTimeout(foo, 5000);
}, 5000)
    