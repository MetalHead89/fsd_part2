/* eslint-disable no-param-reassign */

class CountingMenu {
  constructor(countingMenu) {
    this._countingMenu = countingMenu;

    this._init();
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

  _increaseQuantitySum() {
    this._quantitySum += 1;
  }

  _decreaseQuantitySum() {
    this._quantitySum -= 1;
  }

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
