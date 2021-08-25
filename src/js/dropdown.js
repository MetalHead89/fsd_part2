class Dropdown {
  constructor(dropdown, dropdownHeader, dropMenu, countingMenu) {
    this._dropdown = dropdown;
    this._dropdownHeader = dropdownHeader;
    this._dropMenu = dropMenu;
    this._countingMenu = countingMenu;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._opened = false;
  }

  _addEventListeners() {
    this._dropdownHeader.addClickToHeaderListener(
      this._toggleDropdownState.bind(this)
    );
  }

  _toggleDropdownState() {
    this._opened = !this._opened;

    if (this._opened) {
      this._open();
    } else {
      this._close();
    }
  }

  _open() {
    this._dropMenu.openDropMenu();
    this._dropdownHeader.activate();
  }

  _close() {
    this._dropMenu.closeDropMenu();
    this._dropdownHeader.disactivate();
  }
}

export default Dropdown;
