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
      this._toggleDropMenuState.bind(this)
    );
  }

  _toggleDropMenuState() {
    this._opened = !this._opened;

    if (this._opened) {
      this._dropMenu.openDropMenu();
      this._dropdownHeader.activate();
    } else {
      this._dropMenu.closeDropMenu();
      this._dropdownHeader.disactivate();
    }
  }
}

export default Dropdown;
