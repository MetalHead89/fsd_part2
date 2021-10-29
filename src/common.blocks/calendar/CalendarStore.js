const CalendarStore = {
  _calendars: [],

  addCalendar(calendar) {
    this._calendars.push(calendar);
  },

  getCalendarByElement(element) {
    return this._calendars.find(
      (calendar) => calendar.getCalendar() === element
    );
  },
};

export default CalendarStore;
