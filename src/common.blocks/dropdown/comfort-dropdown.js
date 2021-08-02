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
    let headerText = '';

    const comfort = {
      bedrooms: parseInt(quantityNumbers[0].innerText, 10),
      beds: parseInt(quantityNumbers[1].innerText, 10),
      bathrooms: parseInt(quantityNumbers[2].innerText, 10),
    };

    Object.keys(comfort).forEach((key) => {
      if (comfort[key] > 0) {
        if (headerText !== '') {
          headerText += ', ';
        }
        headerText += `${comfort[key]} ${QuantityDropdown.dropdownWordGenerator(
          this._headerWords[key],
          comfort[key]
        )}`;
      }
    });

    if (headerText === '') {
      headerText = 'Выберите удобства';
    }

    this._setHeaderText(headerText);
  }
}

export default ComfortDropdown;
