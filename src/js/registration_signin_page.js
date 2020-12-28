const header = document.querySelector('.header-container');
const pageBodyBackground = document.querySelector('.registration-signin-page__body');

function pageHeightIsGreaterThanEntryCard(visiblePageHeight) {
  return document.querySelector('.entry-card') && visiblePageHeight >= 450;
}

function pageHeightIsGreaterThanRegistrationCard(visiblePageHeight) {
  return document.querySelector('.registrationCard') && visiblePageHeight > 800;
}

window.onload = () => {
  const visiblePageHeight = document.documentElement.clientHeight;

  if (pageHeightIsGreaterThanEntryCard(visiblePageHeight)
    || pageHeightIsGreaterThanRegistrationCard(visiblePageHeight)) {
    pageBodyBackground.style.height = `${visiblePageHeight - header.offsetHeight}px`;
  } else if (document.querySelector('.entry-card') && visiblePageHeight < 450) {
    pageBodyBackground.style.height = '450px';
  }
};
