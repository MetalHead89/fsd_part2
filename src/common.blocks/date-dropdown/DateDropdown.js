/* eslint-disable comma-dangle */

import { boundMethod } from 'autobind-decorator';

import Dropdown from '../../js/Dropdown';

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

    super._init();
  }

  _addEventListeners() {
    this._startDate.addEventListener('focus', this._handleStartDateFocus);
    this._endDate.addEventListener('focus', this._handleEndDateFocus);
    this._startDate.addEventListener('blur', this._handleStartDateBlur);
    this._endDate.addEventListener('blur', this._handleEndDateBlur);

    this._calendar.addObserver(this._update);
    this._calendar.addClickToApplyButtonListener(this._handleApplyButtonClick);
  }

  @boundMethod
  _handleApplyButtonClick() {
    this._clickToApplyButtonListeners.forEach((listener) => listener());
    this.close();
  }

  @boundMethod
  _update() {
    const dates = this._calendar.getStringDatesRange();
    this._changeDateInputs(dates);
  }

  @boundMethod
  _handleStartDateFocus() {
    this._open();
  }

  @boundMethod
  _handleEndDateFocus() {
    this._open();
  }

  @boundMethod
  _handleStartDateBlur() {
    this._updateCalendarData();
  }

  @boundMethod
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
