class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;

    this.dropdownInit();
  }

  dropdownInit() {
    this.quantitySum = 0;
    this.dropdownType = Dropdown.getDropdownType(this.dropdown);
    const clearButtonWrapper = this.dropdown.querySelector(
      '.dropdown__button-clear'
    );
    if (clearButtonWrapper !== null) {
      [this.clearButton] = clearButtonWrapper.children;
      this.clearButton.style.display = 'none';
    }
    this.dropdownHeaderText = this.dropdown.querySelector(
      '.dropdown__header-text'
    );
    this.dropdownHeader = this.dropdown.querySelector('.dropdown__header');
    this.dropdownStartDayHeader = this.dropdown.querySelector(
      '.dropdown__start-date-header'
    );
    this.dropdownEndDayHeader = this.dropdown.querySelector(
      '.dropdown__end-date-header'
    );
    this.dropMenu = this.dropdown.querySelector('.dropdown__drop-menu');
    this.dropCheck = this.dropdown.querySelector('.dropdown__check');
    this.closeTimer = null;
    this.DROPDOWN_CLOSE_TIME = 7000;
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
}

function numberIsTwoThreeOrFour(number10, number100) {
  return (
    number10 >= 2 && number10 <= 4 && !(number100 >= 12 && number100 <= 14)
  );
}

function dropdownWordGenerator(word, number) {
  /**
   * Склоняет слова
   */
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
  } else if (numberIsTwoThreeOrFour(number10, number100)) {
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

function changeDropdownHeaderText(dropdown) {
  /**
   * Изеняет текст хедера dropdown элемента
   */

  const quantityNumbers = dropdown.dropdown.querySelectorAll(
    '.dropdown__quantity-number'
  );
  let headerText = '';

  if (dropdown.dropdownType === 'guests') {
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
        headerText += `${guests[key]} ${dropdownWordGenerator(
          key,
          guests[key]
        )}`;
      }
    });

    if (headerText === '') {
      headerText = 'Сколько гостей';
    }
  } else if (dropdown.dropdownType === 'comfort') {
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
        headerText += `${comfort[key]} ${dropdownWordGenerator(
          key,
          comfort[key]
        )}`;
      }
    });

    if (headerText === '') {
      headerText = 'Выберите удобства';
    }
  }
  dropdown.setHeaderText(headerText);
}

function resetOptionsValues() {
  /**
   * Сбрасывет все значения dropdown на дефолтные
   */

  const quantityElements = this.dropdown.querySelectorAll(
    '.dropdown__quantity-number'
  );
  this.clearButton.removeAttribute('style');

  for (
    let quantityIndex = 0;
    quantityIndex < quantityElements.length;
    quantityIndex += 1
  ) {
    const quantity = quantityElements[quantityIndex];

    quantity.innerText = '0';
    quantity.previousElementSibling.disabled = true;
  }

  changeDropdownHeaderText(this);
}

function onOffQuantityButton() {
  if (parseInt(this.innerText, 10) > 0) {
    this.previousElementSibling.disabled = false;
  } else {
    this.previousElementSibling.disabled = true;
  }
}

function onOffClearButton(dropdown) {
  if (dropdown.quantitySum > 0) {
    dropdown.clearButtonShow();
  } else {
    dropdown.clearButtonHide();
  }
}

function changeQuantity(dropdown) {
  let quantityElement = null;

  if (this.classList.contains('dropdown__quantity-button_add')) {
    quantityElement = this.previousElementSibling;
    quantityElement.innerText = parseInt(quantityElement.innerText, 10) + 1;
    dropdown.increaseQuantitySum();
  } else {
    quantityElement = this.nextElementSibling;
    quantityElement.innerText = parseInt(quantityElement.innerText, 10) - 1;
    dropdown.decreaseQuantitySum();
  }

  onOffQuantityButton.bind(quantityElement)();
  if (dropdown.dropdownType === 'guests') {
    onOffClearButton(dropdown);
  }
  changeDropdownHeaderText(dropdown);
}

function closeDropMenu() {
  this.dropCheck.checked = false;
  this.closeTimer = null;
}

function startCloseTimer() {
  this.closeTimer = setTimeout(
    closeDropMenu.bind(this),
    this.DROPDOWN_CLOSE_TIME
  );
}

function autoCloseDropdown() {
  if (this.dropCheck.checked) {
    if (this.closeTimer == null) {
      startCloseTimer.bind(this)();
    }
  }
}

function resetCloseTimer() {
  clearTimeout(this.closeTimer);
  this.closeTimer = null;
}

const dropdowns = document.querySelectorAll('.dropdown');

function closeOpenDropdowns() {
  if (!this.dropCheck.checked) {
    for (
      let dropdownIndex = 0;
      dropdownIndex < dropdowns.length;
      dropdownIndex += 1
    ) {
      const dropdown = dropdowns[dropdownIndex];

      if (
        dropdown !== this &&
        dropdown.querySelector('.dropdown__check').checked
      ) {
        dropdown.querySelector('.dropdown__check').checked = false;
      }
    }
  }
}

for (
  let dropdownIndex = 0;
  dropdownIndex < dropdowns.length;
  dropdownIndex += 1
) {
  const dropdown = dropdowns[dropdownIndex];
  const dropdownObject = new Dropdown(dropdown);

  if (dropdownObject.dropdownType === 'guests') {
    dropdownObject.clearButton.onclick = resetOptionsValues.bind(
      dropdownObject
    );
  }

  if (
    dropdownObject.dropdownType === 'guests' ||
    dropdownObject.dropdownType === 'comfort'
  ) {
    const dropdownQuantityButtons = dropdownObject.dropdown.querySelectorAll(
      '.dropdown__quantity-button'
    );

    for (
      let buttonIndex = 0;
      buttonIndex < dropdownQuantityButtons.length;
      buttonIndex += 1
    ) {
      const button = dropdownQuantityButtons[buttonIndex];
      button.addEventListener(
        'click',
        changeQuantity.bind(button, dropdownObject)
      );
    }
  }

  dropdownObject.dropdownHeader.onmouseout = autoCloseDropdown.bind(
    dropdownObject
  );
  dropdownObject.dropMenu.onmouseout = autoCloseDropdown.bind(dropdownObject);
  dropdownObject.dropdownHeader.onmouseover = resetCloseTimer.bind(
    dropdownObject
  );
  dropdownObject.dropMenu.onmouseover = resetCloseTimer.bind(dropdownObject);
  dropdownObject.dropdownHeader.onclick = closeOpenDropdowns.bind(
    dropdownObject
  );
  if (dropdownObject.dropdownType === 'date') {
    dropdownObject.dropdownStartDayHeader.onclick = closeOpenDropdowns.bind(
      dropdownObject
    );
    dropdownObject.dropdownEndDayHeader.onclick = closeOpenDropdowns.bind(
      dropdownObject
    );
  }
}
