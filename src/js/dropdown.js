class Dropdown {
  constructor(dropdown, dropdownHeader, dropMenu, countingMenu) {
    this._dropdown = dropdown;
    this._dropdownHeader = dropdownHeader;
    this._dropMenu = dropMenu;
    this._countingMenu = countingMenu;

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
      (dropdown) => evt.path.indexOf(dropdown._dropdown) >= 0
    );
  }

  static closeAllDropdowns() {
    Dropdown.dropdownsOnThePage.forEach((dropdown) => dropdown._close());
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
      this._close();
    } else {
      this._open();
    }
  }

  _open() {
    this._opened = true;
    this._dropMenu.openDropMenu();
    this._dropdownHeader.activate();
  }

  _close() {
    this._opened = false;
    this._dropMenu.closeDropMenu();
    this._dropdownHeader.disactivate();
  }
}

export default Dropdown;
