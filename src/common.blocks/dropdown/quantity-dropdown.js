import Dropdown from './dropdown';

class QuantityDropdown extends Dropdown {
  constructor(dropdown, type) {
    super(dropdown, type);

    this._quantitySum = 0;
    this._handleQuantityButtonClick = this._handleQuantityButtonClick.bind(
      this
    );

    const dropdownQuantityButtons = this._dropdown.querySelectorAll(
      '.js-dropdown__quantity-button'
    );

    dropdownQuantityButtons.forEach((item) => {
      item.addEventListener('click', this._handleQuantityButtonClick);
    });
  }

  _increaseQuantitySum() {
    this._quantitySum += 1;
  }

  _decreaseQuantitySum() {
    this._quantitySum -= 1;
  }

  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }

  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }
  
  static dropdownWordGenerator(words, number) {
    const number10 = number % 10;
    const number100 = number % 100;
    let generatedWord = '';

    if (number10 === 1 && number100 !== 11) {
      return words[0];
    } else if (QuantityDropdown.numberIsTwoThreeOrFour(number10, number100)) {
      return words[1];
    }

    return words[2];
  }

  _handleQuantityButtonClick(event) {
    let quantityElement = null;

    if (event.target.classList.contains('dropdown__quantity-button_add')) {
      quantityElement = event.target.previousElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) + 1;
      this._increaseQuantitySum();
    } else {
      quantityElement = event.target.nextElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) - 1;
      this._decreaseQuantitySum();
    }

    this._onOffQuantityButton.bind(quantityElement)();
    if (this._dropdownType === 'guests') {
      this._onOffClearButton();
    }
    this._changeDropdownHeaderText();
  }

  _onOffQuantityButton() {
    if (parseInt(this.innerText, 10) > 0) {
      this.previousElementSibling.disabled = false;
    } else {
      this.previousElementSibling.disabled = true;
    }
  }

  _onOffClearButton() {
    if (this._quantitySum > 0) {
      this._clearButtonShow();
    } else {
      this._clearButtonHide();
    }
  }
}

export default QuantityDropdown;
