/* eslint-disable no-param-reassign */

import { boundMethod } from 'autobind-decorator';

class CountingMenu {
  constructor(countingMenu) {
    this._countingMenu = countingMenu;

    this._init();
  }

  clear() {
    this._counters.forEach((counter) => {
      counter.innerText = '0';
      this._onOffQuantityButton.bind(counter)();
    });
  }

  getMenu() {
    return this._countingMenu;
  }

  addClickToButtonListener(callback) {
    this._clickToButtonListeners.push(callback);
  }

  getCounters() {
    const counters = [
      ...this._countingMenu.querySelectorAll(
        '.js-counting-menu__quantity-number'
      ),
    ];

    return counters.map((counter) => parseInt(counter.innerText, 10));
  }

  _init() {
    this._clickToButtonListeners = [];
    this._quantitySum = 0;
    this._counters = this._countingMenu.querySelectorAll(
      '.js-counting-menu__quantity-number'
    );
    const quantityButtons = this._countingMenu.querySelectorAll(
      '.counting-menu__quantity-button'
    );

    quantityButtons.forEach((item) => {
      item.addEventListener('click', this._handleQuantityButtonClick);
    });
  }

  _increaseQuantitySum() {
    this._quantitySum += 1;
  }

  _decreaseQuantitySum() {
    this._quantitySum -= 1;
  }

  @boundMethod
  _handleQuantityButtonClick(event) {
    let quantityElement = null;

    if (
      event.target.classList.contains(
        'counting-menu__quantity-button_type_addition'
      )
    ) {
      quantityElement = event.target.previousElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) + 1;
      this._increaseQuantitySum();
    } else {
      quantityElement = event.target.nextElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) - 1;
      this._decreaseQuantitySum();
    }

    this._onOffQuantityButton.bind(quantityElement)();
    if (this._clickToButtonListeners.length > 0) {
      this._clickToButtonListeners.forEach((listener) => listener());
    }
  }

  _onOffQuantityButton() {
    if (parseInt(this.innerText, 10) > 0) {
      this.previousElementSibling.disabled = false;
    } else {
      this.previousElementSibling.disabled = true;
    }
  }
}

export default CountingMenu;
