class GuestsDropdown {
  constructor(guestsDropdown, dropdown, countingMenu) {
    this._guestsDropdown = guestsDropdown;
    this._dropdown = dropdown;
    this._countingMenu = countingMenu;

    this._countingMenu.subscribe(this._changeDropdownHeaderText.bind(this));
    this._dropdown.subscribeToClickOnClearButton(this._clear.bind(this));
    // this.countingMenu.addClickButtonObserver(this.obsobs);
  }

  _changeDropdownHeaderText() {
    // alert(this._countingMenu.getCounters());
  }

  _clear() {
    alert('qqqqq');
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
