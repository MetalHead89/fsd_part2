/* eslint-disable no-new */

import GuestsDropdown from './guests-dropdown';

const guestsDropdowns = document.querySelectorAll('.js-guests-dropdown');

guestsDropdowns.forEach((guestsDropdown) => {
  const dropdown = guestsDropdown.querySelector('.js-dropdown');
  const countingMenu = guestsDropdown.querySelector('.js-counting-menu');
  new GuestsDropdown(guestsDropdown, dropdown, countingMenu);
});
