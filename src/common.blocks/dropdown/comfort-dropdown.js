/* eslint-disable comma-dangle */

import QuantityDropdown from './quantity-dropdown';

class ComfortDropdown extends QuantityDropdown {
  constructor(dropdown) {
    super(dropdown, 'comfort');

    this._headerWords = {
      bedrooms: ['спальня', 'спальни', 'спален'],
      beds: ['кровать', 'кровати', 'кроватей'],
      bathrooms: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    };
  }

  _changeDropdownHeaderText() {
    const quantityNumbers = this._dropdown.querySelectorAll(
      '.js-dropdown__quantity-number'
    );

    const comfort = {
      bedrooms: parseInt(quantityNumbers[0].innerText, 10),
      beds: parseInt(quantityNumbers[1].innerText, 10),
      bathrooms: parseInt(quantityNumbers[2].innerText, 10),
    };

    super._changeDropdownHeaderText(comfort, 'Выберите удобства');
  }
}

export default ComfortDropdown;
