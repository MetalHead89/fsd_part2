/* eslint-disable no-new */

import FilterDateDropdown from './filter-date-dropdown';
import DropdownHeaderStore from '../dropdown-header/dropdown-header-store';
import DropMenuStore from '../drop-menu/drop-menu-store';

require('../dropdown-header/init');
require('../drop-menu/init');

const dropdowns = document.querySelectorAll('.js-filter-date-dropdown');

dropdowns.forEach((dropdown) => {
  const header = DropdownHeaderStore.getHeaderByElement(
    dropdown.querySelector('.js-dropdown-header')
  );
  const dropMenu = DropMenuStore.getDropMenuByElement(
    dropdown.querySelector('.js-drop-menu')
  );

  new FilterDateDropdown(dropdown, header, dropMenu);
});
