const burger = document.querySelector('.header__burger');
const hideMenu = document.querySelector('.navbar__list_vertical');
const hideMenuItems = hideMenu.querySelectorAll('.navbar__item_vertical');

burger.onclick = () => {
  if (hideMenu) {
    hideMenu.classList.toggle('navbar_vertical-opened');
    for (let itemIndex = 0; itemIndex < hideMenuItems.length; itemIndex += 1) {
      hideMenuItems[itemIndex].classList.toggle('navbar__item_vertical-opened');
    }
  }
};
