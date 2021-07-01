/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

class Navbar {
  constructor(navbar) {
    this._navbar = navbar;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._entryButton = this._navbar.querySelector(
      '.js-navbar__button-entry-container',
    );
    this._accountName = this._navbar.querySelector(
      '.js-navbar__item_with-name',
    );
    this._dropdownItems = this._navbar.querySelectorAll(
      '.js-navbar__dropdown-title_vertical',
    );

    this._handleButtonEntryClick = this._handleButtonEntryClick.bind(this);
    this._handleNavbarItemWithNameClick = this._handleNavbarItemWithNameClick.bind(
      this,
    );
    this._handleDropdownTitleClick = Navbar.handleDropdownTitleClick.bind(this);
  }

  _addEventListeners() {
    this._entryButton.addEventListener('click', this._handleButtonEntryClick);

    this._accountName.addEventListener(
      'click',
      this._handleNavbarItemWithNameClick,
    );

    this._dropdownItems.forEach((item) => {
      const modifyItem = item;
      modifyItem.addEventListener('click', this._handleDropdownTitleClick);
    });
  }

  _handleButtonEntryClick() {
    this._signIn();
  }

  _handleNavbarItemWithNameClick() {
    this._signIn();
  }

  static handleDropdownTitleClick(event) {
    const dropdownTitle = event.target.parentElement;

    dropdownTitle.nextElementSibling.classList.toggle(
      'navbar__hidden-list_opened',
    );
  }

  _signIn() {
    const entryButtons = document.querySelectorAll(
      '.js-navbar__button-entry-container',
    );
    const registrationButtons = document.querySelectorAll(
      '.js-navbar__button-registration-container',
    );
    const accountsNames = document.querySelectorAll(
      '.js-navbar__item_with-name',
    );
    const separators = document.querySelectorAll(
      '.js-navbar__item_with-separator',
    );

    if (this._entryButton.style.display === 'none') {
      entryButtons.forEach((item) => item.removeAttribute('style'));
      registrationButtons.forEach((item) => item.removeAttribute('style'));
      accountsNames.forEach((item) => item.removeAttribute('style'));
      separators.forEach((item) => item.removeAttribute('style'));
    } else {
      entryButtons.forEach((item) => (item.style.display = 'none'));
      registrationButtons.forEach((item) => (item.style.display = 'none'));
      accountsNames.forEach((item) => (item.style.display = 'flex'));
      accountsNames.forEach((item) => (item.style.paddingRight = 0));
      separators.forEach((item) => (item.style.display = 'flex'));
    }
  }
}

export default Navbar;
