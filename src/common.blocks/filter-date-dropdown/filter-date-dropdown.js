// /* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class FilterDateDropdown extends Dropdown {
  _init() {
    super._init();

    this._calendar.addObserver(this._changeHeader.bind(this));
  }

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

  // constructor(dropdown, dropdownHeader, dropMenu) {
  //   super(dropdown, dropdownHeader, dropMenu);
  //   this._init();
  // }
  // _init() {
  //   super._init();
  //   this._countingMenu.addClickToButtonListener(
  //     this._changeDropdownHeaderText.bind(this)
  //   );
  //   this.WORDS = {
  //     bedrooms: ['спальня', 'спальни', 'спален'],
  //     beds: ['кровать', 'кровати', 'кроватей'],
  //     bathroom: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  //   };
  // }
  // _changeDropdownHeaderText() {
  //   const counters = this._countingMenu.getCounters();
  //   const bedrooms = counters[0];
  //   const beds = counters[1];
  //   const bathroom = counters[2];
  //   let headerText = null;
  //   if (bedrooms > 0) {
  //     headerText = `${bedrooms} ${this._getWord(bedrooms, 'bedrooms')}`;
  //   }
  //   if (beds > 0) {
  //     headerText = headerText
  //       ? `${headerText}, ${beds} ${this._getWord(beds, 'beds')}`
  //       : `${beds} ${this._getWord(beds, 'beds')}`;
  //   }
  //   if (bathroom > 0) {
  //     headerText = headerText
  //       ? `${headerText}, ${bathroom} ${this._getWord(bathroom, 'bathroom')}`
  //       : `${bathroom} ${this._getWord(bathroom, 'bathroom')}`;
  //   }
  //   this._changeHeader(headerText);
  // }
}

export default FilterDateDropdown;
