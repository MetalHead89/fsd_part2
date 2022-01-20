import { boundMethod } from 'autobind-decorator';

class Header {
  constructor(header) {
    this._header = header;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._burger = this._header.querySelector('.js-header__burger');
    this._hiddenMenu = this._header.querySelector('.js-header__hidden-navbar');
  }

  _addEventListeners() {
    this._burger.addEventListener('click', this._handleBurgerClick);
  }

  @boundMethod
  _handleBurgerClick() {
    if (this._hiddenMenu) {
      this._hiddenMenu.classList.toggle('header__hidden-navbar_opened');
    }
  }
}

export default Header;
