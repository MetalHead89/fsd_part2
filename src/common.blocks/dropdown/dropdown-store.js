const DropdownStore = {
  _dropdowns: [],

  addDropdown(dropdown) {
    this._dropdowns.push(dropdown);
  },

  getDropdownByElement(element) {
    return this._dropdowns.find(
      (dropdown) => dropdown.getDropdown() === element
    );
  },
};

export default DropdownStore;
