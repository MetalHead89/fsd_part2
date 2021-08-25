/* eslint-disable no-new */

import ComfortDropdown from './comfort-dropdown';
import DropdownHeaderStore from '../dropdown-header/dropdown-header-store';
import DropMenuStore from '../drop-menu/drop-menu-store';
import CountingMenuStore from '../counting-menu/counting-menu-store';

require('../dropdown-header/init');
require('../drop-menu/init');
require('../counting-menu/init');

const dropdowns = document.querySelectorAll('.js-comfort-dropdown');

dropdowns.forEach((dropdown) => {
  const header = DropdownHeaderStore.getHeaderByElement(
    dropdown.querySelector('.js-dropdown-header')
  );
  const dropMenu = DropMenuStore.getDropMenuByElement(
    dropdown.querySelector('.js-drop-menu')
  );
  const countingMenu = CountingMenuStore.getMenuByElement(
    dropdown.querySelector('.js-counting-menu')
  );

  new ComfortDropdown(dropdown, header, dropMenu, countingMenu);
});

// /* eslint-disable no-new */

// import ComfortDropdown from './comfort-dropdown';
// import CountingMenuStore from '../counting-menu/counting-menu-store';
// import DropdownStore from '../dropdown/dropdown-store';

// require('../dropdown/init');
// require('../counting-menu/init');

// const comfortDropdowns = document.querySelectorAll('.js-comfort-dropdown');

// comfortDropdowns.forEach((comfortDropdown) => {
//   const dropdown = DropdownStore.getDropdownByElement(
//     comfortDropdown.querySelector('.js-dropdown')
//   );
//   const countingMenu = CountingMenuStore.getMenuByElement(
//     comfortDropdown.querySelector('.js-counting-menu')
//   );
//   new ComfortDropdown(comfortDropdown, dropdown, countingMenu);
// });
