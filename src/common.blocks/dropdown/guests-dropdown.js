/* eslint-disable comma-dangle */

import QuantityDropdown from './quantity-dropdown';

class GuestsDropdown extends QuantityDropdown {
  constructor(dropdown) {
    super(dropdown, 'guests');

    this._headerWords = {
      guests: ['гость', 'гостя', 'гостей'],
      babies: ['младенец', 'младенца', 'младенцев'],
    };
  }

  _changeDropdownHeaderText() {
    const quantityNumbers = this._dropdown.querySelectorAll(
      '.js-dropdown__quantity-number'
    );

    const guests = {
      guests:
        parseInt(quantityNumbers[0].innerText, 10) +
        parseInt(quantityNumbers[1].innerText, 10),
      babies: parseInt(quantityNumbers[2].innerText, 10),
    };

    super._changeDropdownHeaderText(guests, 'Сколько гостей');
  }
}

export default GuestsDropdown;
