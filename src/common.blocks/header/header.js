class BurgerMenu {
  constructor(burger) {
    this.burger = burger;

    this.init();
  }

  init() {
    const hideMenu = document.querySelector('.js-navbar__list_vertical');
    const hideMenuItems = hideMenu.querySelectorAll('.js-navbar__item_vertical');
    hideMenu.classList.add('navbar__list_vertical-closed');
    hideMenuItems.forEach((item) => {
      item.classList.add('navbar__item_vertical-closed');
    });

    this.burger.onclick = () => {
      if (hideMenu) {
        hideMenu.classList.toggle('navbar__list_vertical-opened');
        hideMenu.classList.toggle('navbar__list_vertical-closed');
        for (
          let itemIndex = 0;
          itemIndex < hideMenuItems.length;
          itemIndex += 1
        ) {
          hideMenuItems[itemIndex].classList.toggle(
            'navbar__item_vertical-opened'
          );
          hideMenuItems[itemIndex].classList.toggle(
            'navbar__item_vertical-closed'
          );
        }
      }
    };
  }
}

const burger = document.querySelector('.js-header__burger');
if (burger !== null) {
  // eslint-disable-next-line no-new
  new BurgerMenu(burger);
}
