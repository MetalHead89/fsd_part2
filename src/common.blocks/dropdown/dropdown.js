/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */

class Dropdown {
  constructor(dropdown, type) {
    this._dropdown = dropdown;
    this._dropdownType = type;

    this._dropdownInit();
    this._addEventListeners();
  }

  _dropdownInit() {
    this._dropMenu = this._dropdown.querySelector('.js-dropdown__drop-menu');
    this._dropCheck = this._dropdown.querySelector('.js-dropdown__check');

    this._clearButton = this._dropdown.querySelector(
      '.js-dropdown__button-clear'
    );

    this._applyButton = this._dropdown.querySelector(
      '.js-dropdown__button-apply'
    );

    this._calendarApplyButton = this._dropdown.querySelector(
      '.js-calendar__button-apply'
    );

    this._dropdownHeaderText = this._dropdown.querySelector(
      '.js-dropdown__header-text'
    );
    this._dropdownHeader = this._dropdown.querySelector('.js-dropdown__header');

    this._handleButtonClearClick = this._handleButtonClearClick.bind(this);
    this._handleButtonApplyClick = this._handleButtonApplyClick.bind(this);
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
  }

  _addEventListeners() {
    if (this._clearButton) {
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

    if (this._dropdownHeader) {
      this._dropdownHeader.addEventListener('click', this._handleHeaderClick);
    }
  }

  _handleButtonApplyClick() {
    this._closeDropMenu();
  }

  _handleHeaderClick() {
    this._closeOtherDropdowns();
    this._dropCheck.checked = !this._dropCheck.checked;
  }

  _setHeaderText(text) {
    this._dropdownHeaderText.innerText = text;
  }

  _clearButtonShow() {
    this._clearButton.classList.remove('dropdown__button-clear_hidden');
  }

  _clearButtonHide() {
    this._clearButton.classList.add('dropdown__button-clear_hidden');
  }

  _closeDropMenu() {
    this._dropCheck.checked = false;
    this._closeTimer = null;
  }

  _handleButtonClearClick() {
    const quantityElements = this._dropdown.querySelectorAll(
      '.js-dropdown__quantity-number'
    );
    this._clearButton.classList.add('dropdown__button-clear_hidden');

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

  _closeOtherDropdowns() {
    if (this._dropCheck.checked === false) {
      const dropdowns = document.querySelectorAll('.js-dropdown');

      dropdowns.forEach((item) => {
        if (item !== this) {
          item.querySelector('.js-dropdown__check').checked = false;
        }
      });
    }
  }

  _closeDropdown() {
    this._dropdown.querySelector('.js-dropdown__check').checked = false;
  }
}

export default Dropdown;
