/* eslint-disable no-new */

import GuestsDropdown from './guests-dropdown';
// import Dropdown from '../dropdown/dropdown';
import CountingMenuStore from '../counting-menu/counting-menu-store';

const guestsDropdowns = document.querySelectorAll('.js-guests-dropdown');

guestsDropdowns.forEach((guestsDropdown) => {
  // const dropdown = guestsDropdown.querySelector('.js-dropdown');
  const countingMenu = CountingMenuStore.getMenuByElement(
    guestsDropdown.querySelector('.js-counting-menu')
  );
  new GuestsDropdown(guestsDropdown, countingMenu);
});
