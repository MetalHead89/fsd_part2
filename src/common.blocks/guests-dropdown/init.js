/* eslint-disable no-new */

import GuestsDropdown from './GuestsDropdown';
import DropdownHeaderStore from '../dropdown-header/DropdownHeaderStore';
import DropMenuStore from '../drop-menu/DropMenuStore';
import CountingMenuStore from '../counting-menu/CountingMenuStore';

require('../dropdown-header/init');
require('../drop-menu/init');
require('../counting-menu/init');

const dropdowns = document.querySelectorAll('.js-guests-dropdown');

dropdowns.forEach((dropdown) => {
  const dropdownHeader = DropdownHeaderStore.getHeaderByElement(
    dropdown.querySelector('.js-dropdown-header')
  );
  const dropMenu = DropMenuStore.getDropMenuByElement(
    dropdown.querySelector('.js-drop-menu')
  );
  const countingMenu = CountingMenuStore.getMenuByElement(
    dropdown.querySelector('.js-counting-menu')
  );

  new GuestsDropdown({ dropdown, dropdownHeader, dropMenu, countingMenu });
});
