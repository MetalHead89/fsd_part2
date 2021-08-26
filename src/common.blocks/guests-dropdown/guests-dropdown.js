/* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class GuestsDropdown extends Dropdown {
  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }

  _init() {
    super._init();

    this.WORDS = {
      guests: ['гость', 'гостя', 'гостей'],
      babies: ['младенец', 'младенца', 'младенцев'],
    };
  }

  _addEventListeners() {
    super._addEventListeners();

    this._countingMenu.addClickToButtonListener(
      this._changeDropdownHeaderText.bind(this)
    );
    this._dropMenu.addClickToClearButtonListener(this._clear.bind(this));
    this._dropMenu.addClickToApplyButtonListener(this.close.bind(this));
  }

  _clear() {
    this._countingMenu.clear();
    this._changeDropdownHeaderText();
  }

  _changeDropdownHeaderText() {
    const counters = this._countingMenu.getCounters();
    const sum = counters.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    const guests = counters[0] + counters[1];
    const babies = counters[2];
    let headerText = null;

    if (guests > 0) {
      headerText = `${guests} ${this._getWord(guests, 'guests')}`;
    }

    if (babies > 0) {
      headerText = headerText
        ? `${headerText}, ${babies} ${this._getWord(babies, 'babies')}`
        : `${babies} ${this._getWord(babies, 'babies')}`;
    }

    if (sum > 0) {
      this._dropMenu.showClearButton();
    } else {
      this._dropMenu.hideClearButton();
    }

    this._changeHeader(headerText);
  }

  _getWord(count, word) {
    const number10 = count % 10;
    const number100 = count % 100;

    if (number10 === 1 && number100 !== 11) {
      return this.WORDS[word][0];
    }

    if (GuestsDropdown.numberIsTwoThreeOrFour(number10, number100)) {
      return this.WORDS[word][1];
    }

    return this.WORDS[word][2];
  }
}

export default GuestsDropdown;
