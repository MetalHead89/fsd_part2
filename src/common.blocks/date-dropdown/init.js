/* eslint-disable comma-dangle */
/* eslint-disable no-new */

import DateDropdown from './DateDropdown';
import DateDropdownStore from './DateDropdownStore';
import DropMenuStore from '../drop-menu/DropMenuStore';
import CalendarStore from '../calendar/CalendarStore';

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

  DateDropdownStore.addDateDropdown(
    new DateDropdown({ dropdown, dropMenu, calendar })
  );
});
