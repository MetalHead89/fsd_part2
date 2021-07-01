class Header {
  constructor(header) {
    this._header = header;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._burger = this._header.querySelector('.js-header__burger');
    this._hideMenu = this._header.querySelector('.js-navbar__list_vertical');
    this._hideMenuItems = this._hideMenu.querySelectorAll(
      '.js-navbar__item_vertical',
    );

    this._handleBurgerClick = this._handleBurgerClick.bind(this);
  }

  _addEventListeners() {
    this._burger.addEventListener('click', this._handleBurgerClick);
  }

  _handleBurgerClick() {
    if (this._hideMenu) {
      this._hideMenu.classList.toggle('navbar__list_opened');
      for (
        let itemIndex = 0;
        itemIndex < this._hideMenuItems.length;
        itemIndex += 1
      ) {
        this._hideMenuItems[itemIndex].classList.toggle('navbar__item_opened');
      }
    }
  }
}

export default Header;
