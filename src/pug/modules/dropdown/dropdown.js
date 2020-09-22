'use strict'

class Dropdown {
    constructor(dropdown) {
        this.dropdown = dropdown;
        this.quantitySum = 0;
        this.dropdownType = this.getDropdownType(this.dropdown);
        this.clearButton = this.dropdown.querySelector('.dropdown__button_clear');
        this.dropdownHeaderText = this.dropdown.querySelector('.dropdown__header-text');
        this.dropdownHeader = this.dropdown.querySelector('.dropdown__header');
        this.dropdownStartDayHeader = this.dropdown.querySelector('.dropdown__start-date-header');
        this.dropdownEndDayHeader = this.dropdown.querySelector('.dropdown__end-date-header');
        this.dropMenu = this.dropdown.querySelector('.dropdown__drop-menu');
        this.dropCheck = this.dropdown.querySelector('.dropdown__check');
        this.closeTimer = null;
        this.DROPDOWN_CLOSE_TIME = 7000;
    }

    getDropdownType(dropdown) {
        if (dropdown.classList.contains('dropdown_guests')) {
            return 'guests';
        } else if (dropdown.classList.contains('dropdown_comfort')) {
            return 'comfort';
        } else if (dropdown.classList.contains('dropdown_date')) {
            return 'date';
        }
        else if (dropdown.classList.contains('dropdown_filter-date')) {
            return 'filterDate';
        }
    }
}

const dropdowns = document.querySelectorAll('.dropdown');

for (let dropdown of dropdowns) {
    const dropdownObject = new Dropdown(dropdown);

    if (dropdownObject.dropdownType == 'guests') {
        dropdownObject.clearButton.onclick = resetOptionsValues.bind(dropdownObject)
    }

    if (dropdownObject.dropdownType == 'guests' || dropdownObject.dropdownType == 'comfort') {
        const dropdownQuantityButtons = dropdownObject.dropdown.querySelectorAll('.dropdown__quantity-button');

        for (let button of dropdownQuantityButtons) {
            button.addEventListener('click', changeQuantity.bind(button, dropdownObject));
        }
    }

    dropdownObject.dropdownHeader.onmouseout = autoCloseDropdown.bind(dropdownObject);
    dropdownObject.dropMenu.onmouseout = autoCloseDropdown.bind(dropdownObject);
    dropdownObject.dropdownHeader.onmouseover = resetCloseTimer.bind(dropdownObject);
    dropdownObject.dropMenu.onmouseover = resetCloseTimer.bind(dropdownObject);
    dropdownObject.dropdownHeader.onclick = closeOpenDropdowns.bind(dropdownObject);
    if (dropdownObject.dropdownType == 'date') {
        dropdownObject.dropdownStartDayHeader.onclick = closeOpenDropdowns.bind(dropdownObject);
        dropdownObject.dropdownEndDayHeader.onclick = closeOpenDropdowns.bind(dropdownObject);
    }
}

function closeOpenDropdowns() {
    if (!this.dropCheck.checked) {
        for (let dropdown of dropdowns) {
            if (dropdown !== this && dropdown.querySelector('.dropdown__check').checked) {
                dropdown.querySelector('.dropdown__check').checked = false;
            }
        }
    }    
}

function autoCloseDropdown() {
    if (this.dropCheck.checked) {
        if (this.closeTimer == null) {
            startCloseTimer.bind(this)();
        }
    }
    // if (this.dropCheck.checked &&
    //     !event.relatedTarget.classList.contains('dropdown__header') && 
    //     !event.relatedTarget.classList.contains('dropdown__drop-menu') &&
    //     !event.relatedTarget.offsetParent.classList.contains('dropdown__drop-menu')) {
    //         if (this.closeTimer == null) {
    //             startCloseTimer.bind(this)();
    //         }
    // }
}

function resetCloseTimer() {
    clearTimeout(this.closeTimer);
    this.closeTimer = null;
    // if (this.dropCheck.checked &&
    //     (event.relatedTarget.classList.contains('dropdown__header') || 
    //     event.relatedTarget.classList.contains('dropdown__drop-menu') ||
    //     event.relatedTarget.offsetParent.classList.contains('dropdown__drop-menu'))) {
    //     // event.relatedTarget.classList.contains('.calendar__buttons-panel') ||
        
    //     if (this.closeTimer != null) {
    //         clearTimeout(this.closeTimer);
    //         startCloseTimer.bind(this)();
    //     }
    // }
}

function startCloseTimer() {
    this.closeTimer = setTimeout(closeDropMenu.bind(this), this.DROPDOWN_CLOSE_TIME);
}

function closeDropMenu() {
    this.dropCheck.checked = false;
    this.closeTimer = null;
}

function changeQuantity(dropdown) {
    let quantityElement = null;

    if (this.classList.contains('dropdown__add-button')) {
        quantityElement = this.previousElementSibling;
        quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
        dropdown.quantitySum++;
    } else {
        quantityElement = this.nextElementSibling;
        quantityElement.innerText = parseInt(quantityElement.innerText) - 1;
        dropdown.quantitySum--;
    }

    onOffQuantityButton.bind(quantityElement)();
    if (dropdown.dropdownType == 'guests') {
        onOffClearButton(dropdown);
    }
    changeDropdownHeaderText(dropdown);
}

function onOffQuantityButton(){
    if (parseInt(this.innerText) > 0) {
        this.previousElementSibling.disabled = false;
    } else {
        this.previousElementSibling.disabled = true;
    }
}

function onOffClearButton(dropdown){
    if (dropdown.quantitySum > 0) {
        dropdown.clearButton.style.display = 'inline-block';
    } else {
        dropdown.clearButton.removeAttribute('style');
    }
}

function resetOptionsValues() {
    /**
     * Сбрасывет все значения dropdown на дефолтные
     */

    const quantityElements = this.dropdown.querySelectorAll('.dropdown__quantity-number');
    this.clearButton.removeAttribute('style');

    for (let quantity of quantityElements) {
        quantity.innerText = '0'
        quantity.previousElementSibling.disabled = true;
    }

    changeDropdownHeaderText(this);
}

function changeDropdownHeaderText(dropdown) {
    /**
     * Изеняет текст хедера dropdown элемента
     */

    const quantityNumbers = dropdown.dropdown.querySelectorAll('.dropdown__quantity-number');
    let headerText = '';

    if (dropdown.dropdownType == 'guests') {
        const guests = {
            'guests': parseInt(quantityNumbers[0].innerText) + parseInt(quantityNumbers[1].innerText),
            'babies': parseInt(quantityNumbers[2].innerText)
        };
        
        for (let key in guests) {
            if (guests[key] > 0) {
                if (headerText != '')
                    headerText += ', ';
                headerText += `${guests[key]} ${dropdownWordGenerator(key, guests[key])}`;
            }
        }

        if (headerText == '')
            headerText = 'Сколько гостей'

    } else if (dropdown.dropdownType == 'comfort') {
        let comfort = {
            'bedroomsCount': parseInt(quantityNumbers[0].innerText),
            'bedsCount': parseInt(quantityNumbers[1].innerText),
            'bathroomsCount': parseInt(quantityNumbers[2].innerText)
        };

        for (let key in comfort) {
            if (comfort[key] > 0) {
                if (headerText != '')
                    headerText += ', ';
                headerText += `${comfort[key]} ${dropdownWordGenerator(key, comfort[key])}`;
            }
        }

        if (headerText == '')
            headerText = 'Выберите удобства'

    }

    dropdown.dropdownHeaderText.innerText = headerText;
}

function dropdownWordGenerator(word, number) {
    /**
     * Склоняет слова
     */
    let number10 = number % 10;
    let number100 = number % 100;
    if (number10 == 1 && number100 != 11) {
        if (word == 'guests')
            return 'гость';
        else if (word == 'babies')
            return 'младенец';
        else if (word == 'bedroomsCount')
            return 'спальня';
        else if (word == 'bedsCount')
            return 'кровать';
        else if (word == 'bathroomsCount')
            return 'ванная комната';
    }
    else if ((number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14)) {
        if (word == 'guests')
            return 'гостя';
        else if (word == 'babies')
            return 'младенца';
        else if (word == 'bedroomsCount')
            return 'спальни';
        else if (word == 'bedsCount')
            return 'кровати';
        else if (word == 'bathroomsCount')
            return 'ванные комнаты';
    }
    else {
        if (word == 'guests')
            return 'гостей';
        else if (word == 'babies')
            return 'младенцев';
        else if (word == 'bedroomsCount')
            return 'спален';
        else if (word == 'bedsCount')
            return 'кроватей';
        else if (word == 'bathroomsCount')
            return 'ванных комнат';
    }
}