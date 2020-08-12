'use strict'

class Calendar {
    constructor(calendar) {
        this.MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        this.currentDate = new Date();
        this.calendar = calendar;
        this.calendarTitle = calendar.querySelector('.calendar__month');
        this.startDate = null;
        this.endDate = null;
        this.year = this.currentDate.getFullYear();
        this.month = this.currentDate.getMonth();

        this.prevMonthButton = calendar.querySelector('.calendar__prev-month');
        this.nextMonthButton = calendar.querySelector('.calendar__next-month');

        this.prevMonthButton.onclick = () => this.switchMonth(this.prevMonthButton);
        this.nextMonthButton.onclick = () => this.switchMonth(this.nextMonthButton);
    }

    switchMonth(button) {
        const date = button.classList.contains('calendar__prev-month') ? new Date(this.year, this.month - 1) : new Date(this.year, this.month + 1)

        // if (button.classList.contains('prevMonthButton')) {
        //     this.month--;
        // } else {
        //     this.month++;
        // }

        // this.refreshCalendar(new Date(this.year, this.month));
        this.refreshCalendar(date);
    }

    // addMonth() {
    //     return new Date(this.year, this.month + 1)
    // }

    // subtractMonth() {
    //     return new Date(this.year, this.month - 1)
    //     // this.month - 1 < 0 ? new Date(this.year - 1, 11) : new Date(this.year, this.month - 1)
    // }

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
        const firstDayMonth = date.getDay() == 0 ? 7 : date.getDate();
        console.log(date)
        const calendarBody = this.calendar.querySelector('.calendar__days');
        const weeksInCalendar = Math.ceil((daysInCurrentMonth + firstDayMonth - 1) / 7);
        
        this.calendarTitle.innerText = `${this.MONTHS[this.month]} ${this.year}`;

        let dayNumber = 1;
        let dayInMonth = daysInCurrentMonth;
        if (firstDayMonth != 0) {
            dayNumber = daysInPrevMonths - firstDayMonth - 1;
            dayInMonth = daysInPrevMonths;
        }
        
        for (let week = 0; week <= weeksInCalendar; week++) {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'calendar__week';

            for (let weekDayNumber = 0; weekDayNumber < 7; weekDayNumber++) {
                if (dayNumber > dayInMonth) {
                    dayNumber = 1;
                    dayInMonth = daysInCurrentMonth;
                }
                const calendarDay = document.createElement('span');
                calendarDay.classList = 'calendar__day calendar__day-number_current-month';
                calendarDay.innerText = dayNumber;
                weekDiv.append(calendarDay);

                dayNumber++;
            }

            calendarBody.append(weekDiv);
        }

        // let day = daysInCurrentMonth;
        // if (weekDay != 0) {
        //     day = 
        // }
        // for (let day = daysInPrevMonths - )

        // const week = document.createElement('div');
        // week.className = 'calendar__week';
    }
}

const calendars = document.querySelectorAll('.calendar');

for (let calendarInThePage of calendars) {
    const calendar = new Calendar(calendarInThePage);
    calendar.refreshCalendar();
}