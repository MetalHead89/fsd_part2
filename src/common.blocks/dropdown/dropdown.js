/* eslint-disable comma-dangle */

class Dropdown {
  constructor(dropdown) {
    this._dropdown = dropdown;

    this._dropdownInit();
    this._addEventListeners();
  }

  _dropdownInit() {
    this._quantitySum = 0;
    this._dropdownType = Dropdown.getDropdownType(this._dropdown);
    this._dropMenu = this._dropdown.querySelector('.js-dropdown__drop-menu');
    this._dropCheck = this._dropdown.querySelector('.js-dropdown__check');

    const clearButtonWrapper = this._dropdown.querySelector(
      '.js-dropdown__button-clear'
    );
    if (clearButtonWrapper !== null) {
      [this._clearButton] = clearButtonWrapper.children;
      this._clearButton.style.display = 'none';
    }

    const applyButtonWrapper = this._dropdown.querySelector(
      '.js-dropdown__button-apply'
    );
    if (applyButtonWrapper !== null) {
      [this._applyButton] = applyButtonWrapper.children;
    }

    const calendarApplyButtonWrapper = this._dropdown.querySelector(
      '.js-calendar__button-apply'
    );
    if (calendarApplyButtonWrapper !== null) {
      [this._calendarApplyButton] = calendarApplyButtonWrapper.children;
    }

    this._dropdownHeaderText = this._dropdown.querySelector(
      '.js-dropdown__header-text'
    );
    this._dropdownHeader = this._dropdown.querySelector('.js-dropdown__header');
    if (this._dropdownType === 'date') {
      this._dropdownStartDay = this._dropdown
        .querySelector('.js-dropdown__start-date-input')
        .querySelector('.js-text-field__field');
      this._dropdownEndDay = this._dropdown
        .querySelector('.js-dropdown__end-date-input')
        .querySelector('.js-text-field__field');
    }

    this._handleButtonClearClick = this._handleButtonClearClick.bind(this);
    this._handleButtonApplyClick = this._handleButtonApplyClick.bind(this);
    this._handleQuantityButtonClick = this._handleQuantityButtonClick.bind(
      this
    );
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
    this._handleStartDateInputOnfocus = this._handleStartDateInputOnfocus.bind(
      this
    );
    this._handleEndDateInputOnfocus = this._handleEndDateInputOnfocus.bind(
      this
    );
  }

  _addEventListeners() {
    if (this._dropdownType === 'guests') {
      this._clearButton.addEventListener('click', this._handleButtonClearClick);
    }

    if (this._applyButton) {
      this._applyButton.addEventListener('click', this._handleButtonApplyClick);
    }

    if (this._calendarApplyButton) {
      this._calendarApplyButton.addEventListener(
        'click',
        this._handleButtonApplyClick
      );
    }

    if (this._dropdownType === 'guests' || this._dropdownType === 'comfort') {
      const dropdownQuantityButtons = this._dropdown.querySelectorAll(
        '.js-dropdown__quantity-button'
      );

      dropdownQuantityButtons.forEach((item) => {
        const button = item;
        button.addEventListener('click', this._handleQuantityButtonClick);
      });
    }

    if (this._dropdownHeader !== null) {
      this._dropdownHeader.addEventListener('click', this._handleHeaderClick);
    }

    if (this._dropdownType === 'date') {
      this._dropdownStartDay.addEventListener(
        'focus',
        this._handleStartDateInputOnfocus
      );
      this._dropdownEndDay.addEventListener(
        'focus',
        this._handleEndDateInputOnfocus
      );
    }
  }

  _handleButtonApplyClick() {
    this._closeDropMenu();
  }

  _handleHeaderClick() {
    this._closeOtherDropdowns();
    this._dropCheck.checked = !this._dropCheck.checked;
  }

  _handleStartDateInputOnfocus() {
    this._OpenDateDropdown();
  }

  _handleEndDateInputOnfocus() {
    this._OpenDateDropdown();
  }

  static getDropdownType(dropdown) {
    let type;

    if (dropdown.classList.contains('dropdown_guests')) {
      type = 'guests';
    } else if (dropdown.classList.contains('dropdown_comfort')) {
      type = 'comfort';
    } else if (dropdown.classList.contains('dropdown_date')) {
      type = 'date';
    } else if (dropdown.classList.contains('dropdown_filter-date')) {
      type = 'filterDate';
    }

    return type;
  }

  _setHeaderText(text) {
    this._dropdownHeaderText.innerText = text;
  }

  _increaseQuantitySum() {
    this._quantitySum += 1;
  }

  _decreaseQuantitySum() {
    this._quantitySum -= 1;
  }

  _clearButtonShow() {
    this._clearButton.style.display = 'inline-block';
  }

  _clearButtonHide() {
    this._clearButton.style.display = 'none';
  }

  _closeDropMenu() {
    this._dropCheck.checked = false;
    this._closeTimer = null;
  }

  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }

  /**
   * Склоняет слова
   */
  static dropdownWordGenerator(word, number) {
    const number10 = number % 10;
    const number100 = number % 100;
    let generatedWord = '';

    if (number10 === 1 && number100 !== 11) {
      if (word === 'guests') {
        generatedWord = 'гость';
      } else if (word === 'babies') {
        generatedWord = 'младенец';
      } else if (word === 'bedroomsCount') {
        generatedWord = 'спальня';
      } else if (word === 'bedsCount') {
        generatedWord = 'кровать';
      } else if (word === 'bathroomsCount') {
        generatedWord = 'ванная комната';
      }
    } else if (Dropdown.numberIsTwoThreeOrFour(number10, number100)) {
      if (word === 'guests') {
        generatedWord = 'гостя';
      } else if (word === 'babies') {
        generatedWord = 'младенца';
      } else if (word === 'bedroomsCount') {
        generatedWord = 'спальни';
      } else if (word === 'bedsCount') {
        generatedWord = 'кровати';
      } else if (word === 'bathroomsCount') {
        generatedWord = 'ванные комнаты';
      }
    } else if (word === 'guests') {
      generatedWord = 'гостей';
    } else if (word === 'babies') {
      generatedWord = 'младенцев';
    } else if (word === 'bedroomsCount') {
      generatedWord = 'спален';
    } else if (word === 'bedsCount') {
      generatedWord = 'кроватей';
    } else if (word === 'bathroomsCount') {
      generatedWord = 'ванных комнат';
    }

    return generatedWord;
  }

  _changeDropdownHeaderText() {
    /**
     * Изменяет текст хедера dropdown элемента
     */

    const quantityNumbers = this._dropdown.querySelectorAll(
      '.js-dropdown__quantity-number'
    );
    let headerText = '';

    if (this._dropdownType === 'guests') {
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
          headerText += `${guests[key]} ${Dropdown.dropdownWordGenerator(
            key,
            guests[key]
          )}`;
        }
      });

      if (headerText === '') {
        headerText = 'Сколько гостей';
      }
    } else if (this._dropdownType === 'comfort') {
      const comfort = {
        bedroomsCount: parseInt(quantityNumbers[0].innerText, 10),
        bedsCount: parseInt(quantityNumbers[1].innerText, 10),
        bathroomsCount: parseInt(quantityNumbers[2].innerText, 10),
      };

      Object.keys(comfort).forEach((key) => {
        if (comfort[key] > 0) {
          if (headerText !== '') {
            headerText += ', ';
          }
          headerText += `${comfort[key]} ${Dropdown.dropdownWordGenerator(
            key,
            comfort[key]
          )}`;
        }
      });

      if (headerText === '') {
        headerText = 'Выберите удобства';
      }
    }
    this._setHeaderText(headerText);
  }

  _handleButtonClearClick() {
    /**
     * Сбрасывает все значения dropdown на дефолтные
     */

    const quantityElements = this._dropdown.querySelectorAll(
      '.js-dropdown__quantity-number'
    );
    this._clearButton.style.display = 'none';

    for (
      let quantityIndex = 0;
      quantityIndex < quantityElements.length;
      quantityIndex += 1
    ) {
      const quantity = quantityElements[quantityIndex];

      quantity.innerText = '0';
      quantity.previousElementSibling.disabled = true;
    }

    this._quantitySum = 0;
    this._changeDropdownHeaderText();
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

  _closeOtherDropdowns() {
    if (this._dropCheck.checked === false) {
      const dropdowns = document.querySelectorAll('.js-dropdown');

      dropdowns.forEach((item) => {
        const dropdown = item;
        if (dropdown !== this) {
          dropdown.querySelector('.js-dropdown__check').checked = false;
        }
      });
    }
  }

  _closeDropdown() {
    this._dropdown.querySelector('.js-dropdown__check').checked = false;
  }

  _OpenDateDropdown() {
    this._closeOtherDropdowns();
    this._dropCheck.checked = true;
  }
}

export default Dropdown;
