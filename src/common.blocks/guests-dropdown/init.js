/* eslint-disable no-new */

import GuestsDropdown from './guests-dropdown';
import Dropdown from '../dropdown/dropdown';
import CountingMenuApi from '../counting-menu/counting-menu-api';

const guestsDropdowns = document.querySelectorAll('.js-guests-dropdown');

guestsDropdowns.forEach((guestsDropdown) => {
  const dropdown = guestsDropdown.querySelector('.js-dropdown');
  const countingMenu = CountingMenuApi.getMenuByElement(
    guestsDropdown.querySelector('.js-counting-menu')
  );

  new GuestsDropdown(guestsDropdown, new Dropdown(dropdown), countingMenu);
});
