/* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class ComfortDropdown extends Dropdown {
  constructor(dropdown, dropdownHeader, dropMenu, countingMenu) {
    super(dropdown, dropdownHeader, dropMenu, countingMenu);

    this._init();
  }

  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }

  _init() {
    super._init();
    this._countingMenu.addClickToButtonListener(
      this._changeDropdownHeaderText.bind(this)
    );
    this.WORDS = {
      bedrooms: ['спальня', 'спальни', 'спален'],
      beds: ['кровать', 'кровати', 'кроватей'],
      bathroom: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    };
  }

  _changeDropdownHeaderText() {
    const counters = this._countingMenu.getCounters();
    const bedrooms = counters[0];
    const beds = counters[1];
    const bathroom = counters[2];
    let headerText = null;

    if (bedrooms > 0) {
      headerText = `${bedrooms} ${this._getWord(bedrooms, 'bedrooms')}`;
    }

    if (beds > 0) {
      headerText = headerText
        ? `${headerText}, ${beds} ${this._getWord(beds, 'beds')}`
        : `${beds} ${this._getWord(beds, 'beds')}`;
    }

    if (bathroom > 0) {
      headerText = headerText
        ? `${headerText}, ${bathroom} ${this._getWord(bathroom, 'bathroom')}`
        : `${bathroom} ${this._getWord(bathroom, 'bathroom')}`;
    }

    this._changeHeader(headerText);
  }

  _getWord(count, word) {
    const number10 = count % 10;
    const number100 = count % 100;

    if (number10 === 1 && number100 !== 11) {
      return this.WORDS[word][0];
    }

    if (ComfortDropdown.numberIsTwoThreeOrFour(number10, number100)) {
      return this.WORDS[word][1];
    }

    return this.WORDS[word][2];
  }
}

export default ComfortDropdown;
