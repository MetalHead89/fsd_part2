/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

class Navbar {
  constructor(navbar) {
    this.navbar = navbar;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.entryButton = this.navbar.querySelector(
      '.js-navbar__button-entry-container',
    );
    this.accountName = this.navbar.querySelector('.js-navbar__item_with-name');
    this.dropdownItems = this.navbar.querySelectorAll(
      '.js-navbar__dropdown-title_vertical',
    );
    this.dropdownItems.forEach((item) => {
      item.nextElementSibling.classList.toggle(
        'navbar__hidden-list_vertical-closed',
      );
    });
  }

  addEventListeners() {
    this.entryButton.addEventListener(
      'click',
      this.handleButtonEntryClick.bind(this),
    );

    this.accountName.addEventListener(
      'click',
      this.handleNavbarItemWithNameClick.bind(this),
    );

    this.dropdownItems.forEach((item) => {
      const modifyItem = item;
      modifyItem.addEventListener('click', this.handleDropdownTitleClick);
    });
  }

  handleButtonEntryClick() {
    this.signIn();
  }

  handleNavbarItemWithNameClick() {
    this.signIn();
  }

  handleDropdownTitleClick() {
    this.nextElementSibling.classList.toggle(
      'navbar__hidden-list_vertical-opened',
    );
    this.nextElementSibling.classList.toggle(
      'navbar__hidden-list_vertical-closed',
    );
  }

  signIn() {
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

    if (this.entryButton.style.display === 'none') {
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
