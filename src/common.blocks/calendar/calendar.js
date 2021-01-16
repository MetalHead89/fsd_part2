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

    this.calendarDays = this.calendar.querySelectorAll('.calendar__day');
    this.prevMonthButton = this.calendar.querySelector(
      '.calendar__month-button_with-back-arrow'
    );
    this.nextMonthButton = this.calendar.querySelector(
      '.calendar__month-button_with-forward-arrow'
    );
    [this.clearButton] = this.calendar.querySelector(
      '.calendar__button-clear'
    ).children;
    this.clearButton.style.display = 'none';
    this.clearButton.onclick = () => this.clearRange();
    [this.applyButton] = this.calendar.querySelector(
      '.calendar__button-apply'
    ).children;
    this.applyButton.onclick = () => this.applyRange();

    this.prevMonthButton.onclick = () => this.switchMonth(this.prevMonthButton);
    this.nextMonthButton.onclick = () => this.switchMonth(this.nextMonthButton);
  }

  switchMonth(button) {
    const date = button.classList.contains(
      'calendar__month-button_with-back-arrow'
    )
      ? new Date(this.year, this.month - 1)
      : new Date(this.year, this.month + 1);
    this.refreshCalendar(date);

    if (this.dateRange.length > 0) {
      const selectableDays = this.calendar.querySelectorAll(
        '.calendar__day_selectable'
      );

      for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
        const day = selectableDays[dayIndex];

        if (
          this.dateRange.indexOf(this.getDateFromСalendar(day).getTime()) !== -1
        ) {
          day.classList.add('calendar__day_selected');
        }
      }

      this.dateRange.sort(Calendar.compareNumbers);
      this.showRange(this.dateRange);
    }
  }

  selectDay(day) {
    if (this.dateRange.length === 0 && Calendar.dayIsSelectable(day)) {
      this.dateRange.push(this.getDateFromСalendar(day).getTime());
      this.choiceMode = true;
      day.classList.add('calendar__day_selected');
    } else if (
      this.dateRange.length === 1 &&
      this.dayIsSelectableAndNotEqualToStartingPointOfRange(day)
    ) {
      this.dateRange.push(this.getDateFromСalendar(day).getTime());
      this.choiceMode = false;
      day.classList.add('calendar__day_selected');
    } else if (
      this.dateRange.length === 1 &&
      this.dayIsSelectableAndEqualToStartingPointOfRange(day)
    ) {
      this.dateRange.pop();
      this.choiceMode = false;
      day.classList.remove('calendar__day_selected');
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded'
      );
    } else if (this.dateRange.length === 2 && this.dayIsSelected(day)) {
      this.dateRange.splice(
        this.dateRange.indexOf(this.getDateFromСalendar(day).getTime()),
        1
      );
      this.choiceMode = true;
      day.classList.remove('calendar__day_selected');
    } else if (
      this.dateRange.length === 2 &&
      this.dayIsSelectableAndLessThanStartingPointOfRange(day)
    ) {
      const selectedDays = this.calendar.querySelectorAll(
        '.calendar__day_selected'
      );

      if (selectedDays[0]) {
        selectedDays[0].classList.remove('calendar__day_selected');
      }

      day.classList.add('calendar__day_selected');
      this.dateRange[0] = this.getDateFromСalendar(day).getTime();
      this.showRange(this.dateRange);
    } else if (
      this.dateRange.length === 2 &&
      this.dayIsSelectableAndGreaterThanStartingPointOfRange(day)
    ) {
      const selectedDays = this.calendar.querySelectorAll(
        '.calendar__day_selected'
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
      this.dateRange[1] = this.getDateFromСalendar(day).getTime();
      this.showRange(this.dateRange);
    }

    if (this.dateRange.length > 0) {
      this.clearButton.removeAttribute('style');
    } else {
      this.clearButton.style.display = 'none';
    }
  }

  static dayIsSelectable(day) {
    return day.classList.contains('calendar__day_selectable');
  }

  dayIsSelectableAndNotEqualToStartingPointOfRange(day) {
    const date = this.getDateFromСalendar(day).getTime();
    const startingDateOfRange = this.dateRange.sort(Calendar.compareNumbers)[0];

    return Calendar.dayIsSelectable(day) && date !== startingDateOfRange;
  }

  dayIsSelectableAndEqualToStartingPointOfRange(day) {
    const date = this.getDateFromСalendar(day).getTime();
    const startingDateOfRange = this.dateRange.sort(Calendar.compareNumbers)[0];

    return Calendar.dayIsSelectable(day) && date === startingDateOfRange;
  }

  dayIsSelected(day) {
    return (
      this.getDateFromСalendar(day).getTime() === this.dateRange[0] ||
      this.getDateFromСalendar(day).getTime() === this.dateRange[1]
    );
  }

  dayIsSelectableAndLessThanStartingPointOfRange(day) {
    return (
      Calendar.dayIsSelectable(day) &&
      this.getDateFromСalendar(day).getTime() <
        this.dateRange.sort(Calendar.compareNumbers)[0]
    );
  }

  dayIsSelectableAndGreaterThanStartingPointOfRange(day) {
    return (
      Calendar.dayIsSelectable(day) &&
      this.getDateFromСalendar(day).getTime() >
        this.dateRange.sort(Calendar.compareNumbers)[0]
    );
  }

  setRangeHighlight(day) {
    if (this.choiceMode && day.classList.contains('calendar__day_selectable')) {
      const range = [
        this.dateRange[0],
        this.getDateFromСalendar(day).getTime(),
      ];
      range.sort(Calendar.compareNumbers);

      this.showRange(range);
    }
  }

  showRange(range) {
    const selectableDays = this.calendar.querySelectorAll(
      '.calendar__day_selectable'
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
      const dayToTime = this.getDateFromСalendar(day).getTime();

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

  getDateFromСalendar(day) {
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
      '.calendar__day_selectable'
    );

    for (let dayIndex = 0; dayIndex < selectableDays.length; dayIndex += 1) {
      const day = selectableDays[dayIndex];

      day.classList.remove('calendar__day_selected');
      day.parentNode.classList.remove('calendar__range-highlight_left-rounded');
      day.parentNode.classList.remove(
        'calendar__range-highlight_right-rounded'
      );
      day.parentNode.classList.remove('calendar__range-highlight');
    }

    this.dateRange = [];
    this.choiceMode = false;
    this.clearButton.style.display = 'none';

    const parent = this.calendar.offsetParent.offsetParent;
    if (parent.classList.contains('dropdown_date')) {
      parent.querySelector('.dropdown_start-date').innerText = 'ДД.ММ.ГГГГ';
      parent.querySelector('.dropdown_end-date').innerText = 'ДД.ММ.ГГГГ';
    } else if (parent.classList.contains('dropdown_filter-date')) {
      parent.querySelector('.dropdown__header-text').innerText =
        'Выберите период';
    }
  }

  applyRange() {
    this.dateRange.sort(Calendar.compareNumbers);
    const parent = this.calendar.offsetParent.offsetParent;

    if (this.dateRange.length === 2) {
      const startDate = new Date(this.dateRange[0]);
      const endDate = new Date(this.dateRange[1]);

      if (parent.classList.contains('dropdown_date')) {
        parent.querySelector(
          '.dropdown_start-date'
        ).innerText = startDate.toLocaleString('ru', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
        parent.querySelector(
          '.dropdown_end-date'
        ).innerText = endDate.toLocaleString('ru', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      } else if (parent.classList.contains('dropdown_filter-date')) {
        parent.querySelector('.dropdown__header-text').innerText =
          `${startDate.getDate()} ` +
          `${this.MONTHS[startDate.getMonth()].toLowerCase().slice(0, 3)} - ` +
          `${endDate.getDate()} ${this.MONTHS[endDate.getMonth()]
            .toLowerCase()
            .slice(0, 3)} `;
      }
    } else {
      if (parent.classList.contains('dropdown_date')) {
        parent.querySelector('.dropdown_start-date').innerText = 'ДД.ММ.ГГГГ';
        parent.querySelector('.dropdown_end-date').innerText = 'ДД.ММ.ГГГГ';
      }

      if (parent.classList.contains('dropdown_filter-date')) {
        parent.querySelector('.dropdown__header-text').innerText =
          'Выберите период';
      }
    }
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

    const weekBloks = this.calendar.querySelectorAll('.calendar__week-section');

    for (
      let weekNodeIndex = 0;
      weekNodeIndex < weekBloks.length;
      weekNodeIndex += 1
    ) {
      weekBloks[weekNodeIndex].remove();
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
      (daysInCurrentMonth + firstDayMonth - 1) / 7
    );

    this.calendarTitle.innerText = `${this.MONTHS[this.month]} ${this.year}`;

    let calendarDate = date;

    calendarDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      daysInPrevMonths - firstDayMonth + 2
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
