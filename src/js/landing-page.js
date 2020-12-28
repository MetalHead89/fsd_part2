const header = document.querySelector('.header-container');
const landingBody = document.querySelector('.landing-page__landing-body');

window.onload = () => {
  const visiblePageHeight = document.documentElement.clientHeight;

  if (visiblePageHeight >= 600) {
    landingBody.style.height = `${document.documentElement.clientHeight - header.offsetHeight}px`;
  } else if (visiblePageHeight < 600) {
    landingBody.style.height = '600px';
  }
};
