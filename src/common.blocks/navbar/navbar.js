class Navbar {
  constructor(navbar) {
    this.navbar = navbar;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.isEntryCheck = false;
    this.entryButtons = this.navbar.querySelectorAll(
      '.js-navbar__button-entry-container',
    );
    this.registrationButtons = this.navbar.querySelectorAll(
      '.js-navbar__button-registration-container',
    );
    this.accountNames = this.navbar.querySelectorAll(
      '.js-navbar__item_with-name',
    );
    this.separators = this.navbar.querySelectorAll(
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
    for (let button = 0; button < this.entryButtons.length; button += 1) {
      this.entryButtons[button].addEventListener(
        'click',
        this.handleButtonEntryClick.bind(this),
      );
    }

    for (let name = 0; name < this.accountNames.length; name += 1) {
      this.accountNames[name].addEventListener(
        'click',
        this.handleNavbarItemWithNameClick.bind(this),
      );
    }

    for (let item = 0; item < this.dropdownItems.length; item += 1) {
      this.dropdownItems[item].addEventListener(
        'click',
        this.handleDropdownTitleClick,
      );
    }
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
      for (let button = 0; button < this.entryButtons.length; button += 1) {
        this.entryButtons[button].removeAttribute('style');
      }
      for (
        let button = 0;
        button < this.registrationButtons.length;
        button += 1
      ) {
        this.registrationButtons[button].removeAttribute('style');
      }
      for (let name = 0; name < this.accountNames.length; name += 1) {
        this.accountNames[name].removeAttribute('style');
      }
      for (
        let separator = 0;
        separator < this.separators.length;
        separator += 1
      ) {
        this.separators[separator].removeAttribute('style');
      }
      this.isEntryCheck = false;
    } else {
      for (let button = 0; button < this.entryButtons.length; button += 1) {
        this.entryButtons[button].style.display = 'none';
      }
      for (
        let button = 0;
        button < this.registrationButtons.length;
        button += 1
      ) {
        this.registrationButtons[button].style.display = 'none';
      }
      for (let name = 0; name < this.accountNames.length; name += 1) {
        this.accountNames[name].style.display = 'flex';
        this.accountNames[name].style.paddingRight = 0;
      }
      for (
        let separator = 0;
        separator < this.separators.length;
        separator += 1
      ) {
        this.separators[separator].style.display = 'flex';
      }
      this.isEntryCheck = true;
    }
  }
}

export default Navbar;
