/* eslint-disable comma-dangle */

class FilterDateDropdown {
  constructor(filterDateDropdown, dropdown) {
    this._filterDateDropdown = filterDateDropdown;
    this._dropdown = dropdown;

    this._dropdown.subscribeToClickOnClearButton(this._clear.bind(this));
  }

  _changeDropdownHeaderText() {
    const headerText = 'eeeeee';
    this._dropdown.setHeaderText(headerText);
  }

  _clear() {
    this._changeDropdownHeaderText();
  }
}

export default FilterDateDropdown;
