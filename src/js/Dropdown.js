class Dropdown {
  constructor({
    dropdown,
    dropdownHeader,
    dropMenu,
    countingMenu,
    calendar,
  } = {}) {
    this._dropdown = dropdown;
    this._dropdownHeader = dropdownHeader;
    this._dropMenu = dropMenu;
    this._countingMenu = countingMenu;
    this._calendar = calendar;

    this._init();
    this._addEventListeners();
  }

  static handleBodyClick(evt) {
    if (Dropdown.clickIsOutsideDropdown(evt)) {
      Dropdown.closeAllDropdowns();
    }
  }

  static clickIsOutsideDropdown(evt) {
    return !Dropdown.dropdownsOnThePage.some(
      (dropdown) => evt.path.indexOf(dropdown.getDropdown()) >= 0
    );
  }

  static closeAllDropdowns() {
    Dropdown.dropdownsOnThePage.forEach((dropdown) => dropdown.close());
  }

  _init() {
    if (Dropdown.dropdownsOnThePage === undefined) {
      Dropdown.dropdownsOnThePage = [];
    }
    Dropdown.dropdownsOnThePage.push(this);

    this._opened = false;

    this._handleBodyClick = Dropdown.handleBodyClick.bind(this);
  }

  _addEventListeners() {
    this._dropdownHeader.addClickToHeaderListener(
      this._toggleDropdownState.bind(this)
    );
    document.body.addEventListener('mouseup', this._handleBodyClick);
  }

  _toggleDropdownState() {
    if (this._opened) {
      this.close();
    } else {
      this._open();
    }
  }

  _open() {
    this._opened = true;
    this._dropMenu.openDropMenu();
    if (this._dropdownHeader) {
      this._dropdownHeader.activate();
    }

    this._closeOtherDropdowns();
  }

  _closeOtherDropdowns() {
    Dropdown.dropdownsOnThePage.forEach((dropdown) => {
      if (dropdown !== this) {
        dropdown.close();
      }
    });
  }

  _changeHeader(text) {
    this._dropdownHeader.setText(text);
  }

  getDropdown() {
    return this._dropdown;
  }

  close() {
    this._opened = false;
    this._dropMenu.closeDropMenu();
    if (this._dropdownHeader) {
      this._dropdownHeader.disactivate();
    }
  }
}

export default Dropdown;
