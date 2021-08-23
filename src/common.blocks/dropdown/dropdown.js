/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */

class Dropdown {
  constructor(dropdown) {
    this._dropdown = dropdown;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._clickOnClearButtonObervers = [];
    // this._dropdownClasses = [
    //   'js-dropdown',
    //   'js-date-dropdown',
    //   'js-filter-date-dropdown',
    //   'js-guests-dropdown',
    //   'js-comfort-dropdown'
    // ];
    this._allDropdownsChecksOnThePage = document.querySelectorAll(
      '.dropdown__check'
    );

    this._dropMenu = this._dropdown.querySelector('.js-dropdown__drop-menu');
    this._dropCheck = this._dropdown.querySelector('.js-dropdown__check');
    this._clearButton = this._dropdown.querySelector(
      '.js-dropdown__button-clear'
    );

    this._applyButton = this._dropdown.querySelector(
      '.js-dropdown__button-apply'
    );

    // this._calendarApplyButton = this._dropdown.querySelector(
    //   '.js-calendar__button-apply'
    // );

    this._dropdownHeaderText = this._dropdown.querySelector(
      '.js-dropdown__header-text'
    );
    this._placeholder = this._dropdownHeaderText.innerText;
    this._dropdownHeader = this._dropdown.querySelector('.js-dropdown__header');

    this._handleButtonClearClick = this._handleButtonClearClick.bind(this);
    this._handleButtonApplyClick = this._handleButtonApplyClick.bind(this);
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
    // this._handleBodyClick = Dropdown._handleBodyClick.bind(this);
  }

  getDropdown() {
    return this._dropdown;
  }

  subscribeToClickOnClearButton(func) {
    this._clickOnClearButtonObervers.push(func);
  }

  _addEventListeners() {
    if (this._clearButton) {
      this._clearButton.addEventListener('click', this._handleButtonClearClick);
    }

    if (this._applyButton) {
      this._applyButton.addEventListener('click', this._handleButtonApplyClick);
    }

    // if (this._calendarApplyButton) {
    //   this._calendarApplyButton.addEventListener(
    //     'click',
    //     this._handleButtonApplyClick
    //   );
    // }

    if (this._dropdownHeader) {
      this._dropdownHeader.addEventListener('click', this._handleHeaderClick);
    }

    // document.body.addEventListener('mouseup', this._handleBodyClick);
  }

  _handleButtonApplyClick() {
    this._closeDropMenu();
  }

  _handleHeaderClick() {
    this._closeOtherDropdowns();
    this._dropCheck.checked = !this._dropCheck.checked;
  }

  // _getAllDropdownsChecks() {
  //   // const dropdownsChecks = [];

  //   // this._dropdownClasses.forEach(() => {
  //   //   dropdownsChecks.push(...document.querySelectorAll('.dropdown__check'));
  //   // });

  //   return { ...document.querySelectorAll('.dropdown__check') };
  // }

  // static _handleBodyClick(evt) {
  //   if (this._clickIsOutsideDropdown(evt)) {
  //     this._closeAllDropdowns();
  //   }
  // }

  setHeaderText(text) {
    if (text) {
      this._dropdownHeaderText.innerText = text;
      this._clearButtonShow();
    } else {
      this._dropdownHeaderText.innerText = this._placeholder;
      this._clearButtonHide();
    }
  }

  _clearButtonShow() {
    this._clearButton.classList.remove('dropdown__button-clear_hidden');
  }

  _clearButtonHide() {
    this._clearButton.classList.add('dropdown__button-clear_hidden');
  }

  _closeDropMenu() {
    this._dropCheck.checked = false;
  }

  _handleButtonClearClick() {
    if (this._clickOnClearButtonObervers.length > 0) {
      this._clickOnClearButtonObervers.forEach((observer) => observer());
    }
  }

  // _handleButtonClearClick() {
  //   const quantityElements = this._dropdown.querySelectorAll(
  //     `.js-${this._type}__quantity-number`
  //   );
  //   this._clearButton.classList.add(`${this._type}__button-clear_hidden`);

  //   for (
  //     let quantityIndex = 0;
  //     quantityIndex < quantityElements.length;
  //     quantityIndex += 1
  //   ) {
  //     const quantity = quantityElements[quantityIndex];

  //     quantity.innerText = '0';
  //     quantity.previousElementSibling.disabled = true;
  //   }

  //   this._quantitySum = 0;
  //   this._changeDropdownHeaderText();
  // }

  _closeOtherDropdowns() {
    this._allDropdownsChecksOnThePage.forEach((dropdownCheck) => {
      if (dropdownCheck !== this._dropCheck) {
        dropdownCheck.checked = false;
      }
    });
  }

  _closeDropdown() {
    this._dropdown.querySelector('.dropdown__check').checked = false;
  }

  _closeAllDropdowns() {
    this._allDropdownsChecksOnThePage.forEach((dropdownCheck) => {
      dropdownCheck.checked = false;
    });
  }

  // _elementContainsDropdownClass(element) {
  //   return (
  //     element instanceof HTMLElement &&
  //     this._dropdownClasses.some((dropdownClass) =>
  //       element.classList.contains(dropdownClass)
  //     )
  //   );
  // }

  // _clickIsOutsideDropdown(evt) {
  //   return !evt.path.some((element) =>
  //     this._elementContainsDropdownClass(element)
  //   );
  // }
}

export default Dropdown;
