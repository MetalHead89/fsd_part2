class BurgerMenu {
  constructor(burger) {
    this.burger = burger;

    this.init();
  }

  init() {
    const hideMenu = document.querySelector('.navbar__list_vertical');
    const hideMenuItems = hideMenu.querySelectorAll('.navbar__item_vertical');

    this.burger.onclick = () => {
      if (hideMenu) {
        hideMenu.classList.toggle('navbar__list_vertical-opened');
        for (
          let itemIndex = 0;
          itemIndex < hideMenuItems.length;
          itemIndex += 1
        ) {
          hideMenuItems[itemIndex].classList.toggle(
            'navbar__item_vertical-opened'
          );
        }
      }
    };
  }
}

const burger = document.querySelector('.header__burger');
if (burger !== null) {
  const burgerMenu = new BurgerMenu(burger);
}
