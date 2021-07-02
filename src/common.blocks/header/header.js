class Header {
  constructor(header) {
    this._header = header;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._burger = this._header.querySelector('.js-header__burger');
    this._hideMenu = this._header.querySelector('.js-header__hidden-navbar');

    this._handleBurgerClick = this._handleBurgerClick.bind(this);
  }

  _addEventListeners() {
    this._burger.addEventListener('click', this._handleBurgerClick);
  }

  _handleBurgerClick() {
    if (this._hideMenu) {
      this._hideMenu.classList.toggle('header__hidden-navbar_opened');
    }
  }
}

export default Header;
