/* eslint-disable comma-dangle */

class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;

    this.dropdownInit();
    this.addEventListeners();
  }

  dropdownInit() {
    this.quantitySum = 0;
    this.dropdownType = Dropdown.getDropdownType(this.dropdown);
    const clearButtonWrapper = this.dropdown.querySelector(
      '.js-dropdown__button-clear',
    );
    if (clearButtonWrapper !== null) {
      [this.clearButton] = clearButtonWrapper.children;
      this.clearButton.style.display = 'none';
    }
    const applyButtonWrapper = this.dropdown.querySelector(
      '.js-dropdown__button-apply',
    );
    if (applyButtonWrapper !== null) {
      [this.applyButton] = applyButtonWrapper.children;
      // this.applyButton.addEventListener('click', this.closeDropMenu.bind(this));
    }
    const calendarApplyButtonWrapper = this.dropdown.querySelector(
      '.js-calendar__button-apply',
    );
    if (calendarApplyButtonWrapper !== null) {
      [this.calendarApplyButton] = calendarApplyButtonWrapper.children;
      // this.calendarApplyButton.addEventListener(
      //   'click',
      //   this.closeDropMenu.bind(this),
      // );
    }
    this.dropdownHeaderText = this.dropdown.querySelector(
      '.js-dropdown__header-text',
    );
    this.dropdownHeader = this.dropdown.querySelector('.js-dropdown__header');
    if (this.dropdownType === 'date') {
      this.dropdownStartDay = this.dropdown
        .querySelector('.js-dropdown__start-date-input')
        .querySelector('.js-text-field__field');
      this.dropdownEndDay = this.dropdown
        .querySelector('.js-dropdown__end-date-input')
        .querySelector('.js-text-field__field');
    }
    this.dropMenu = this.dropdown.querySelector('.js-dropdown__drop-menu');
    this.dropCheck = this.dropdown.querySelector('.js-dropdown__check');
    this.closeTimer = null;
    this.DROPDOWN_CLOSE_TIME = 7000;
  }

  addEventListeners() {
    if (this.dropdownType === 'guests') {
      this.clearButton.onclick = this.handleButtonClearClick.bind(this);
    }

    if (this.applyButton !== undefined) {
      this.applyButton.addEventListener(
        'click',
        this.handleButtonApplyClick.bind(this),
      );
    }

    if (this.calendarApplyButton !== undefined) {
      this.calendarApplyButton.addEventListener(
        'click',
        this.handleButtonApplyClick.bind(this),
      );
    }

    if (this.dropdownType === 'guests' || this.dropdownType === 'comfort') {
      const dropdownQuantityButtons = this.dropdown.querySelectorAll(
        '.js-dropdown__quantity-button',
      );

      dropdownQuantityButtons.forEach((item) => {
        const button = item;
        button.addEventListener(
          'click',
          this.handleQuantityButtonClick.bind(this, button),
        );
      });
    }

    if (this.dropdownHeader !== null) {
      this.dropdownHeader.addEventListener(
        'mouseout',
        this.handleHeaderMouseout.bind(this),
      );
      this.dropdownHeader.addEventListener(
        'mouseover',
        this.handleHeaderMouseover.bind(this),
      );
      this.dropdownHeader.addEventListener(
        'click',
        this.handleHeaderClick.bind(this),
      );
    }

    this.dropMenu.addEventListener(
      'mouseout',
      this.handleDropMenuMouseout.bind(this),
    );
    this.dropMenu.addEventListener(
      'mouseover',
      this.handleDropMenuMouseover.bind(this),
    );

    if (this.dropdownType === 'date') {
      this.dropdownStartDay.addEventListener('focus', this.handleStartDateInputOnfocus.bind(this));
      this.dropdownEndDay.addEventListener('focus', this.handleEndDateInputOnfocus.bind(this));
    }

    // if (this.dropdownHeader) {
    //   this.dropdownHeader.addEventListener(
    //     'click',
    //     this.handleHeaderClick.bind(this),
    //   );
    // }
  }

  handleButtonApplyClick() {
    this.closeDropMenu();
  }

  // handleHeaderClick() {
  //   this.closeOpenDropdowns();
  // }

  handleHeaderMouseout() {
    this.autoCloseDropdown();
  }

  handleHeaderMouseover() {
    this.resetCloseTimer();
  }

  handleDropMenuMouseout() {
    this.autoCloseDropdown();
  }

  handleDropMenuMouseover() {
    this.resetCloseTimer();
  }

  handleStartDateInputOnfocus() {
    this.OpenDateDropdown();
  }

  handleEndDateInputOnfocus() {
    this.OpenDateDropdown();
  }

  static getDropdownType(dropdown) {
    let type;

    if (dropdown.classList.contains('dropdown_guests')) {
      type = 'guests';
    } else if (dropdown.classList.contains('dropdown_comfort')) {
      type = 'comfort';
    } else if (dropdown.classList.contains('dropdown_date')) {
      type = 'date';
    } else if (dropdown.classList.contains('dropdown_filter-date')) {
      type = 'filterDate';
    }

    return type;
  }

  setHeaderText(text) {
    this.dropdownHeaderText.innerText = text;
  }

  increaseQuantitySum() {
    this.quantitySum += 1;
  }

  decreaseQuantitySum() {
    this.quantitySum -= 1;
  }

  clearButtonShow() {
    this.clearButton.style.display = 'inline-block';
  }

  clearButtonHide() {
    this.clearButton.style.display = 'none';
  }

  closeDropMenu() {
    this.dropCheck.checked = false;
    this.closeTimer = null;
  }

  static numberIsTwoThreeOrFour(number10, number100) {
    return (
      number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
    );
  }

  /**
   * Склоняет слова
   */
  static dropdownWordGenerator(word, number) {
    const number10 = number % 10;
    const number100 = number % 100;
    let generatedWord = '';

    if (number10 === 1 && number100 !== 11) {
      if (word === 'guests') {
        generatedWord = 'гость';
      } else if (word === 'babies') {
        generatedWord = 'младенец';
      } else if (word === 'bedroomsCount') {
        generatedWord = 'спальня';
      } else if (word === 'bedsCount') {
        generatedWord = 'кровать';
      } else if (word === 'bathroomsCount') {
        generatedWord = 'ванная комната';
      }
    } else if (Dropdown.numberIsTwoThreeOrFour(number10, number100)) {
      if (word === 'guests') {
        generatedWord = 'гостя';
      } else if (word === 'babies') {
        generatedWord = 'младенца';
      } else if (word === 'bedroomsCount') {
        generatedWord = 'спальни';
      } else if (word === 'bedsCount') {
        generatedWord = 'кровати';
      } else if (word === 'bathroomsCount') {
        generatedWord = 'ванные комнаты';
      }
    } else if (word === 'guests') {
      generatedWord = 'гостей';
    } else if (word === 'babies') {
      generatedWord = 'младенцев';
    } else if (word === 'bedroomsCount') {
      generatedWord = 'спален';
    } else if (word === 'bedsCount') {
      generatedWord = 'кроватей';
    } else if (word === 'bathroomsCount') {
      generatedWord = 'ванных комнат';
    }

    return generatedWord;
  }

  changeDropdownHeaderText() {
    /**
     * Изменяет текст хедера dropdown элемента
     */

    const quantityNumbers = this.dropdown.querySelectorAll(
      '.js-dropdown__quantity-number',
    );
    let headerText = '';

    if (this.dropdownType === 'guests') {
      const guests = {
        guests:
          parseInt(quantityNumbers[0].innerText, 10) +
          parseInt(quantityNumbers[1].innerText, 10),
        babies: parseInt(quantityNumbers[2].innerText, 10),
      };

      Object.keys(guests).forEach((key) => {
        if (guests[key] > 0) {
          if (headerText !== '') {
            headerText += ', ';
          }
          headerText += `${guests[key]} ${Dropdown.dropdownWordGenerator(
            key,
            guests[key],
          )}`;
        }
      });

      if (headerText === '') {
        headerText = 'Сколько гостей';
      }
    } else if (this.dropdownType === 'comfort') {
      const comfort = {
        bedroomsCount: parseInt(quantityNumbers[0].innerText, 10),
        bedsCount: parseInt(quantityNumbers[1].innerText, 10),
        bathroomsCount: parseInt(quantityNumbers[2].innerText, 10),
      };

      Object.keys(comfort).forEach((key) => {
        if (comfort[key] > 0) {
          if (headerText !== '') {
            headerText += ', ';
          }
          headerText += `${comfort[key]} ${Dropdown.dropdownWordGenerator(
            key,
            comfort[key],
          )}`;
        }
      });

      if (headerText === '') {
        headerText = 'Выберите удобства';
      }
    }
    this.setHeaderText(headerText);
  }

  handleButtonClearClick() {
    /**
     * Сбрасывает все значения dropdown на дефолтные
     */

    const quantityElements = this.dropdown.querySelectorAll(
      '.js-dropdown__quantity-number',
    );
    this.clearButton.style.display = 'none';

    for (
      let quantityIndex = 0;
      quantityIndex < quantityElements.length;
      quantityIndex += 1
    ) {
      const quantity = quantityElements[quantityIndex];

      quantity.innerText = '0';
      quantity.previousElementSibling.disabled = true;
    }

    this.quantitySum = 0;
    this.changeDropdownHeaderText();
  }

  handleQuantityButtonClick(button) {
    let quantityElement = null;

    if (button.classList.contains('dropdown__quantity-button_add')) {
      quantityElement = button.previousElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) + 1;
      this.increaseQuantitySum();
    } else {
      quantityElement = button.nextElementSibling;
      quantityElement.innerText = parseInt(quantityElement.innerText, 10) - 1;
      this.decreaseQuantitySum();
    }

    this.onOffQuantityButton.bind(quantityElement)();
    if (this.dropdownType === 'guests') {
      this.onOffClearButton();
    }
    this.changeDropdownHeaderText();
  }

  onOffQuantityButton() {
    if (parseInt(this.innerText, 10) > 0) {
      this.previousElementSibling.disabled = false;
    } else {
      this.previousElementSibling.disabled = true;
    }
  }

  onOffClearButton() {
    if (this.quantitySum > 0) {
      this.clearButtonShow();
    } else {
      this.clearButtonHide();
    }
  }

  startCloseTimer() {
    this.closeTimer = setTimeout(
      this.closeDropMenu(),
      this.DROPDOWN_CLOSE_TIME,
    );
  }

  autoCloseDropdown() {
    if (this.dropCheck.checked) {
      if (this.closeTimer == null) {
        this.startCloseTimer();
      }
    }
  }

  resetCloseTimer() {
    clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }

  closeOpenDropdowns() {
    if (this.dropCheck.checked === false) {
      const dropdowns = document.querySelectorAll('.js-dropdown');

      dropdowns.forEach((item) => {
        const dropdown = item;
        if (dropdown !== this) {
          dropdown.querySelector('.js-dropdown__check').checked = false;
        }
      });
    }
  }

  closeDropdown() {
    this.dropdown.querySelector('.js-dropdown__check').checked = false;
  }

  // function closeAllDropdowns() {
  //   dropdowns.forEach((dropdown) => {
  //     closeDropdown.apply(dropdown);
  //   });
  // }

  OpenDateDropdown() {
    this.closeOpenDropdowns();
    this.dropCheck.checked = true;
  }

  handleHeaderClick() {
    this.closeOpenDropdowns();
    this.dropCheck.checked = !this.dropCheck.checked;
  }

  // static clickIsOutsideDropdown(evt) {
  //   return (
  //     (!evt.target.classList.contains('dropdown__header') &&
  //       !evt.target.classList.contains('dropdown__drop-menu') &&
  //       !evt.target.classList.contains('text-field__field') &&
  //       evt.target.offsetParent &&
  //       !evt.target.offsetParent.classList.contains('dropdown__drop-menu')) ||
  //     !evt.target.offsetParent
  //   );
  // }

  // clickToBody(evt) {
  //   if (Dropdown.clickIsOutsideDropdown(evt)) {
  //     this.closeDropdown();
  //   }
  // }
}

export default Dropdown;

// const dropdowns = document.querySelectorAll('.js-dropdown');

// for (
//   let dropdownIndex = 0;
//   dropdownIndex < dropdowns.length;
//   dropdownIndex += 1
// ) {
//   const dropdown = dropdowns[dropdownIndex];
//   const dropdownObject = new Dropdown(dropdown);
// }

// document.body.addEventListener('mouseup', clickToBody);
