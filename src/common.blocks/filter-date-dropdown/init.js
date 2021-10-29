/* eslint-disable no-new */

import FilterDateDropdown from './FilterDateDropdown';
import DropdownHeaderStore from '../dropdown-header/DropdownHeaderStore';
import DropMenuStore from '../drop-menu/DropMenuStore';
import CalendarStore from '../calendar/CalendarStore';

require('../dropdown-header/init');
require('../drop-menu/init');
require('../calendar/init');

const dropdowns = document.querySelectorAll('.js-filter-date-dropdown');

dropdowns.forEach((dropdown) => {
  const dropdownHeader = DropdownHeaderStore.getHeaderByElement(
    dropdown.querySelector('.js-dropdown-header')
  );
  const dropMenu = DropMenuStore.getDropMenuByElement(
    dropdown.querySelector('.js-drop-menu')
  );
  const calendar = CalendarStore.getCalendarByElement(
    dropdown.querySelector('.js-calendar')
  );

  new FilterDateDropdown({ dropdown, dropdownHeader, dropMenu, calendar });
});
