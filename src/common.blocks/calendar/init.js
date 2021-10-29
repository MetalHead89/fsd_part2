import Calendar from './Calendar';
import CalendarStore from './CalendarStore';

const calendars = document.querySelectorAll('.js-calendar');
calendars.forEach((item) => CalendarStore.addCalendar(new Calendar(item)));
