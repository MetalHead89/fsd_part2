/* eslint-disable comma-dangle */
/* eslint-disable no-new */

import ExpandableCheckboxList from './ExpandableCheckboxList';
import DropdownHeaderStore from '../dropdown-header/DropdownHeaderStore';
import DropMenuStore from '../drop-menu/DropMenuStore';

require('../dropdown-header/init');
require('../drop-menu/init');

const dropdowns = document.querySelectorAll('.js-expandable-checkbox-list');

dropdowns.forEach((dropdown) => {
  const dropdownHeader = DropdownHeaderStore.getHeaderByElement(
    dropdown.querySelector('.js-dropdown-header')
  );
  const dropMenu = DropMenuStore.getDropMenuByElement(
    dropdown.querySelector('.js-drop-menu')
  );

  new ExpandableCheckboxList({ dropdown, dropdownHeader, dropMenu });
});
