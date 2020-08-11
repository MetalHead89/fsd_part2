'use strict'

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const currentDate = new Date();
const calendars = document.querySelectorAll('.calendar');

for (let calendar of calendars) {
    refreshCalendar.bind(calendar, currentDate)();

    const prevMonthButton = calendar.querySelector('.calendar__prev-month');
    const nextMonthButton = calendar.querySelector('.calendar__next-month');

    prevMonthButton.onclick = () => switchMonth.bind(prevMonthButton, calendar)();
    nextMonthButton.onclick = () => switchMonth.bind(nextMonthButton, calendar)();
}

function refreshCalendar(date) {
    /**
     * Обновляет информацию на календаре
     */

    removeCalendar.bind(this)();
    createNewCalendar.bind(this)(date);
}

function removeCalendar() {
    /**
     * Удаляет текущий календарь
     */

    const weekBloks = this.querySelectorAll('.calendar__week');
    
    for (let weekNode of weekBloks) {
        weekNode.remove();
    }
}

function createNewCalendar(date) {
    /**
     * Создает новый календарь
     */

     console.dir(date)
    let calendar = {};
    let calendarTitle = this.querySelector('.calendar__month');

    calendar.year = date.getFullYear();
    calendar.month = date.getMonth();
    calendar.daysInMonth = 32 - new Date(calendar.year, calendar.month, 32).getDate();
    calendar.weekDay = date.getDay();
    
    calendarTitle.innerText = `${MONTHS[calendar.month]} ${calendar.year}`;
}

function switchMonth(calendar) {
    const calendarTitle = calendar.querySelector('.calendar__month').innerText.split(' ');
    let month = MONTHS.indexOf(calendarTitle[0]);
    const year = calendarTitle[1];

    if (this.classList.contains('calendar__prev-month')) {
        month--;
    } else {
        month++;
    }
    
    refreshCalendar.bind(calendar, new Date(year, month));
}

//-     - const WEEK_DAYS = 7
//-     - const currentDate = new Date()    
//-     - const currentMonth = currentDate.getMonth

//-     - let weeksCount = 5
//-     - let week = 1    
//-     - let dayNumber = 1
//-     - let calendarDayNumberClass = 'calendar__day calendar__day-number_current-month'
//-     - let headerText = 'Сентябрь 1989'
//-     - let currentDay = 6