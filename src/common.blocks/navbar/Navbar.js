/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import { boundMethod } from 'autobind-decorator';

class Navbar {
  constructor(navbar) {
    this._navbar = navbar;

    this._init();
    this._addEventListeners();
  }

  @boundMethod
  handleDropdownTitleClick(event) {
    if (this._orientation === 'vertical') {
      const hiddenListSwitch = event.target.offsetParent.querySelector(
        '.navbar__hidden-list-switch'
      );
      hiddenListSwitch.checked = !hiddenListSwitch.checked;
    }
  }

  _init() {
    this._orientation = this._navbar.classList.contains(
      'js-navbar_theme_vertical'
    )
      ? 'vertical'
      : 'horizontal';
    this._entryButton = this._navbar.querySelector(
      '.js-navbar__button-entry-container'
    );
    this._accountName = this._navbar.querySelector(
      '.js-navbar__item_type_name'
    );
    this._dropdownItems = this._navbar.querySelectorAll(
      '.js-navbar__dropdown-title'
    );

    this._handleButtonEntryClick = Navbar.handleButtonEntryClick.bind(this);
    this._handleNavbarItemWithNameClick = Navbar.handleNavbarItemWithNameClick.bind(
      this
    );
  }

  _addEventListeners() {
    this._entryButton.addEventListener('click', Navbar.handleButtonEntryClick);

    this._accountName.addEventListener(
      'click',
      Navbar.handleNavbarItemWithNameClick
    );

    this._dropdownItems.forEach((item) => {
      item.addEventListener('click', this.handleDropdownTitleClick);
    });
  }

  static handleButtonEntryClick() {
    Navbar.signIn();
  }

  static handleNavbarItemWithNameClick() {
    Navbar.signIn();
  }

  static signIn() {
    const navbars = document.querySelectorAll('.js-navbar');
    navbars.forEach((navbar) => navbar.classList.toggle('navbar_logged-in'));
  }
}

export default Navbar;
