/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */

class Dropdown {
  constructor(dropdown, type) {
    this._dropdown = dropdown;
    this._type = type;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._dropdownClasses = ['.js-dropdown', '.js-date-dropdown'];
    this._allDropdownsChecksOnThePage = this._getAllDropdownsChecks();

    this._dropMenu = this._dropdown.querySelector(
      `.js-${this._type}__drop-menu`
    );
    this._dropCheck = this._dropdown.querySelector(`.js-${this._type}__check`);
    this._clearButton = this._dropdown.querySelector(
      `.js-${this._type}__button-clear`
    );

    this._applyButton = this._dropdown.querySelector(
      `.js-${this._type}__button-apply`
    );

    this._calendarApplyButton = this._dropdown.querySelector(
      '.js-calendar__button-apply'
    );

    this._dropdownHeaderText = this._dropdown.querySelector(
      `.js-${this._type}__header-text`
    );
    this._dropdownHeader = this._dropdown.querySelector(
      `.js-${this._type}__header`
    );

    this._handleButtonClearClick = this._handleButtonClearClick.bind(this);
    this._handleButtonApplyClick = this._handleButtonApplyClick.bind(this);
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
    this._handleBodyClick = Dropdown._handleBodyClick.bind(this);
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

    document.body.addEventListener('mouseup', this._handleBodyClick);
  }

  _handleButtonApplyClick() {
    this._closeDropMenu();
  }

  _handleHeaderClick() {
    this._closeOtherDropdowns();
    this._dropCheck.checked = !this._dropCheck.checked;
  }

  _getAllDropdownsChecks() {
    const dropdownsChecks = [];

    this._dropdownClasses.forEach((dropdownClass) => {
      dropdownsChecks.push(
        ...document.querySelectorAll(`${dropdownClass}__check`)
      );
    });

    return dropdownsChecks;
  }

  static _handleBodyClick(evt) {
    if (Dropdown._clickIsOutsideDropdown(evt)) {
      this._closeAllDropdowns();
    }
  }

  _setHeaderText(text) {
    this._dropdownHeaderText.innerText = text;
  }

  _clearButtonShow() {
    this._clearButton.classList.remove(
      `.js-${this._type}__button-clear_hidden`
    );
  }

  _clearButtonHide() {
    this._clearButton.classList.add(`.js-${this._type}__button-clear_hidden`);
  }

  _closeDropMenu() {
    this._dropCheck.checked = false;
    this._closeTimer = null;
  }

  _handleButtonClearClick() {
    const quantityElements = this._dropdown.querySelectorAll(
      `.js-${this._type}__quantity-number`
    );
    this._clearButton.classList.add(`.js-${this._type}__button-clear_hidden`);

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
    this._allDropdownsChecksOnThePage.forEach((dropdownCheck) => {
      if (dropdownCheck !== this._dropCheck) {
        dropdownCheck.checked = false;
      }
    });
  }

  _closeDropdown() {
    this._dropdown.querySelector(`.js-${this._type}__check`).checked = false;
  }

  _closeAllDropdowns() {
    this._allDropdownsChecksOnThePage.forEach((dropdownCheck) => {
      dropdownCheck.checked = false;
    });
  }

  static _clickIsOutsideDropdown(evt) {
    ///////////////
    console.dir(evt);
    evt.path.forEach((element) => {
      if (
        element instanceof HTMLElement &&
        this._dropdownClasses.some((dropdownClass) =>
          element.classList.contains(dropdownClass)
        )
      ) {
        console.log('!!!!');
      }

      // if (element instanceof HTMLElement) {
      //   console.log('!!!!');
      // }
    });
    return (
      (!evt.target.classList.contains('dropdown__header') &&
        !evt.target.classList.contains('dropdown__drop-menu') &&
        !evt.target.classList.contains('text-field__field') &&
        evt.target.offsetParent &&
        !evt.target.offsetParent.classList.contains('dropdown__drop-menu')) ||
      !evt.target.offsetParent
    );
  }
}

export default Dropdown;
