/* eslint-disable comma-dangle */

import Dropdown from '../../js/dropdown';

class GuestsDropdown extends Dropdown {
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
      guests: ['гость', 'гостя', 'гостей'],
      babies: ['младенец', 'младенца', 'младенцев'],
    };
  }

  _changeDropdownHeaderText() {
    const counters = this._countingMenu.getCounters();
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

// /* eslint-disable comma-dangle */

// class GuestsDropdown {
//   constructor(guestsDropdown, dropdown, countingMenu) {
//     this._guestsDropdown = guestsDropdown;
//     this._dropdown = dropdown;
//     this._countingMenu = countingMenu;

//     this._countingMenu.subscribe(this._changeDropdownHeaderText.bind(this));
//     this._dropdown.subscribeToClickOnClearButton(this._clear.bind(this));
// this.WORDS = {
//   guests: ['гость', 'гостя', 'гостей'],
//   babies: ['младенец', 'младенца', 'младенцев'],
// };
//   }

//   _changeDropdownHeaderText() {
// const counters = this._countingMenu.getCounters();
// const guests = counters[0] + counters[1];
// const babies = counters[2];
// let headerText = null;

// if (guests > 0) {
//   headerText = `${guests} ${this._getWord(guests, 'guests')}`;
// }

// if (babies > 0) {
//   headerText = headerText
//     ? `${headerText}, ${babies} ${this._getWord(babies, 'babies')}`
//     : `${babies} ${this._getWord(babies, 'babies')}`;
// }

//     this._dropdown.setHeaderText(headerText);
//   }

//   _getWord(count, word) {
//     const number10 = count % 10;
//     const number100 = count % 100;

//     if (number10 === 1 && number100 !== 11) {
//       return this.WORDS[word][0];
//     }

//     if (GuestsDropdown.numberIsTwoThreeOrFour(number10, number100)) {
//       return this.WORDS[word][1];
//     }

//     return this.WORDS[word][2];
//   }

//   static numberIsTwoThreeOrFour(number10, number100) {
//     return (
//       number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
//     );
//   }

//   _clear() {
//     this._countingMenu.clear();
//     this._changeDropdownHeaderText();
//   }
// }

// export default GuestsDropdown;
