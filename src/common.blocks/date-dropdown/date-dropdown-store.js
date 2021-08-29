const DateDropdownStore = {
  _dateDropdowns: [],

  addDateDropdown(dropdown) {
    this._dateDropdowns.push(dropdown);
  },

  getDateDropdownByElement(element) {
    return this._dateDropdowns.find(
      (dropdown) => dropdown.getDropdown() === element
    );
  },
};

export default DateDropdownStore;
