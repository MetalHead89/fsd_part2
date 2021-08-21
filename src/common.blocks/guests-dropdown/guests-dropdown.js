class GuestsDropdown {
  constructor(guestsDropdown, countingMenu) {
    this.guestsDropdown = guestsDropdown;
    // this.dropdown = dropdown;
    this._countingMenu = countingMenu;

    this._countingMenu.subscribe(this._changeDropdownHeaderText.bind(this));
    // this.countingMenu.addClickButtonObserver(this.obsobs);
  }

  _changeDropdownHeaderText() {
    alert(this._countingMenu.getCounters());
  }

  // _changeDropdownHeaderText() {
  //   const quantityNumbers = this._dropdown.querySelectorAll(
  //     '.js-guests-dropdown__quantity-number'
  //   );

  //   const guests = {
  //     guests:
  //       parseInt(quantityNumbers[0].innerText, 10) +
  //       parseInt(quantityNumbers[1].innerText, 10),
  //     babies: parseInt(quantityNumbers[2].innerText, 10),
  //   };
  // }
}

export default GuestsDropdown;
