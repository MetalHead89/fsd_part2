'use strict'

const header = document.querySelector('.header-container');
const landingBody = document.querySelector('.landing-page__landing-body');
const body = document.querySelector('body');
const landingSlider = document.querySelector('.landing-page__landing-body');
const backgrounds = ["url('../assets/images/landing_image_1.png')", "url('../assets/images/landing_image_2.png')", "url('../assets/images/landing_image_3.png')"];
let i = 0;

console.log(document.querySelector('.landing-page__search-card-container').clientHeight);
window.onload = function() {
    const visiblePageHeight = document.documentElement.clientHeight;
    if (visiblePageHeight >= 600) {
        landingBody.style.height = `${document.documentElement.clientHeight - header.offsetHeight}px`;
    } else if (visiblePageHeight < 600) {
        landingBody.style.height = '600px';
    }
}

// setTimeout(function foo() {
//     landingSlider.style.background = backgrounds[++i % backgrounds.length];
//     setTimeout(foo, 5000);
// }, 5000)