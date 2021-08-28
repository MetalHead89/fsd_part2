/* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class DateDropdown extends Dropdown {
  _init() {
    const dateFields = this._dropdown.querySelectorAll('.js-text-field__field');
    [this._startDate, this._endDate] = dateFields;

    this._handleStartDateFocus = this._handleStartDateFocus.bind(this);
    this._handleEndDateFocus = this._handleEndDateFocus.bind(this);
    this._handleStartDateBlur = this._handleStartDateBlur.bind(this);
    this._handleEndDateBlur = this._handleEndDateBlur.bind(this);

    super._init();
  }

  _addEventListeners() {
    this._startDate.addEventListener('focus', this._handleStartDateFocus);
    this._endDate.addEventListener('focus', this._handleEndDateFocus);
    this._startDate.addEventListener('blur', this._handleStartDateBlur);
    this._endDate.addEventListener('blur', this._handleEndDateBlur);
  }

  _handleStartDateFocus() {
    this._open();
  }

  _handleEndDateFocus() {
    this._open();
  }

  _handleStartDateBlur() {
    if (!this._updateCalendarData()) {
      this._startDate.value = '';
    }
    // this._startDate.value = result ? result[0] : '';
    // this._startInput.dispatchEvent(new Event('change'));
  }

  _handleEndDateBlur() {
    if (!this._updateCalendarData()) {
      this._endDate.value = '';
    }
  }

  _updateCalendarData() {
    let success = true;
    const result = this._calendar.enterDates(
      this._startDate.value,
      this._endDate.value
    );

    if (!result) {
      success = false;
    } else if (result.length === 1) {
      [this._startDate.value] = result;
      this._endDate.value = '';
    } else if (result.length === 2) {
      [this._startDate.value, this._endDate.value] = result;
    } else {
      this._startDate.value = '';
      this._endDate.value = '';
    }

    return success;
  }
}
export default DateDropdown;
