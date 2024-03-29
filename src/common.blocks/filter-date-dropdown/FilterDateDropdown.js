// /* eslint-disable comma-dangle */

import { boundMethod } from 'autobind-decorator';
import Dropdown from '../../js/Dropdown';

class FilterDateDropdown extends Dropdown {
  _addEventListeners() {
    this._calendar.addObserver(this._changeHeader);
    this._calendar.addClickToApplyButtonListener(this.close.bind(this));

    super._addEventListeners();
  }

  @boundMethod
  _changeHeader() {
    const datesRange = this._calendar.getDatesRange();
    let headerText = null;

    if (datesRange.length === 2) {
      const startDate = new Date(datesRange[0]);
      const endDate = new Date(datesRange[1]);

      headerText = `${startDate.toLocaleString('ru', {
        day: 'numeric',
        month: 'short',
      })} - ${endDate.toLocaleString('ru', {
        day: 'numeric',
        month: 'short',
      })}`;

      headerText = headerText.replace(/\./g, '');
    }

    super._changeHeader(headerText);
  }
}

export default FilterDateDropdown;
