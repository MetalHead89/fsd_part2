import Calendar from './calendar';

const calendars = document.querySelectorAll('.js-calendar');
calendars.forEach((item) => new Calendar(item));
