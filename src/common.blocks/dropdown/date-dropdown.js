import Dropdown from './dropdown';

class DateDropdown extends Dropdown {
  constructor(dropdown) {
    super(dropdown, 'date');
  }

  _init() {
    super._init();

    this._handleStartDateInputOnfocus = this._handleStartDateInputOnfocus.bind(
      this
    );
    this._handleEndDateInputOnfocus = this._handleEndDateInputOnfocus.bind(
      this
    );

    this._dropdownStartDay = this._dropdown
      .querySelector('.js-dropdown__start-date-input')
      .querySelector('.js-text-field__field');
    this._dropdownEndDay = this._dropdown
      .querySelector('.js-dropdown__end-date-input')
      .querySelector('.js-text-field__field');
  }

  _addEventListeners() {
    super._addEventListeners();

    this._dropdownStartDay.addEventListener(
      'focus',
      this._handleStartDateInputOnfocus
    );
    this._dropdownEndDay.addEventListener(
      'focus',
      this._handleEndDateInputOnfocus
    );
  }

  _handleStartDateInputOnfocus() {
    this._OpenDateDropdown();
  }

  _handleEndDateInputOnfocus() {
    this._OpenDateDropdown();
  }

  _OpenDateDropdown() {
    this._closeOtherDropdowns();
    this._dropCheck.checked = true;
  }
}

export default DateDropdown;
