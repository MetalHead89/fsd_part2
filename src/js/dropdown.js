class Dropdown {
  constructor(dropdown, dropdownHeader, dropMenu, countingMenu) {
    this._dropdown = dropdown;
    this._dropdownHeader = dropdownHeader;
    this._dropMenu = dropMenu;
    this._countingMenu = countingMenu;

    this._addEventListeners();
  }

  _addEventListeners() {
    this._dropdownHeader.addClickToHeaderListener(
      this._toggleDropMenuState.bind(this)
    );
  }

  _toggleDropMenuState() {
    this._dropMenu.toggleDropMenuState();
  }
}

export default Dropdown;
