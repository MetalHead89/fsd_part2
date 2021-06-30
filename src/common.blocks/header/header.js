class Header {
  constructor(header) {
    this.header = header;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.burger = this.header.querySelector('.js-header__burger');
    this.hideMenu = this.header.querySelector('.js-navbar__list_vertical');

    this.hideMenuItems = this.hideMenu.querySelectorAll(
      '.js-navbar__item_vertical'
    );
  }

  addEventListeners() {
    this.burger.addEventListener('click', this.handleBurgerClick.bind(this));
  }

  handleBurgerClick() {
    if (this.hideMenu) {
      this.hideMenu.classList.toggle('navbar__list_opened');
      for (
        let itemIndex = 0;
        itemIndex < this.hideMenuItems.length;
        itemIndex += 1
      ) {
        this.hideMenuItems[itemIndex].classList.toggle(
          'navbar__item_opened'
        );
      }
    }
  }
}

export default Header;
