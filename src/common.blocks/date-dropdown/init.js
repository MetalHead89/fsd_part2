/* eslint-disable no-new */

import DateDropdown from './date-dropdown';
import DropMenuStore from '../drop-menu/drop-menu-store';
import CalendarStore from '../calendar/calendar-store';

require('../drop-menu/init');
require('../calendar/init');

const dropdowns = document.querySelectorAll('.js-date-dropdown');

dropdowns.forEach((dropdown) => {
  const dropMenu = DropMenuStore.getDropMenuByElement(
    dropdown.querySelector('.js-drop-menu')
  );
  const calendar = CalendarStore.getCalendarByElement(
    dropdown.querySelector('.js-calendar')
  );

  new DateDropdown({ dropdown, dropMenu, calendar });
});
