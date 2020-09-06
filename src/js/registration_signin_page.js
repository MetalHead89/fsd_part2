const header = document.querySelector('.header-container');
const pageBodyBackground = document.querySelector('.registration-signin-page__body');

window.onload = function() {
    console.dir(header);
    console.dir(header.offsetHeight);
    console.dir(header.clientHeight);
    console.dir(header.scrollHeight);
    pageBodyBackground.style.height = `${parseInt(pageBodyBackground.offsetHeight) - parseInt(header.offsetHeight)}px`
}