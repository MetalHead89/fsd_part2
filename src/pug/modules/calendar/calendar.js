'use strict'

class Calendar {
    constructor(calendar) {
        this.MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        this.currentDate = new Date();
        this.currentDate.setHours(0, 0, 0, 0);
        this.calendar = calendar;
        this.calendarTitle = calendar.querySelector('.calendar__month');
        this.year = this.currentDate.getFullYear();
        this.month = this.currentDate.getMonth();
        this.dateRange = [];
        this.choiceMode = false;

        this.calendarDays = this.calendar.querySelectorAll('.calendar__day');
        this.prevMonthButton = calendar.querySelector('.calendar__prev-month');
        this.nextMonthButton = calendar.querySelector('.calendar__next-month');
        this.clearButton = calendar.querySelector('.calendar__button_clear');

        this.prevMonthButton.onclick = () => this.switchMonth(this.prevMonthButton);
        this.nextMonthButton.onclick = () => this.switchMonth(this.nextMonthButton);
        this.clearButton.onclick = () => this.clearRange();
    }

    switchMonth(button) {
        const date = button.classList.contains('calendar__prev-month') ? new Date(this.year, this.month - 1) : new Date(this.year, this.month + 1)
        this.refreshCalendar(date);

        if (this.dateRange.length > 0) {
            let selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');

            for (let day of selectableDays) {
                if (this.dateRange.indexOf(this.getDateFromСalendar(day).getTime()) != -1) {
                    day.classList.add('calendar__day_selected');
                }
            }

            this.dateRange.sort(this.compareNumbers);
            this.showRange(this.dateRange);
        }
    }

    selectDay(day) {
        if (this.dateRange.length == 0 && day.classList.contains('calendar__day_selectable')) {

            this.dateRange.push(this.getDateFromСalendar(day).getTime());
            this.choiceMode = true;
            day.classList.add('calendar__day_selected');

        } else if (this.dateRange.length == 1 && day.classList.contains('calendar__day_selectable')
            && this.getDateFromСalendar(day).getTime() != this.dateRange[0]) {

                this.dateRange.push(this.getDateFromСalendar(day).getTime());
                this.choiceMode = false;
                day.classList.add('calendar__day_selected');

        } else if (this.dateRange.length == 1 && this.getDateFromСalendar(day).getTime() == this.dateRange[0]) {

            this.dateRange.pop();
            this.choiceMode = false;
            day.classList.remove('calendar__day_selected');
            day.parentNode.classList.remove('calendar__range-highlight_light-and-left-round');
            day.parentNode.classList.remove('calendar__range-highlight_light-and-right-round');

        } else if (this.dateRange.length == 2 
            && (this.getDateFromСalendar(day).getTime() == this.dateRange[0] || this.getDateFromСalendar(day).getTime() == this.dateRange[1])) {

                this.dateRange.splice(this.dateRange.indexOf(this.getDateFromСalendar(day).getTime()), 1);
                this.choiceMode = true;
                day.classList.remove('calendar__day_selected');

        } else if (this.dateRange.length == 2 && day.classList.contains('calendar__day_selectable') && 
            this.getDateFromСalendar(day).getTime() < this.dateRange.sort(this.compareNumbers)[0]) {

                const selectedDays = this.calendar.querySelectorAll('.calendar__day_selected');

                if (selectedDays[0]) {
                    selectedDays[0].classList.remove('calendar__day_selected');
                }

                day.classList.add('calendar__day_selected');                
                this.dateRange[0] = this.getDateFromСalendar(day).getTime();
                this.showRange(this.dateRange);

        } else if (this.dateRange.length == 2 && day.classList.contains('calendar__day_selectable') && 
            this.getDateFromСalendar(day).getTime() > this.dateRange.sort(this.compareNumbers)[0]) {

                const selectedDays = this.calendar.querySelectorAll('.calendar__day_selected');

                if (selectedDays.length == 2) {
                    selectedDays[1].classList.remove('calendar__day_selected');
                } else if (selectedDays.length == 1 && this.getDateFromСalendar(selectedDays[0]).getTime() != this.dateRange.sort(this.compareNumbers)[0]){
                    selectedDays[0].classList.remove('calendar__day_selected');
                }

                day.classList.add('calendar__day_selected');                
                this.dateRange[1] = this.getDateFromСalendar(day).getTime();
                this.showRange(this.dateRange);
        }

        if (this.dateRange.length > 0) {
            this.clearButton.style.display = 'block';
        } else {
            this.clearButton.removeAttribute('style');
        }
    }

    setRangeHighlight(day) {
        if (this.choiceMode && day.classList.contains('calendar__day_selectable')) {
            let selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');

            let range = [this.dateRange[0], this.getDateFromСalendar(day).getTime()];
            range.sort(this.compareNumbers);

            this.showRange(range);
        }
    }

    showRange(range) {
        if (range[0] == range[1]) {
            return;
        }

        const selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');

        for (let selectableDay of selectableDays) {
            selectableDay.parentNode.classList.remove('calendar__range-highlight_light-and-left-round');
            selectableDay.parentNode.classList.remove('calendar__range-highlight_light-and-right-round');
            selectableDay.parentNode.classList.remove('calendar__range-highlight_light');
        }

        for (let day of selectableDays) {
            let dayToTime = this.getDateFromСalendar(day).getTime();

            if (dayToTime == range[0]) {
                day.parentNode.classList.add('calendar__range-highlight_light-and-left-round');
            } else if (dayToTime == range[1]) {
                day.parentNode.classList.add('calendar__range-highlight_light-and-right-round');
            } else if (dayToTime >= range[0] && dayToTime <= range[1]) {
                day.parentNode.classList.add('calendar__range-highlight_light');
            }
        }
    }

    compareNumbers(a, b) {
        return a - b;
      }

    getDateFromСalendar(day) {
        if (!day.classList.contains('calendar__day-number_other-month')) {
            return new Date(this.year, this.month, day.innerText)
        } else {
            if (parseInt(day.innerText) > 20) {
                return new Date(this.year, this.month - 1, day.innerText)
            } else {
                return new Date(this.year, this.month + 1, day.innerText)
            }
        }
    }

    clearRange() {
        const selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');

        for (let day of selectableDays) {
            day.classList.remove('calendar__day_selected');
            day.parentNode.classList.remove('calendar__range-highlight_light-and-left-round');
            day.parentNode.classList.remove('calendar__range-highlight_light-and-right-round');
            day.parentNode.classList.remove('calendar__range-highlight_light');
        }

        this.dateRange = [];
        this.choiceMode = false;
        this.clearButton.removeAttribute('style');
    }

    refreshCalendar(date=new Date(this.year, this.month)) {
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

        const weekBloks = this.calendar.querySelectorAll('.calendar__week');
        
        for (let weekNode of weekBloks) {
            weekNode.remove();
        }
    }

    createNewCalendar(date) {
        /**
         * Создает новый календарь
         */
        this.year = date.getFullYear();
        this.month = date.getMonth();

        const daysInCurrentMonth = 32 - new Date(this.year, this.month, 32).getDate();
        const daysInPrevMonths = 32 - new Date(this.year, this.month - 1, 32).getDate();
        const firstDayMonth = date.getDay() == 0 ? 7 : date.getDay();
        const calendarBody = this.calendar.querySelector('.calendar__days');
        const weeksInCalendar = Math.ceil((daysInCurrentMonth + firstDayMonth - 1) / 7);
        
        this.calendarTitle.innerText = `${this.MONTHS[this.month]} ${this.year}`;

        let calendarDate = date;

        if (firstDayMonth != 1) {
            calendarDate = new Date(date.getFullYear(), date.getMonth() - 1, daysInPrevMonths - firstDayMonth + 2);
        }
        
        for (let week = 0; week < weeksInCalendar; week++) {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'calendar__week';

            for (let weekDayNumber = 0; weekDayNumber < 7; weekDayNumber++) {
                let classList = 'calendar__calendar-element calendar__day';
                if (calendarDate.getMonth() != date.getMonth()) {
                    classList = 'calendar__calendar-element calendar__day  calendar__day-number_other-month';
                }

                const calendarDay = document.createElement('span');
                calendarDay.onclick = () => this.selectDay(calendarDay);
                calendarDay.classList = classList;
                calendarDay.innerText = calendarDate.getDate();

                const rangeHighlight = document.createElement('div');
                rangeHighlight.onmouseover = () => this.setRangeHighlight(calendarDay);
                rangeHighlight.classList = 'calendar__range-highlight';

                rangeHighlight.append(calendarDay);
                weekDiv.append(rangeHighlight);

                if(calendarDate.getFullYear() == this.currentDate.getFullYear() 
                    && calendarDate.getMonth() == this.currentDate.getMonth() 
                    && calendarDate.getDate() == this.currentDate.getDate()) {
                        calendarDay.classList.add('calendar__current-day');
                    }
                    if(calendarDate >= this.currentDate) {
                        calendarDay.classList.add('calendar__day_selectable');
                    }

                calendarDate.setDate(calendarDate.getDate() + 1);
            }

            calendarBody.append(weekDiv);
        }
    }
}

const calendars = document.querySelectorAll('.calendar');

for (let calendarInThePage of calendars) {
    const calendar = new Calendar(calendarInThePage);
    calendar.refreshCalendar();
}