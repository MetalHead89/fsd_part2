/* eslint-disable no-new */

import GuestsDropdown from './guests-dropdown';
import CountingMenuStore from '../counting-menu/counting-menu-store';
import DropdownStore from '../dropdown/dropdown-store';

const guestsDropdowns = document.querySelectorAll('.js-guests-dropdown');

guestsDropdowns.forEach((guestsDropdown) => {
  const dropdown = DropdownStore.getDropdownByElement(
    guestsDropdown.querySelector('.js-dropdown')
  );
  const countingMenu = CountingMenuStore.getMenuByElement(
    guestsDropdown.querySelector('.js-counting-menu')
  );
  new GuestsDropdown(guestsDropdown, dropdown, countingMenu);
});
