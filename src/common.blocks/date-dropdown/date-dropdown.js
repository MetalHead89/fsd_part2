/* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class DateDropdown extends Dropdown {
  _init() {
    const dateFields = this._dropdown.querySelectorAll('.js-text-field__field');
    [this._startDate, this._endDate] = dateFields;

    this._handleStartDateFocus = this._handleStartDateFocus.bind(this);
    this._handleEndDateFocus = this._handleEndDateFocus.bind(this);

    super._init();
  }

  _addEventListeners() {
    this._startDate.addEventListener('focus', this._handleStartDateFocus);
    this._endDate.addEventListener('focus', this._handleEndDateFocus);
  }

  _handleStartDateFocus() {
    this._open();
  }

  _handleEndDateFocus() {
    this._open();
  }
}
export default DateDropdown;
