import Calendar from './calendar';
import CalendarStore from './calendar-store';

const calendars = document.querySelectorAll('.js-calendar');
calendars.forEach((item) => CalendarStore.addCalendar(new Calendar(item)));
