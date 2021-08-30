/* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class DateDropdown extends Dropdown {
  addClickToApplyButtonListener(callback) {
    this._clickToApplyButtonListeners.push(callback);
  }

  getDataFieldsValues() {
    return { startDate: this._startDate.value, endDate: this._endDate.value };
  }

  _init() {
    [this._startDate, this._endDate] = this._dropdown.querySelectorAll(
      '.js-text-field__field'
    );
    this._clickToApplyButtonListeners = [];

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

    this._calendar.addObserver(this._update.bind(this));
    this._calendar.addClickToApplyButtonListener(
      this._handleApplyButtonClick.bind(this)
    );
  }

  _handleApplyButtonClick() {
    this._clickToApplyButtonListeners.forEach((listener) => listener());
    this.close();
  }

  _update() {
    const dates = this._calendar.getStringDatesRange();
    this._changeDateInputs(dates);
  }

  _handleStartDateFocus() {
    this._open();
  }

  _handleEndDateFocus() {
    this._open();
  }

  _handleStartDateBlur() {
    this._updateCalendarData();
  }

  _handleEndDateBlur() {
    this._updateCalendarData();
  }

  _updateCalendarData() {
    const result = this._calendar.enterDates(
      this._startDate.value,
      this._endDate.value
    );

    this._changeDateInputs(result);
  }

  _changeDateInputs(dates) {
    if (!dates) {
      this._update();
    } else if (dates.length === 1) {
      [this._startDate.value] = dates;
      this._endDate.value = '';
    } else if (dates.length === 2) {
      [this._startDate.value, this._endDate.value] = dates;
    } else {
      this._startDate.value = '';
      this._endDate.value = '';
    }
  }
}
export default DateDropdown;
