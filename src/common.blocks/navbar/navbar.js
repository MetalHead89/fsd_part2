class Navbar {
  constructor(navbar) {
    this.navbar = navbar;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.isEntryCheck = false;
    this.entryButton = this.navbar.querySelector(
      '.js-navbar__button-entry-container',
    );
    this.registrationButton = this.navbar.querySelector(
      '.js-navbar__button-registration-container',
    );
    this.accountName = this.navbar.querySelector('.js-navbar__item_with-name');
    this.separator = this.navbar.querySelector(
      '.js-navbar__item_with-separator',
    );
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
    if (this.isEntryCheck) {
      this.entryButton.removeAttribute('style');
      this.registrationButton.removeAttribute('style');
      this.accountName.removeAttribute('style');
      this.separator.removeAttribute('style');
      this.isEntryCheck = false;
    } else {
      this.entryButton.style.display = 'none';
      this.registrationButton.style.display = 'none';
      this.accountName.style.display = 'flex';
      this.accountName.style.paddingRight = 0;
      this.separator.style.display = 'flex';
      this.isEntryCheck = true;
    }
  }
}

export default Navbar;
