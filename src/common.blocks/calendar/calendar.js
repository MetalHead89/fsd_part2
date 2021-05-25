/* eslint-disable comma-dangle */

class Calendar {
  constructor(calendar) {
    this.MONTHS = [
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
    this.calendar = calendar;

    this.calendarInit();
  }

  calendarInit() {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
    this.calendarTitle = this.calendar.querySelector('.calendar__month-name');
    this.year = this.currentDate.getFullYear();
    this.month = this.currentDate.getMonth();
    this.dateRange = [];
    this.choiceMode = false;
    [this.startInput, this.endInput] = this.getStartAndEndDatesFields();

    if (this.startInput !== null) {
      this.startInput.addEventListener('blur', this.setStartRange.bind(this));
    }

    if (this.endInput !== null) {
      this.endInput.addEventListener('blur', this.setEndRange.bind(this));
    }

    this.calendarDays = this.calendar.querySelectorAll('.calendar__day');
    this.prevMonthButton = this.calendar.querySelector(
      '.calendar__month-button_with-back-arrow',
    );
    this.nextMonthButton = this.calendar.querySelector(
      '.calendar__month-button_with-forward-arrow',
    );
    [this.clearButton] = this.calendar.querySelector(
      '.calendar__button-clear',
    ).children;
    this.clearButton.style.display = 'none';
    this.clearButton.onclick = () => this.clearRange();
    [this.applyButton] = this.calendar.querySelector(
      '.calendar__button-apply',
    ).children;
    // this.applyButton.onclick = () => this.applyRange();

    this.prevMonthButton.onclick = () => this.switchMonth(this.prevMonthButton);
    this.nextMonthButton.onclick = () => this.switchMonth(this.nextMonthButton);
  }

  setStartRange() {
    const startDate = Calendar.getDate(this.startInput.value);
    const endDate = Calendar.getDate(this.endInput.value);

    if (startDate === null) {
      this.startInput.value = '';
    } else if (startDate.getTime() < this.currentDate.getTime()) {
      this.startInput.value = Calendar.dateToString(this.currentDate);
      this.startDate = this.currentDate;
    }

    if (Calendar.isStartDateGreaterEndDate(startDate, endDate)) {
      this.dateRange = [endDate.getTime()];
      this.startInput.value = '';
    } else {
      this.activateCalendarDays(startDate, endDate);
    }

    this.clearSelectedDays();
    this.showSelectedDays();
  }

  setEndRange() {
    const startDate = Calendar.getDate(this.startInput.value);
    const endDate = Calendar.getDate(this.endInput.value);

    if (endDate === null) {
      this.endInput.value = '';
    } else if (endDate.getTime() < this.currentDate.getTime()) {
      this.endInput.value = Calendar.dateToString(this.currentDate);
      this.endDate = this.currentDate;
    }

    if (Calendar.isEndDateGreaterStartDate(startDate, endDate)) {
      this.dateRange = [startDate.getTime()];
      this.endInput.value = '';
    } else {
      this.activateCalendarDays(startDate, endDate);
    }

    this.clearSelectedDays();
    this.showSelectedDays();
  }

  clearSelectedDays() {
    const selectableDays = this.calendar.querySelectorAll(
      '.calendar__day_selectable',
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];

      day.classList.remove('calendar__day_selected');
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded',
      );
      day.parentNode.classList.remove('calendar__range-highlight');
    }
  }

  activateCalendarDays(startDate, endDate) {
    if (startDate !== null && endDate !== null) {
      this.dateRange = [startDate.getTime(), endDate.getTime()];
      this.choiceMode = false;
    } else if (startDate !== null && endDate === null) {
      this.dateRange = [startDate.getTime()];
      this.choiceMode = true;
    } else if (startDate === null && endDate !== null) {
      this.dateRange = [endDate.getTime()];
      this.choiceMode = true;
    } else {
      this.dateRange = [];
      this.choiceMode = false;
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
    const day = date.getDate();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear();

    if (month.length < 2) {
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

  getStartAndEndDatesFields() {
    const parent = this.calendar.offsetParent.offsetParent;
    let startInput = null;
    let endInput = null;

    if (parent != null && parent.classList.contains('dropdown_date')) {
      startInput = parent
        .querySelector('.dropdown__start-date-input')
        .querySelector('.text-field__field');
      endInput = parent
        .querySelector('.dropdown__end-date-input')
        .querySelector('.text-field__field');
    }

    return [startInput, endInput];
  }

  switchMonth(button) {
    const date = button.classList.contains(
      'calendar__month-button_with-back-arrow',
    )
      ? new Date(this.year, this.month - 1)
      : new Date(this.year, this.month + 1);
    this.refreshCalendar(date);
    this.showSelectedDays();
  }

  showSelectedDays() {
    if (this.dateRange.length > 0) {
      const selectableDays = this.calendar.querySelectorAll(
        '.calendar__day_selectable',
      );

      for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
        const day = selectableDays[dayIndex];

        if (
          this.dateRange.indexOf(this.getDateFromCalendar(day).getTime()) !== -1
        ) {
          day.classList.add('calendar__day_selected');
        }
      }

      this.dateRange.sort(Calendar.compareNumbers);
      this.showRange(this.dateRange);
    }
  }

  selectDay(day) {
    const selectedDate = this.getDateFromCalendar(day);
    if (this.dateRange.length === 0 && Calendar.dayIsSelectable(day)) {
      this.dateRange.push(selectedDate.getTime());
      this.choiceMode = true;
      day.classList.add('calendar__day_selected');
    } else if (
      this.dateRange.length === 1 &&
      this.dayIsSelectableAndNotEqualToStartingPointOfRange(day)
    ) {
      this.dateRange.push(selectedDate.getTime());
      this.choiceMode = false;
      day.classList.add('calendar__day_selected');
      this.dateRange.sort(Calendar.compareNumbers);
    } else if (
      this.dateRange.length === 1 &&
      this.dayIsSelectableAndEqualToStartingPointOfRange(day)
    ) {
      this.dateRange.pop();
      this.choiceMode = false;
      day.classList.remove('calendar__day_selected');
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded',
      );
    } else if (this.dateRange.length === 2 && this.dayIsSelected(day)) {
      this.dateRange.splice(this.dateRange.indexOf(selectedDate.getTime()), 1);
      this.choiceMode = true;
      day.classList.remove('calendar__day_selected');
    } else if (
      this.dateRange.length === 2 &&
      this.dayIsSelectableAndLessThanStartingPointOfRange(day)
    ) {
      const selectedDays = this.calendar.querySelectorAll(
        '.calendar__day_selected',
      );

      if (selectedDays[0]) {
        selectedDays[0].classList.remove('calendar__day_selected');
      }

      day.classList.add('calendar__day_selected');
      this.dateRange[0] = this.getDateFromCalendar(day).getTime();
      this.showRange(this.dateRange);
    } else if (
      this.dateRange.length === 2 &&
      this.dayIsSelectableAndGreaterThanStartingPointOfRange(day)
    ) {
      const selectedDays = this.calendar.querySelectorAll(
        '.calendar__day_selected',
      );

      if (selectedDays.length === 2) {
        selectedDays[1].classList.remove('calendar__day_selected');
      } else if (
        selectedDays.length === 1 &&
        this.dayIsSelectableAndNotEqualToStartingPointOfRange(selectedDays[0])
      ) {
        selectedDays[0].classList.remove('calendar__day_selected');
      }

      day.classList.add('calendar__day_selected');
      this.dateRange[1] = this.getDateFromCalendar(day).getTime();
      this.showRange(this.dateRange);
    }

    if (this.dateRange.length > 0) {
      this.clearButton.removeAttribute('style');
    } else {
      this.clearButton.style.display = 'none';
    }

    this.applyRange();
  }

  static dayIsSelectable(day) {
    return day.classList.contains('calendar__day_selectable');
  }

  dayIsSelectableAndNotEqualToStartingPointOfRange(day) {
    const date = this.getDateFromCalendar(day).getTime();
    const startingDateOfRange = this.dateRange.sort(Calendar.compareNumbers)[0];

    return Calendar.dayIsSelectable(day) && date !== startingDateOfRange;
  }

  dayIsSelectableAndEqualToStartingPointOfRange(day) {
    const date = this.getDateFromCalendar(day).getTime();
    const startingDateOfRange = this.dateRange.sort(Calendar.compareNumbers)[0];

    return Calendar.dayIsSelectable(day) && date === startingDateOfRange;
  }

  dayIsSelected(day) {
    return (
      this.getDateFromCalendar(day).getTime() === this.dateRange[0] ||
      this.getDateFromCalendar(day).getTime() === this.dateRange[1]
    );
  }

  dayIsSelectableAndLessThanStartingPointOfRange(day) {
    return (
      Calendar.dayIsSelectable(day) &&
      this.getDateFromCalendar(day).getTime() <
        this.dateRange.sort(Calendar.compareNumbers)[0]
    );
  }

  dayIsSelectableAndGreaterThanStartingPointOfRange(day) {
    return (
      Calendar.dayIsSelectable(day) &&
      this.getDateFromCalendar(day).getTime() >
        this.dateRange.sort(Calendar.compareNumbers)[0]
    );
  }

  setRangeHighlight(day) {
    if (this.choiceMode && day.classList.contains('calendar__day_selectable')) {
      const range = [
        this.dateRange[0],
        this.getDateFromCalendar(day).getTime(),
      ];
      range.sort(Calendar.compareNumbers);

      this.showRange(range);
    }
  }

  showRange(range) {
    const selectableDays = this.calendar.querySelectorAll(
      '.calendar__day_selectable',
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const selectableDay = selectableDays[dayIndex];

      selectableDay.parentNode.classList.remove(
        'calendar__range-highlight_left-rounded',
      );
      selectableDay.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded',
      );
      selectableDay.parentNode.classList.remove('calendar__range-highlight');
    }

    if (range[0] === range[1]) {
      return;
    }

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];
      const dayToTime = this.getDateFromCalendar(day).getTime();

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

  getDateFromCalendar(day) {
    if (!day.classList.contains('calendar__day_other-month')) {
      return new Date(this.year, this.month, day.innerText);
    }

    if (parseInt(day.innerText, 10) > 20) {
      return new Date(this.year, this.month - 1, day.innerText);
    }

    return new Date(this.year, this.month + 1, day.innerText);
  }

  clearRange() {
    const selectableDays = this.calendar.querySelectorAll(
      '.calendar__day_selectable',
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];

      day.classList.remove('calendar__day_selected');
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded',
      );
      day.parentNode.classList.remove('calendar__range-highlight');
    }

    this.dateRange = [];
    this.choiceMode = false;
    this.clearButton.style.display = 'none';

    const parent = this.calendar.offsetParent.offsetParent;
    if (parent && parent.classList.contains('dropdown_date')) {
      this.startInput.value = '';
      this.endInput.value = '';
    } else if (parent && parent.classList.contains('dropdown_filter-date')) {
      parent.querySelector('.dropdown__header-text').innerText =
        'Выберите период';
    }
  }

  applyRange() {
    this.dateRange.sort(Calendar.compareNumbers);
    const parent = this.calendar.offsetParent.offsetParent;

    if (parent && parent.classList.contains('dropdown_date')) {
      if (typeof this.dateRange[0] !== 'undefined') {
        this.startInput.value = Calendar.dateToString(
          new Date(this.dateRange[0]),
        );
      } else {
        this.startInput.value = '';
      }

      if (typeof this.dateRange[1] !== 'undefined') {
        this.endInput.value = Calendar.dateToString(
          new Date(this.dateRange[1]),
        );
      } else {
        this.endInput.value = '';
      }
    } else if (parent && parent.classList.contains('dropdown_filter-date')) {
      if (this.dateRange.length === 2) {
        const startDate = new Date(this.dateRange[0]);
        const endDate = new Date(this.dateRange[1]);

        parent.querySelector('.dropdown__header-text').innerText =
          `${startDate.getDate()} ` +
          `${this.MONTHS[startDate.getMonth()].toLowerCase().slice(0, 3)} - ` +
          `${endDate.getDate()} ${this.MONTHS[endDate.getMonth()]
            .toLowerCase()
            .slice(0, 3)} `;
      } else {
        parent.querySelector('.dropdown__header-text').innerText =
          'Выберите период';
      }
    }

    // this.dateRange.sort(Calendar.compareNumbers);
    // const parent = this.calendar.offsetParent.offsetParent;

    // if (this.dateRange.length === 2) {
    // const startDate = new Date(this.dateRange[0]);
    // const endDate = new Date(this.dateRange[1]);

    //   if (parent && parent.classList.contains('dropdown_date')) {
    //     parent.querySelector(
    //       '.dropdown_start-date'
    //     ).innerText = startDate.toLocaleString('ru', {
    //       day: 'numeric',
    //       month: 'numeric',
    //       year: 'numeric',
    //     });
    //     parent.querySelector(
    //       '.dropdown_end-date'
    //     ).innerText = endDate.toLocaleString('ru', {
    //       day: 'numeric',
    //       month: 'numeric',
    //       year: 'numeric',
    //     });
    //   } else if (parent && parent.classList.contains('dropdown_filter-date')) {
    //     parent.querySelector('.dropdown__header-text').innerText =
    //       `${startDate.getDate()} ` +
    //       `${this.MONTHS[startDate.getMonth()].toLowerCase().slice(0, 3)} - ` +
    //       `${endDate.getDate()} ${this.MONTHS[endDate.getMonth()]
    //         .toLowerCase()
    //         .slice(0, 3)} `;
    //   }
    // } else {
    //   if (parent && parent.classList.contains('dropdown_date')) {
    //     parent.querySelector('.dropdown_start-date').innerText = 'ДД.ММ.ГГГГ';
    //     parent.querySelector('.dropdown_end-date').innerText = 'ДД.ММ.ГГГГ';
    //   }

    //   if (parent && parent.classList.contains('dropdown_filter-date')) {
    //     parent.querySelector('.dropdown__header-text').innerText =
    //       'Выберите период';
    //   }
    // }
  }

  refreshCalendar(date = new Date(this.year, this.month)) {
    /**
     * Обновляет информацию на календаре
     */

    this.removeCalendar();
    this.createNewCalendar(date);
  }

  removeCalendar() {
    /**
     * Удаляет текущий календарь
     */

    const weekBlocks = this.calendar.querySelectorAll(
      '.calendar__week-section',
    );

    for (
      let weekNodeIndex = 0;
      weekNodeIndex < weekBlocks.length;
      weekNodeIndex += 1
    ) {
      weekBlocks[weekNodeIndex].remove();
    }
  }

  createNewCalendar(date) {
    /**
     * Создает новый календарь
     */
    this.year = date.getFullYear();
    this.month = date.getMonth();

    const daysInCurrentMonth =
      32 - new Date(this.year, this.month, 32).getDate();
    const daysInPrevMonths =
      32 - new Date(this.year, this.month - 1, 32).getDate();
    const firstDayMonth = date.getDay() === 0 ? 7 : date.getDay();
    const calendarBody = this.calendar.querySelector('.calendar__days-section');
    const weeksInCalendar = Math.ceil(
      (daysInCurrentMonth + firstDayMonth - 1) / 7,
    );

    this.calendarTitle.innerText = `${this.MONTHS[this.month]} ${this.year}`;

    let calendarDate = date;

    calendarDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      daysInPrevMonths - firstDayMonth + 2,
    );

    for (let week = 0; week < weeksInCalendar; week += 1) {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'calendar__week-section';

      for (let weekDayNumber = 0; weekDayNumber < 7; weekDayNumber += 1) {
        let classList = 'calendar__day';
        if (calendarDate.getMonth() !== date.getMonth()) {
          classList = 'calendar__day  calendar__day_other-month';
        }

        const calendarDay = document.createElement('span');
        calendarDay.onclick = () => this.selectDay(calendarDay);
        calendarDay.classList = classList;
        calendarDay.innerText = calendarDate.getDate();

        const rangeHighlight = document.createElement('div');
        rangeHighlight.onmouseover = () => this.setRangeHighlight(calendarDay);
        rangeHighlight.classList = 'calendar__day';

        rangeHighlight.append(calendarDay);
        weekDiv.append(rangeHighlight);

        if (this.dateIsEqualToTodayDate(calendarDate)) {
          calendarDay.classList.add('calendar__day_current');
        }
        if (calendarDate >= this.currentDate) {
          calendarDay.classList.add('calendar__day_selectable');
        }

        calendarDate.setDate(calendarDate.getDate() + 1);
      }

      calendarBody.append(weekDiv);
    }
  }

  dateIsEqualToTodayDate(date) {
    return (
      date.getFullYear() === this.currentDate.getFullYear() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getDate() === this.currentDate.getDate()
    );
  }
}

const calendars = document.querySelectorAll('.calendar');

for (
  let calendarIndex = 0;
  calendarIndex < calendars.length;
  calendarIndex += 1
) {
  const calendar = new Calendar(calendars[calendarIndex]);
  calendar.refreshCalendar();
}
