'use strict'

class Calendar {
    constructor(calendar) {
        this.MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        this.currentDate = new Date();
        this.currentDate.setHours(0, 0, 0, 0);
        this.calendar = calendar;
        this.calendarTitle = calendar.querySelector('.calendar__month');
        // this.startDate = null;
        // this.endDate = null;
        this.year = this.currentDate.getFullYear();
        this.month = this.currentDate.getMonth();
        // this.dateRanges = [null, null]
        this.dateRange = [];
        this.choiceMode = false;

        this.calendarDays = this.calendar.querySelectorAll('.calendar__day');
        this.prevMonthButton = calendar.querySelector('.calendar__prev-month');
        this.nextMonthButton = calendar.querySelector('.calendar__next-month');

        this.prevMonthButton.onclick = () => this.switchMonth(this.prevMonthButton);
        this.nextMonthButton.onclick = () => this.switchMonth(this.nextMonthButton);

        // for (let day of this.calendarDays) {
        //     day.onclick = () => this.selectDay(day);
        // }

        // for (let day of this.calendarDays) {
        //     day.onmouseover = () => this.selectDay(day);
        // }
    }

    switchMonth(button) {
        const date = button.classList.contains('calendar__prev-month') ? new Date(this.year, this.month - 1) : new Date(this.year, this.month + 1)
        this.refreshCalendar(date);

        let selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');
        selectableDays = Array.from(selectableDays);
        
        // let range = [];

        // for (let day of this.dateRange) {
        //     console.log(day)
        //     let index = selectableDays.indexOf(day);

        //     if (index != -1) {
        //         range.push[index]
        //     }
        // }

        // if (range.length == 2) {
        //     range.sort(this.compareNumbers);
        // }

        // this.showRange(range);
    }

    selectDay(day) {
        if (this.dateRange.length == 0 && day.classList.contains('calendar__day_selectable')) {
            this.dateRange.push(day);
            this.choiceMode = true;
            day.classList.add('calendar__day_selected');
        } else if (this.dateRange.length == 1 && day.classList.contains('calendar__day_selectable') 
            && day != this.dateRange[0]) {
                this.dateRange.push(day);
                this.choiceMode = false;
                day.classList.add('calendar__day_selected');
        } else if (this.dateRange.length == 1 && day == this.dateRange[0]) {
            this.dateRange.pop();
            this.choiceMode = false;
            day.classList.remove('calendar__day_selected');
            day.parentNode.classList.remove('calendar__range-highlight_light-and-left-round');
            day.parentNode.classList.remove('calendar__range-highlight_light-and-right-round');
        } else if (this.dateRange.length == 2 && (day == this.dateRange[0] || day == this.dateRange[1])) {
            this.dateRange.splice(this.dateRange.indexOf(day), 1);
            this.choiceMode = true;
            day.classList.remove('calendar__day_selected');
        }
    }

    setRangeHighlight(day) {
        if (this.choiceMode && day.classList.contains('calendar__day_selectable')) {
            let selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');
            selectableDays = Array.from(selectableDays);

            for (let selectableDay of selectableDays) {
                selectableDay.parentNode.classList.remove('calendar__range-highlight_light-and-left-round');
                selectableDay.parentNode.classList.remove('calendar__range-highlight_light-and-right-round');
                selectableDay.parentNode.classList.remove('calendar__range-highlight_light');
            }

            let range = []
            if (selectableDays.indexOf(this.dateRange[0]) == -1) {
                range.push(0);
            } else {
                range.push(selectableDays.indexOf(this.dateRange[0]));
            }

            range.push(selectableDays.indexOf(day));
            range.sort(this.compareNumbers);

            this.showRange(range);
        }
    }

    showRange(range) {
        let selectableDays = this.calendar.querySelectorAll('.calendar__day_selectable');

        for(let index = range[0];index <= range[1]; index++) {
            if (index == range[0]) {
                selectableDays[index].parentNode.classList.add('calendar__range-highlight_light-and-left-round');
            } else if (index == range[1]) {
                selectableDays[index].parentNode.classList.add('calendar__range-highlight_light-and-right-round');
            } else {
                selectableDays[index].parentNode.classList.add('calendar__range-highlight_light');
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