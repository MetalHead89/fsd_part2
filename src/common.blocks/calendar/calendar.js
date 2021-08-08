/* eslint-disable comma-dangle */

class Calendar {
  constructor(calendar) {
    this._MONTHS = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    this._calendar = calendar;

    this._calendarInit();
    this._addEventListeners();
    this._refreshCalendar();
  }

  _calendarInit() {
    this._currentDate = new Date();
    this._currentDate.setHours(0, 0, 0, 0);
    this._calendarTitle = this._calendar.querySelector(
      '.js-calendar__month-name'
    );
    this._year = this._currentDate.getFullYear();
    this._month = this._currentDate.getMonth();
    this._dateRange = [];
    this._isChoiceMode = false;
    [this._startInput, this._endInput] = this._getStartAndEndDatesFields();
    this._prevMonthButton = this._calendar.querySelector(
      '.js-calendar__month-button_with-back-arrow'
    );
    this._nextMonthButton = this._calendar.querySelector(
      '.js-calendar__month-button_with-forward-arrow'
    );
    this._clearButton = this._calendar.querySelector(
      '.js-calendar__button-clear'
    );

    this._handleStartDateInputBlur = this._handleStartDateInputBlur.bind(this);
    this._handleEndDateInputBlur = this._handleEndDateInputBlur.bind(this);
    this._handleButtonClearClick = this._handleButtonClearClick.bind(this);
    this._handleMonthButtonClick = this._handleMonthButtonClick.bind(this);
  }

  _addEventListeners() {
    if (this._startInput !== null) {
      this._startInput.addEventListener('blur', this._handleStartDateInputBlur);
    }
    if (this._endInput !== null) {
      this._endInput.addEventListener('blur', this._handleEndDateInputBlur);
    }
    this._clearButton.addEventListener('click', this._handleButtonClearClick);
    this._prevMonthButton.addEventListener(
      'click',
      this._handleMonthButtonClick
    );
    this._nextMonthButton.addEventListener(
      'click',
      this._handleMonthButtonClick
    );
  }

  _handleStartDateInputBlur() {
    const startDate = Calendar.getDate(this._startInput.value);
    const endDate = Calendar.getDate(this._endInput.value);

    if (startDate === null) {
      this._startInput.value = '';
    } else if (startDate.getTime() < this._currentDate.getTime()) {
      this._startInput.value = Calendar.dateToString(this._currentDate);
      this.startDate = this._currentDate;
    }

    if (Calendar.isStartDateGreaterEndDate(startDate, endDate)) {
      this._dateRange = [endDate.getTime()];
      this._startInput.value = '';
    } else {
      this._activateCalendarDays(startDate, endDate);
    }

    this._clearSelectedDays();
    this._showSelectedDays();
    this._startInput.dispatchEvent(new Event('change'));
  }

  _handleEndDateInputBlur() {
    const startDate = Calendar.getDate(this._startInput.value);
    const endDate = Calendar.getDate(this._endInput.value);

    if (endDate === null) {
      this._endInput.value = '';
    } else if (endDate.getTime() < this._currentDate.getTime()) {
      this._endInput.value = Calendar.dateToString(this._currentDate);
      this.endDate = this._currentDate;
    }

    if (Calendar.isEndDateGreaterStartDate(startDate, endDate)) {
      this._dateRange = [startDate.getTime()];
      this._endInput.value = '';
    } else {
      this._activateCalendarDays(startDate, endDate);
    }

    this._clearSelectedDays();
    this._showSelectedDays();
    this._endInput.dispatchEvent(new Event('change'));
  }

  _clearSelectedDays() {
    const selectableDays = this._calendar.querySelectorAll(
      '.js-calendar__day_selectable'
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];

      day.classList.remove(
        'calendar__day_selected',
        'js-calendar__day_selected'
      );
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded'
      );
      day.parentNode.classList.remove('calendar__range-highlight');
    }
  }

  _activateCalendarDays(startDate, endDate) {
    if (startDate !== null && endDate !== null) {
      this._dateRange = [startDate.getTime(), endDate.getTime()];
      this._isChoiceMode = false;
    } else if (startDate !== null && endDate === null) {
      this._dateRange = [startDate.getTime()];
      this._isChoiceMode = true;
    } else if (startDate === null && endDate !== null) {
      this._dateRange = [endDate.getTime()];
      this._isChoiceMode = true;
    } else {
      this._dateRange = [];
      this._isChoiceMode = false;
    }
  }

  static isStartDateGreaterEndDate(startDate, endDate) {
    return (
      startDate !== null &&
      endDate !== null &&
      startDate.getTime() >= endDate.getTime()
    );
  }

  static isEndDateGreaterStartDate(startDate, endDate) {
    return (
      startDate !== null &&
      endDate !== null &&
      endDate.getTime() <= startDate.getTime()
    );
  }

  static dateToString(date) {
    let day = date.getDate();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear();

    if (day.toString().length < 2) {
      day = `0${day}`;
    }

    if (month.toString().length < 2) {
      month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
  }

  static getDate(date) {
    let newDate = null;

    if (Calendar.dateIsValid(date)) {
      const [day, month, year] = date.split('.');
      newDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    return newDate;
  }

  static dateIsValid(date) {
    const [day, month, year] = date.split('.');

    return (
      day !== '' &&
      month !== '' &&
      year !== '' &&
      day >= 1 &&
      day <= 31 &&
      month > 0 &&
      month <= 12 &&
      year > 0
    );
  }

  _getStartAndEndDatesFields() {
    const parent = this._calendar.offsetParent.offsetParent;
    let startInput = null;
    let endInput = null;

    if (parent != null && parent.classList.contains('date-dropdown')) {
      startInput = parent
        .querySelector('.js-date-dropdown__start-date-input')
        .querySelector('.js-text-field__field');
      endInput = parent
        .querySelector('.js-date-dropdown__end-date-input')
        .querySelector('.js-text-field__field');
    }

    return [startInput, endInput];
  }

  _handleMonthButtonClick(event) {
    const isDate = event.target.classList.contains(
      'calendar__month-button_with-back-arrow'
    )
      ? new Date(this._year, this._month - 1)
      : new Date(this._year, this._month + 1);
    this._refreshCalendar(isDate);
    this._showSelectedDays();
  }

  _showSelectedDays() {
    if (this._dateRange.length > 0) {
      this._clearButton.classList.remove('calendar__button-clear_hidden');

      const selectableDays = this._calendar.querySelectorAll(
        '.js-calendar__day_selectable'
      );

      for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
        const day = selectableDays[dayIndex];

        if (
          this._dateRange.indexOf(this._getDateFromCalendar(day).getTime()) !==
          -1
        ) {
          day.classList.add(
            'calendar__day_selected',
            'js-calendar__day_selected'
          );
        }
      }

      this._dateRange.sort(Calendar.compareNumbers);
      this._showRange(this._dateRange);
    } else {
      this._clearButton.classList.add('calendar__button-clear_hidden');
    }
  }

  _selectDay(day) {
    const selectedDate = this._getDateFromCalendar(day);
    if (this._dateRange.length === 0 && Calendar.dayIsSelectable(day)) {
      this._dateRange.push(selectedDate.getTime());
      this._isChoiceMode = true;
      day.classList.add('calendar__day_selected', 'js-calendar__day_selected');
    } else if (
      this._dateRange.length === 1 &&
      this._dayIsSelectableAndNotEqualToStartingPointOfRange(day)
    ) {
      this._dateRange.push(selectedDate.getTime());
      this._isChoiceMode = false;
      day.classList.add('calendar__day_selected', 'js-calendar__day_selected');
      this._dateRange.sort(Calendar.compareNumbers);
      this._showRange(this._dateRange);
    } else if (
      this._dateRange.length === 1 &&
      this._dayIsSelectableAndEqualToStartingPointOfRange(day)
    ) {
      this._dateRange.pop();
      this._isChoiceMode = false;
      day.classList.remove(
        'calendar__day_selected',
        'js-calendar__day_selected'
      );
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded'
      );
    } else if (this._dateRange.length === 2 && this._dayIsSelected(day)) {
      this._dateRange.splice(
        this._dateRange.indexOf(selectedDate.getTime()),
        1
      );
      this._isChoiceMode = true;
      day.classList.remove(
        'calendar__day_selected',
        'js-calendar__day_selected'
      );
    } else if (
      this._dateRange.length === 2 &&
      this._dayIsSelectableAndLessThanStartingPointOfRange(day)
    ) {
      const selectedDays = this._calendar.querySelectorAll(
        '.js-calendar__day_selected'
      );

      if (selectedDays[0]) {
        selectedDays[0].classList.remove(
          'calendar__day_selected',
          'js-calendar__day_selected'
        );
      }

      day.classList.add('calendar__day_selected', 'js-calendar__day_selected');
      this._dateRange[0] = this._getDateFromCalendar(day).getTime();
      this._showRange(this._dateRange);
    } else if (
      this._dateRange.length === 2 &&
      this._dayIsSelectableAndGreaterThanStartingPointOfRange(day)
    ) {
      const selectedDays = this._calendar.querySelectorAll(
        '.js-calendar__day_selected'
      );

      if (selectedDays.length === 2) {
        selectedDays[1].classList.remove(
          'calendar__day_selected',
          'js-calendar__day_selected'
        );
      } else if (
        selectedDays.length === 1 &&
        this._dayIsSelectableAndNotEqualToStartingPointOfRange(selectedDays[0])
      ) {
        selectedDays[0].classList.remove(
          'calendar__day_selected',
          'js-calendar__day_selected'
        );
      }

      day.classList.add('calendar__day_selected', 'js-calendar__day_selected');
      this._dateRange[1] = this._getDateFromCalendar(day).getTime();
      this._showRange(this._dateRange);
    }

    if (this._dateRange.length > 0) {
      this._clearButton.classList.remove('calendar__button-clear_hidden');
    } else {
      this._clearButton.classList.add('calendar__button-clear_hidden');
    }

    this._applyRange();
  }

  static dayIsSelectable(day) {
    return day.classList.contains('calendar__day_selectable');
  }

  _dayIsSelectableAndNotEqualToStartingPointOfRange(day) {
    const date = this._getDateFromCalendar(day).getTime();
    const startingDateOfRange = this._dateRange.sort(
      Calendar.compareNumbers
    )[0];

    return Calendar.dayIsSelectable(day) && date !== startingDateOfRange;
  }

  _dayIsSelectableAndEqualToStartingPointOfRange(day) {
    const date = this._getDateFromCalendar(day).getTime();
    const startingDateOfRange = this._dateRange.sort(
      Calendar.compareNumbers
    )[0];

    return Calendar.dayIsSelectable(day) && date === startingDateOfRange;
  }

  _dayIsSelected(day) {
    return (
      this._getDateFromCalendar(day).getTime() === this._dateRange[0] ||
      this._getDateFromCalendar(day).getTime() === this._dateRange[1]
    );
  }

  _dayIsSelectableAndLessThanStartingPointOfRange(day) {
    return (
      Calendar.dayIsSelectable(day) &&
      this._getDateFromCalendar(day).getTime() <
        this._dateRange.sort(Calendar.compareNumbers)[0]
    );
  }

  _dayIsSelectableAndGreaterThanStartingPointOfRange(day) {
    return (
      Calendar.dayIsSelectable(day) &&
      this._getDateFromCalendar(day).getTime() >
        this._dateRange.sort(Calendar.compareNumbers)[0]
    );
  }

  _setRangeHighlight(day) {
    if (
      this._isChoiceMode &&
      day.classList.contains('calendar__day_selectable')
    ) {
      const range = [
        this._dateRange[0],
        this._getDateFromCalendar(day).getTime(),
      ];
      range.sort(Calendar.compareNumbers);

      this._showRange(range);
    }
  }

  _showRange(range) {
    const selectableDays = this._calendar.querySelectorAll(
      '.js-calendar__day_selectable'
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const selectableDay = selectableDays[dayIndex];

      selectableDay.parentNode.classList.remove(
        'calendar__range-highlight_left-rounded'
      );
      selectableDay.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded'
      );
      selectableDay.parentNode.classList.remove('calendar__range-highlight');
    }

    if (range[0] === range[1]) {
      return;
    }

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];
      const dayToTime = this._getDateFromCalendar(day).getTime();

      if (dayToTime === range[0]) {
        day.parentNode.classList.add('calendar__range-highlight');
        day.parentNode.classList.add('calendar__range-highlight_left-rounded');
      } else if (dayToTime === range[1]) {
        day.parentNode.classList.add('calendar__range-highlight');
        day.parentNode.classList.add('calendar__range-highlight_right-rounded');
      } else if (dayToTime >= range[0] && dayToTime <= range[1]) {
        day.parentNode.classList.add('calendar__range-highlight');
      }
    }
  }

  static compareNumbers(a, b) {
    return a - b;
  }

  _getDateFromCalendar(day) {
    if (!day.classList.contains('calendar__day_other-month')) {
      return new Date(this._year, this._month, day.innerText);
    }

    if (parseInt(day.innerText, 10) > 20) {
      return new Date(this._year, this._month - 1, day.innerText);
    }

    return new Date(this._year, this._month + 1, day.innerText);
  }

  _handleButtonClearClick() {
    const selectableDays = this._calendar.querySelectorAll(
      '.js-calendar__day_selectable'
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];

      day.classList.remove(
        'calendar__day_selected',
        'js-calendar__day_selected'
      );
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded'
      );
      day.parentNode.classList.remove('calendar__range-highlight');
    }

    this._dateRange = [];
    this._isChoiceMode = false;
    this._clearButton.classList.add('calendar__button-clear_hidden');

    const parent = this._calendar.offsetParent.offsetParent;
    if (parent && parent.classList.contains('date-dropdown')) {
      this._startInput.value = '';
      this._endInput.value = '';
    } else if (parent && parent.classList.contains('dropdown_filter-date')) {
      parent.querySelector('.js-dropdown__header-text').innerText =
        'Выберите период';
    }
  }

  _applyRange() {
    this._dateRange.sort(Calendar.compareNumbers);
    const parent = this._calendar.offsetParent.offsetParent;

    if (parent && parent.classList.contains('date-dropdown')) {
      if (this._dateRange[0]) {
        this._startInput.value = Calendar.dateToString(
          new Date(this._dateRange[0])
        );
        this._startInput.dispatchEvent(new Event('change'));
      } else {
        this._startInput.value = '';
      }

      if (this._dateRange[1]) {
        this._endInput.value = Calendar.dateToString(
          new Date(this._dateRange[1])
        );
        this._endInput.dispatchEvent(new Event('change'));
      } else {
        this._endInput.value = '';
      }
    } else if (parent && parent.classList.contains('dropdown_filter-date')) {
      if (this._dateRange.length === 2) {
        const startDate = new Date(this._dateRange[0]);
        const endDate = new Date(this._dateRange[1]);

        parent.querySelector('.js-dropdown__header-text').innerText =
          `${startDate.getDate()} ` +
          `${this._MONTHS[startDate.getMonth()].toLowerCase().slice(0, 3)} - ` +
          `${endDate.getDate()} ${this._MONTHS[endDate.getMonth()]
            .toLowerCase()
            .slice(0, 3)} `;
      } else {
        parent.querySelector('.js-dropdown__header-text').innerText =
          'Выберите период';
      }
    }
  }

  _refreshCalendar(date = new Date(this._year, this._month)) {
    /**
     * Обновляет информацию на календаре
     */

    this._removeCalendar();
    this._createNewCalendar(date);
  }

  _removeCalendar() {
    /**
     * Удаляет текущий календарь
     */

    const weekBlocks = this._calendar.querySelectorAll(
      '.js-calendar__week-section'
    );

    for (
      let weekNodeIndex = 0;
      weekNodeIndex < weekBlocks.length;
      weekNodeIndex += 1
    ) {
      weekBlocks[weekNodeIndex].remove();
    }
  }

  _createNewCalendar(date) {
    /**
     * Создает новый календарь
     */
    this._year = date.getFullYear();
    this._month = date.getMonth();

    const daysInCurrentMonth =
      32 - new Date(this._year, this._month, 32).getDate();
    const daysInPrevMonths =
      32 - new Date(this._year, this._month - 1, 32).getDate();
    const firstDayMonth = date.getDay() === 0 ? 7 : date.getDay();
    const calendarBody = this._calendar.querySelector(
      '.js-calendar__days-section'
    );
    const weeksInCalendar = Math.ceil(
      (daysInCurrentMonth + firstDayMonth - 1) / 7
    );

    this._calendarTitle.innerText = `${this._MONTHS[this._month]} ${
      this._year
    }`;

    let calendarDate = date;

    calendarDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      daysInPrevMonths - firstDayMonth + 2
    );

    for (let week = 0; week < weeksInCalendar; week += 1) {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'calendar__week-section js-calendar__week-section';

      for (let weekDayNumber = 0; weekDayNumber < 7; weekDayNumber += 1) {
        let classList = 'calendar__day';
        if (calendarDate.getMonth() !== date.getMonth()) {
          classList = 'calendar__day  calendar__day_other-month';
        }

        const calendarDay = document.createElement('span');
        calendarDay.onclick = () => this._selectDay(calendarDay);
        calendarDay.classList = classList;
        calendarDay.innerText = calendarDate.getDate();

        const rangeHighlight = document.createElement('div');
        rangeHighlight.onmouseover = () => this._setRangeHighlight(calendarDay);
        rangeHighlight.classList = 'calendar__day';

        rangeHighlight.append(calendarDay);
        weekDiv.append(rangeHighlight);

        if (this._dateIsEqualToTodayDate(calendarDate)) {
          calendarDay.classList.add('calendar__day_current');
        }
        if (calendarDate >= this._currentDate) {
          calendarDay.classList.add(
            'calendar__day_selectable',
            'js-calendar__day_selectable'
          );
        }

        calendarDate.setDate(calendarDate.getDate() + 1);
      }

      calendarBody.append(weekDiv);
    }
  }

  _dateIsEqualToTodayDate(date) {
    return (
      date.getFullYear() === this._currentDate.getFullYear() &&
      date.getMonth() === this._currentDate.getMonth() &&
      date.getDate() === this._currentDate.getDate()
    );
  }
}

export default Calendar;
