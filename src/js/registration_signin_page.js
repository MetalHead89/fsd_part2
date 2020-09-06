'use strict'

const header = document.querySelector('.header-container');
const pageBodyBackground = document.querySelector('.registration-signin-page__body');
const body = document.querySelector('body');

window.onload = function() {
    const visiblePageHeight = document.documentElement.clientHeight;
    if (document.querySelector('.entry-card') && visiblePageHeight >= 450 ||
        document.querySelector('.registrationCard') && visiblePageHeight > 800) {
            pageBodyBackground.style.height = `${document.documentElement.clientHeight - header.offsetHeight}px`;
    } else if (document.querySelector('.entry-card') && visiblePageHeight < 450) {
        pageBodyBackground.style.height = '450px';
    }
}