class GuestsDropdown {
  constructor(guestsDropdown, dropdown, countingMenu) {
    this.guestsDropdown = guestsDropdown;
    this.dropdown = dropdown;
    this.countingMenu = countingMenu;

    // this.countingMenu.addClickButtonObserver(this.obsobs);
  }

  obsobs() {
    alert('!!!!!');
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
