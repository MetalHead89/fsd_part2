/* eslint-disable no-param-reassign */

class CountingMenu {
  constructor(countingMenu) {
    this._countingMenu = countingMenu;

    this._init();
  }

  _init() {
    this._observers = [];
    this._quantitySum = 0;
    this._counters = this._countingMenu.querySelectorAll(
      '.js-counting-menu__quantity-number'
    );
    const quantityButtons = this._countingMenu.querySelectorAll(
      '.counting-menu__quantity-button'
    );
    this._handleQuantityButtonClick = this._handleQuantityButtonClick.bind(
      this
    );

    quantityButtons.forEach((item) => {
      item.addEventListener('click', this._handleQuantityButtonClick);
    });
  }

  clear() {
    this._counters.forEach((counter) => {
      counter.innerText = '0';
    });
  }

  getMenu() {
    return this._countingMenu;
  }

  subscribe(func) {
    this._observers.push(func);
  }

  getCounters() {
    const counters = [
      ...this._countingMenu.querySelectorAll(
        '.js-counting-menu__quantity-number'
      ),
    ];

    return counters.map((counter) => parseInt(counter.innerText, 10));
  }

  // addClickButtonObserver(func) {
  //   this.observer = func;
  // }

  // _changeDropdownHeaderText(items, defaultHeaderText) {
  //   let headerText = '';

  //   Object.keys(items).forEach((key) => {
  //     if (items[key] > 0) {
  //       if (headerText !== '') {
  //         headerText += ', ';
  //       }
  //       headerText += `${items[key]} ${QuantityDropdown.dropdownWordGenerator(
  //         this._headerWords[key],
  //         items[key]
  //       )}`;
  //     }
  //   });

  //   if (headerText === '') {
  //     headerText = defaultHeaderText;
  //   }

  //   this._setHeaderText(headerText);
  // }

  _increaseQuantitySum() {
    this._quantitySum += 1;
  }

  _decreaseQuantitySum() {
    this._quantitySum -= 1;
  }

  // static numberIsTwoThreeOrFour(number10, number100) {
  //   return (
  //     number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
  //   );
  // }

  // static dropdownWordGenerator(words, number) {
  //   const number10 = number % 10;
  //   const number100 = number % 100;

  //   if (number10 === 1 && number100 !== 11) {
  //     return words[0];
  //   }

  //   if (QuantityDropdown.numberIsTwoThreeOrFour(number10, number100)) {
  //     return words[1];
  //   }

  //   return words[2];
  // }

  _handleQuantityButtonClick(event) {
    let quantityElement = null;

    if (event.target.classList.contains('counting-menu__quantity-button_add')) {
      quantityElement = event.target.previousElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) + 1;
      this._increaseQuantitySum();
    } else {
      quantityElement = event.target.nextElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) - 1;
      this._decreaseQuantitySum();
    }

    this._onOffQuantityButton.bind(quantityElement)();
    if (this._observers.length > 0) {
      this._observers.forEach((observer) => observer());
    }
    // if (this._type === 'guests-dropdown') {
    //   this._onOffClearButton();
    // }
    // this._changeDropdownHeaderText();
  }

  _onOffQuantityButton() {
    if (parseInt(this.innerText, 10) > 0) {
      this.previousElementSibling.disabled = false;
    } else {
      this.previousElementSibling.disabled = true;
    }
  }

  // _onOffClearButton() {
  //   if (this._quantitySum > 0) {
  //     this._clearButtonShow();
  //   } else {
  //     this._clearButtonHide();
  //   }
  // }
}

export default CountingMenu;
