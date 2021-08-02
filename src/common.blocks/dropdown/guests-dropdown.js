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
    let headerText = '';

    const guests = {
      guests:
        parseInt(quantityNumbers[0].innerText, 10) +
        parseInt(quantityNumbers[1].innerText, 10),
      babies: parseInt(quantityNumbers[2].innerText, 10),
    };

    Object.keys(guests).forEach((key) => {
      if (guests[key] > 0) {
        if (headerText !== '') {
          headerText += ', ';
        }
        headerText += `${guests[key]} ${QuantityDropdown.dropdownWordGenerator(
          this._headerWords[key],
          guests[key]
        )}`;
      }
    });

    if (headerText === '') {
      headerText = 'Сколько гостей';
    }

    this._setHeaderText(headerText);
  }
}

export default GuestsDropdown;
